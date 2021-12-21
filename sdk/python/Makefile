PROJECT_NAME     := Pulumi Python SDK
LANGHOST_PKG     := github.com/pulumi/pulumi/sdk/v3/python/cmd/pulumi-language-python
VERSION          := $(shell cd ../../ && pulumictl get version)
PYPI_VERSION 	 := $(shell cd ../../ && pulumictl get version --language python)
PROJECT_ROOT     := $(realpath ../..)

PYENV := ./env
PYENVSRC := $(PYENV)/src

PROJECT_PKGS    := $(shell go list ./cmd/...)
TESTPARALLELISM := 10

include ../../build/common.mk

# Motivation: running `make TEST_ALL_DEPS= test_all` permits running
# `test_all` without the dependencies.
TEST_ALL_DEPS = build

export PATH:=venv/bin:$(PATH)

ensure::
	$(PYTHON) -m venv venv
	python -m pip install -r requirements.txt
	mkdir -p $(PYENVSRC)

build_package::
	rm -rf $(PYENVSRC) && cp -R ./lib/. $(PYENVSRC)/
	sed -i.bak "s/\$${VERSION}/$(PYPI_VERSION)/g" $(PYENVSRC)/setup.py && rm $(PYENVSRC)/setup.py.bak
	cp ../../README.md $(PYENVSRC)
	cd $(PYENVSRC) && python setup.py build bdist_wheel --universal

build_plugin::
	go install -ldflags "-X github.com/pulumi/pulumi/sdk/v3/go/common/version.Version=${VERSION}" ${LANGHOST_PKG}

build:: build_package build_plugin

lint::
	MYPYPATH=./stubs python -m mypy ./lib/pulumi --config-file=mypy.ini
	python -m pylint ./lib/pulumi --rcfile=.pylintrc

install_package:: build_package
	cp ./cmd/pulumi-language-python-exec "$(PULUMI_BIN)"
	cp ./dist/pulumi-resource-pulumi-python "$(PULUMI_BIN)"
	cp ./dist/pulumi-analyzer-policy-python "$(PULUMI_BIN)"

install_plugin:: build_plugin
	GOBIN=$(PULUMI_BIN) go install \
		  -ldflags "-X github.com/pulumi/pulumi/sdk/v3/go/common/version.Version=${VERSION}" ${LANGHOST_PKG}

install:: install_package install_plugin

install_local_pysdk::
	python -m pip install -e ./env/src

test_go:: $(TEST_ALL_DEPS)
	$(GO_TEST) ${PROJECT_PKGS}

test_fast:: $(TEST_ALL_DEPS) install_local_pysdk
	# TODO the ignored test seems to fail in pytest but not unittest. Need to trackdown why
	$(TESTSUITE_SKIPPED) python/lib/test || \
		coverage run -m pytest lib/test --ignore lib/test/automation --ignore lib/test/langhost/resource_thens/test_resource_thens.py
	$(TESTSUITE_SKIPPED) python/lib/test/langhost/resource_thens || \
		coverage run -m unittest lib/test/langhost/resource_thens/test_resource_thens.py
	# Using python -m also adds lib/test_with_mocks to sys.path which avoids package resolution issues.
	pushd lib/test_with_mocks; $(TESTSUITE_SKIPPED) python/lib/test_with_mocks || \
		PATH=../../venv/bin:$$PATH coverage run -m pytest; popd
ifneq ($(PULUMI_TEST_COVERAGE_PATH),)
	if [ -e .coverage ]; then coverage xml -o $(PULUMI_TEST_COVERAGE_PATH)/python-fast.xml; fi
endif

test_auto:: $(TEST_ALL_DEPS) install_local_pysdk
	$(TESTSUITE_SKIPPED) auto-python || \
		coverage run -m pytest lib/test/automation
ifneq ($(PULUMI_TEST_COVERAGE_PATH),)
	if [ -e .coverage ]; then coverage xml -o $(PULUMI_TEST_COVERAGE_PATH)/python-auto.xml; fi
endif

test_all:: test_fast test_auto test_go

dist::
	go install -ldflags "-X github.com/pulumi/pulumi/sdk/v3/go/common/version.Version=${VERSION}" ${LANGHOST_PKG}
	cp ./cmd/pulumi-language-python-exec "$$(go env GOPATH)"/bin/
	cp ./dist/pulumi-resource-pulumi-python "$$(go env GOPATH)"/bin/
	cp ./dist/pulumi-analyzer-policy-python "$$(go env GOPATH)"/bin/

brew:: BREW_VERSION := $(shell ../../scripts/get-version HEAD)
brew::
	go install -ldflags "-X github.com/pulumi/pulumi/sdk/v3/go/common/version.Version=${BREW_VERSION}" ${LANGHOST_PKG}
	cp ./cmd/pulumi-language-python-exec "$$(go env GOPATH)"/bin/
	cp ./dist/pulumi-resource-pulumi-python "$$(go env GOPATH)"/bin/
	cp ./dist/pulumi-analyzer-policy-python "$$(go env GOPATH)"/bin/

publish:: build_package
	twine upload \
	-u pulumi -p "${PYPI_PASSWORD}" \
        "env/src/dist"/*.whl \
        --skip-existing \
        --verbose
