VERSION=v$(shell date +"%Y.%m.%d").1

.PHONY: build
build:
ifeq ($(TRAVIS_OS_NAME),)
	cd ./site && hugo
else
	cd ./site && ../hugo
endif
	docker build --pull -t moov/moov-io:$(VERSION) -f Dockerfile .
	docker tag moov/moov-io:$(VERSION) moov/moov-io:latest

.PHONY: run
run:
	docker run --read-only -p 8080:8080 -v $(shell pwd)/nginx/cache/:/var/cache/nginx -v $(shell pwd)/nginx/run/:/var/run moov/moov-io:$(VERSION)

.PHONY: release-push
release-push:
	docker push moov/moov-io:$(VERSION)
	docker push moov/moov-io:latest

# From https://github.com/genuinetools/img
.PHONY: AUTHORS
AUTHORS:
	@$(file >$@,# This file lists all individuals having contributed content to the repository.)
	@$(file >>$@,# For how it is generated, see `make AUTHORS`.)
	@echo "$(shell git log --format='\n%aN <%aE>' | LC_ALL=C.UTF-8 sort -uf)" >> $@

.PHONY: tag
tag:
	git tag $(VERSION)
	git push origin $(VERSION)
