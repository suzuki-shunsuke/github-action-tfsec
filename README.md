# github-action-tfsec

GitHub Actions for [tfsec](https://aquasecurity.github.io/tfsec)

<img width="942" alt="image" src="https://user-images.githubusercontent.com/13323303/153747798-0e6ac3d4-e335-4c20-8e2a-1f5b43205ff3.png">

<img width="969" alt="image" src="https://user-images.githubusercontent.com/13323303/153747838-ccbd4fba-6654-4589-84c8-7ae833644426.png">

Run tfsec and notify the result with reviewdog and [github-comment](https://github.com/suzuki-shunsuke/github-comment).
This GitHub Actions does **not** install tfsec and reviewdog, so you have to install them in advance.
It allows to install tools outside this action.
We recommend [aqua](https://aquaproj.github.io/) to install them.

## Motivation

We know there are other GitHub Actions for tfsec.
They install tfsec automatically, but we would like to manage tools with [aqua](https://aquaproj.github.io/), which is a declarative CLI Version Manager written in Go.
By aqua, you can update tools continuously with Renovate very easily and use the same tool versions in both CI and your development environment.
This GitHub Actions does **not** install tfsec, so we can install them outside this action.

## Requirements

* [tfsec](https://github.com/aquasecurity/tfsec)
* [reviewdog](https://github.com/reviewdog/reviewdog)
* (Optional) [github-comment](https://github.com/suzuki-shunsuke/github-comment)

## Notification with reviewdog

<img width="942" alt="image" src="https://user-images.githubusercontent.com/13323303/153747798-0e6ac3d4-e335-4c20-8e2a-1f5b43205ff3.png">

## Notification with github-comment

<img width="969" alt="image" src="https://user-images.githubusercontent.com/13323303/153747838-ccbd4fba-6654-4589-84c8-7ae833644426.png">

e.g.

```yaml
- uses: suzuki-shunsuke/github-action-tfsec@main
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    working_directory: tests
    github_comment: true # Enable github-comment notification
```

:bulb: If you want to hide old notification, please use [github-comment hide command](https://github.com/suzuki-shunsuke/github-comment#hide).

## Example

```yaml
- uses: suzuki-shunsuke/github-action-tfsec@v0.1.1
```

```yaml
- uses: suzuki-shunsuke/github-action-tfsec@v0.1.1
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    working_directory: foo
```

## Notification with github-comment

e.g.

```yaml
- uses: suzuki-shunsuke/github-action-tfsec@main
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    working_directory: tests
    github_comment: true # Enable github-comment notification
```

## Inputs

### Required Inputs

Nothing.

### Optional Inputs

name | default value | description
--- | --- | ---
github_token | `github.token` | GitHub Access Token
working_directory | "" (current directory) | Woring Directory
github_comment | `false` | Whether a comment is posted with github-comment

## Outputs

Nothing.

## License

[MIT](LICENSE)
