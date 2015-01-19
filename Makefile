# Binaries
CD ?= cd
CP ?= cp
CODECLIMATE ?= ./node_modules/.bin/codeclimate
GIT ?= git
ISTANBUL ?= ./node_modules/.bin/istanbul
JSCS ?= ./node_modules/.bin/jscs
JSDOC ?= ./node_modules/.bin/jsdoc
JSHINT ?= ./node_modules/.bin/jshint
MOCHA ?= ./node_modules/.bin/mocha
_MOCHA ?= ./node_modules/.bin/_mocha
NPM ?= npm

# Options
COVERAGE_DIR ?= coverage
DOCS_DIR ?= docs
DOCS_GIT_REMOTE ?= https://$(GITHUB_TOKEN)@github.com/captaindash/node-mention-api.git
DOCS_GIT_BRANCH ?= gh-pages
ISTANBUL_FLAGS ?=
JSCS_FLAGS ?=
JSHINT_FLAGS ?=
MOCHA_FLAGS ?= --recursive --check-leaks

# Sources
README_MD := README.md
PACKAGE_JSON := package.json
JS_LIB := lib/
JS_TEST := test/

# Targets

all: node_modules lint cover docs

node_modules:
	$(NPM) install

jshint: $(JS_LIB)
	$(JSHINT) $(JSHINT_FLAGS) $^

jscs: $(JS_LIB)
	$(JSCS) $(JSCS_FLAGS) $^

lint: jshint jscs

test: $(JS_TEST)
	$(MOCHA) $(MOCHA_FLAGS) --bail $^

tdd: $(JS_TEST)
	$(MOCHA) $(MOCHA_FLAGS) --watch --growl $^

cover: $(JS_TEST)
	$(ISTANBUL) $(ISTANBUL_FLAGS) cover $(_MOCHA) --dir $(COVERAGE_DIR) -- $(MOCHA_FLAGS) $^

lcov: $(JS_TEST)
	$(ISTANBUL) $(ISTANBUL_FLAGS) cover $(_MOCHA) --dir $(COVERAGE_DIR) --report lcovonly -- $(MOCHA_FLAGS) $^

$(DOCS_DIR): $(JS_LIB)
	$(JSDOC) --private --recurse $(JS_LIB) --readme $(README_MD) --package $(PACKAGE_JSON) --destination $(DOCS_DIR)

push-lcov: lcov
	$(CODECLIMATE) < $(COVERAGE_DIR)/lcov.info

push-docs: $(DOCS_DIR)
	$(CD) $(DOCS_DIR)/*/*
	$(GIT) init
	$(GIT) config user.name "Travis-CI"
	$(GIT) config user.email "travis@captaindash.com"
	$(GIT) add .
	$(GIT) commit -m 'chore: deploy the documentation'
	$(GIT) push --force --quiet $(DOCS_GIT_REMOTE) master:$(DOCS_GIT_BRANCH) >/dev/null 2>&1
	$(CD) -

.PHONY: all jshint jscs lint test tdd cover lcov push-lcov push-docs
