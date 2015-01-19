# Binaries
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
JS_LIB := lib/
JS_TEST := test/


# Targets

all: node_modules lint test

node_modules:
	@$(NPM) install

jshint: $(JS_LIB) $(JS_TEST)
	@$(JSHINT) $(JSHINT_FLAGS) $^

jscs: $(JS_LIB) $(JS_TEST)
	@$(JSCS) $(JSCS_FLAGS) $^

lint: jshint jscs

test: $(JS_TEST)
	@$(MOCHA) $(MOCHA_FLAGS) --bail $^

tdd: $(JS_TEST)
	@$(MOCHA) $(MOCHA_FLAGS) --watch --growl $^

cover: $(JS_TEST)
	@$(ISTANBUL) $(ISTANBUL_FLAGS) cover $(_MOCHA) -- $(MOCHA_FLAGS) $^

cover-lcov: $(JS_TEST)
	@$(ISTANBUL) $(ISTANBUL_FLAGS) cover $(_MOCHA) --report lcovonly -- $(MOCHA_FLAGS) $^


.PHONY: all lint test tdd cover cover-lcov
