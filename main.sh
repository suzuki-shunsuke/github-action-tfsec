#!/usr/bin/env bash

set -eu

if [ "$EVENT_NAME" != "pull_request" ]; then
  tfsec .
  exit 0
fi

tfsec --format=checkstyle . |
	reviewdog -f=checkstyle \
		-name="tfsec" \
		-reporter=github-pr-review \
		-level=warning \
		-fail-on-error=1
