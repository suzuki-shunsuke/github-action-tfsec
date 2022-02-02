import * as exec from '@actions/exec';
import * as core from '@actions/core';
import * as github from '@actions/github';

type Inputs = {
  workingDirectory: string
  githubToken: string
}

function getSeverity(s: string): string | null {
  if (s.startsWith('HIGH')) {
    return 'ERROR';
  }
  if (s.startsWith('MEDIUM')) {
    return 'WARNING';
  }
  if (s.startsWith('LOW')) {
    return 'INFO';
  }
  return null;
}

function getURL(result: any): string {
  if (result.links && result.links.length != 0) {
    return result.links[0];
  }
  return '';
}

export const run = async (inputs: Inputs): Promise<void> => {
  core.info('Running tfsec');
  const out = await exec.getExecOutput('tfsec', ['--format', 'json', '.'], {
    cwd: inputs.workingDirectory,
    ignoreReturnCode: true,
  });
  core.info('Parsing tfsec result');
  const outJSON = JSON.parse(out.stdout);
  if (outJSON.results == null) {
    core.info('tfsec results is null');
    return;
  }
  const diagnostics = [];
  for (let i = 0; i < outJSON.results.length; i++) {
    const result = outJSON.results[i];
    diagnostics.push({
      message: result.description,
      code: {
        value: result.long_id ? result.long_id : result.rule_id,
        url: getURL(result),
      },
      location: {
        path: result.location.filename,
        range: {
          start: {
            line: result.location.start_line,
          },
          end: {
            line: result.location.end_line,
          },
        },
      },
      severity: getSeverity(result.severity),
    });
  }
  const reporter = github.context.eventName == 'pull_request' ? 'github-pr-review' : 'github-check';
  core.info('Running reviewdog');
  await exec.exec('reviewdog', ['-f', 'rdjson', '-name', 'tfsec', '-filter-mode', 'nofilter', '-reporter', reporter, '-level', 'warning', '-fail-on-error', '1'], {
    input: Buffer.from(JSON.stringify({
      source: {
        name: "tfsec",
        url: "https://github.com/aquasecurity/tfsec"
      },
      diagnostics: diagnostics,
    })),
    env: {
      ...process.env,
      REVIEWDOG_GITHUB_API_TOKEN: inputs.githubToken,
    },
  });
}
