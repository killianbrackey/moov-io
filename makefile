VERSION := v0.1.0-dev

.PHONY: build

build: AUTHORS
	docker build -t moov/moov-io:$(VERSION) -f Dockerfile .
	docker tag moov/moov-io:$(VERSION) moov/moov-io:latest

serve:
	python -m SimpleHTTPServer

# From https://github.com/genuinetools/img
.PHONY: AUTHORS
AUTHORS:
	@$(file >$@,# This file lists all individuals having contributed content to the repository.)
	@$(file >>$@,# For how it is generated, see `make AUTHORS`.)
	@echo "$(shell git log --format='\n%aN <%aE>' | LC_ALL=C.UTF-8 sort -uf)" >> $@

release-push:
	docker push moov/moov-io:$(VERSION)
