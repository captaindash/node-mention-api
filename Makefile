# Binaries
CD ?= cd
CODECLIMATE ?= ./node_modules/.bin/codeclimate
CP ?= cp
GIT ?= git
ISTANBUL ?= ./node_modules/.bin/istanbul
JSCS ?= ./node_modules/.bin/jscs
JSHINT ?= ./node_modules/.bin/jshint
MOCHA ?= ./node_modules/.bin/mocha
_MOCHA ?= ./node_modules/.bin/_mocha
NPM ?= npm

# Options
ISTANBUL_FLAGS ?=
JSCS_FLAGS ?=
JSHINT_FLAGS ?=
MOCHA_FLAGS ?= --recursive --check-leaks

# Sources
LIB := lib
TESTS := test
TESTS_COMMON := $(TESTS)/common.js
UNIT_TESTS := $(TESTS)/unit
FUNCTIONAL_TESTS := $(TESTS)/functional
COVERAGE := coverage
LCOV := $(COVERAGE)/lcov.info

# Targets

all: node_modules lint cover

node_modules:
	$(NPM) install

jshint: $(LIB)
	$(JSHINT) $(JSHINT_FLAGS) $^

jscs: $(LIB)
	$(JSCS) $(JSCS_FLAGS) $^

lint: jshint jscs

test: test-unit test-functional

test-unit: $(TESTS_COMMON) $(UNIT_TESTS)
	$(MOCHA) $(MOCHA_FLAGS) --bail $^

test-functional: $(TESTS_COMMON) $(FUNCTIONAL_TESTS)
	$(MOCHA) $(MOCHA_FLAGS) --bail $^

$(COVERAGE): $(TESTS_COMMON) $(UNIT_TESTS)
	$(ISTANBUL) $(ISTANBUL_FLAGS) cover $(_MOCHA) --dir $(COVERAGE) -- $(MOCHA_FLAGS) $^

$(LCOV): $(TESTS_COMMON) $(UNIT_TESTS)
	$(ISTANBUL) $(ISTANBUL_FLAGS) cover $(_MOCHA) --dir $(COVERAGE) --report lcovonly -- $(MOCHA_FLAGS) $^

push-lcov: $(LCOV)
	$(CODECLIMATE) < $<

.PHONY: all jshint jscs lint test test-unit test-functional push-lcov
