## moov-io

[![Netlify Status](https://api.netlify.com/api/v1/badges/f2a38aae-87b3-4af0-9b35-608767d4b199/deploy-status)](https://app.netlify.com/sites/moov-io/deploys)
[![Apache 2 licensed](https://img.shields.io/badge/license-Apache2-blue.svg)](https://raw.githubusercontent.com/moov-io/moov-io/master/LICENSE)

This repository holds our public website ([moov.io](https://moov.io)) discussing our products and features.

## Getting Started / Install

1. Clone the repository somewhere (`git clone git@github.com:moov-io/moov-io.git`).
1. Edit the files you want locally
1. Run `hugo serve` to run a webserver at [localhost:1313](http://localhost:1313).
1. Commit your changes, push up a new branch, and create a Pull Request!
   1. Optional: Verify your changes with github pages (load `user.github.io/moov-io` in a browser).

## Production Deploys

1. Merge an approved PR to the `master` branch
1. Login to the [moov-bot](https://github.com/moov-bot) GitHub account.
   1. @adamdecaf or @wadearnold should have access to this
1. "Login with GitHub" to the [Netlify](https://www.netlify.com/) dashboard

## Content Management

- Please refer to [Hugo's documentation](https://gohugo.io/content-management/) for details on modifying content.

## Updating Hugo Theme

Inside the theme directory run `git pull`. Then `make build && make run` to verify the site loads as expected and then open a pull request.

```
$ cd themes/hugo-fresh/

$ git pull origin master
From https://github.com/StefMa/hugo-fresh
 * branch            master     -> FETCH_HEAD
Updating 1896157..5ebe24e
Fast-forward
```

## Getting Help

 channel | info
 ------- | -------
 [Project Documentation](https://docs.moov.io/) | Our project documentation available online.
 Google Group [moov-users](https://groups.google.com/forum/#!forum/moov-users)| The Moov users Google group is for contributors other people contributing to the Moov project. You can join them without a google account by sending an email to [moov-users+subscribe@googlegroups.com](mailto:moov-users+subscribe@googlegroups.com). After receiving the join-request message, you can simply reply to that to confirm the subscription.
Twitter [@moov_io](https://twitter.com/moov_io)	| You can follow Moov.IO's Twitter feed to get updates on our project(s). You can also tweet us questions or just share blogs or stories.
[GitHub Issue](https://github.com/moov-io) | If you are able to reproduce a problem please open a GitHub Issue under the specific project that caused the error.
[moov-io slack](https://slack.moov.io/) | Join our slack channel to have an interactive discussion about the development of the project.

## Contributing

Yes please! Please start by reviewing our [Code of Conduct](https://github.com/moov-io/ach/blob/master/CODE_OF_CONDUCT.md).

You only have a fresh set of eyes once! The easiest way to contribute is to give feedback on the documentation that you are reading right now. This can be as simple as sending a message to our Google Group with your feedback or updating the markdown in this documentation and issuing a pull request.

- [moov.io](https://moov.io/) (This project)
- [api.moov.io](https://api.moov.io/)
- [docs.moov.io](https://docs.moov.io/)

## License

Apache License 2.0 See [LICENSE](LICENSE) for details.
