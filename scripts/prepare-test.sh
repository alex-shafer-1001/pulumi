#!/usr/bin/env bash

set -euo pipefail

NAME="$1"

cd "tests/integration/$NAME/testcomponent"
yarn install
yarn link @pulumi/pulumi
yarn run tsc

cd ../testcomponent-go
go build -o pulumi-resource-testcomponent

cd ../testcomponent-python
"$PYTHON" -m venv venv
export PATH=venv/bin:$PATH
python -m pip install -e ../../../../sdk/python/env/src
