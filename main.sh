#!/usr/bin/env bash

set -eu

tfsec --format=checkstyle . |
	reviewdog -f=checkstyle \
		-name="tfsec" \
		-reporter=github-pr-review \
		-level=warning \
		-fail-on-error=1
