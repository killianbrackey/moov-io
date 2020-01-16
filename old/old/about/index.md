## Introduction

Welcome to Moov! We are a company building financial software ... We strive to hire a talented set of people who are passionate about solving tough problems in an open community.

## Handbook

We write down and share this handbook for several reasons:

- Reading is async, faster than listening, and quickly searchable
- Communicating changes can be performed and be acknowledged by the entire staff prior to merging
- Anyone can offer minor fixes such as spelling, rare display bugs, and/or content reformatting.

## Values

We want to foster a technical and supportive community of people from many areas of expertise. ...

Using these values there are a few practices at Moov which help us support others.

- Collaboration
  - Helping others has a larger impact than focusing on yourself. If you can assist someone for a few minutes they will carry through momentum at their task.
  - Write proposals and solutions down on issues. Post whiteboards or ASCII diagrams onto issues. What isn't recorded will be forgotten.
- Sharing
  - By defualt Moov is 100% open, which means our discussions, changes and bug are public. We do this to grow trust with our community as problems they encounter are our responsibility
- Humility
  - We're all people typing away at screen for hours a day. Many of us have hobbies or children and our time spent towards Moov represents only a fraction of our lives.
  - Default to positive intent when conflict brews as it's likely a misunderstanding.
- Blameless problem solving
  - Mistakes happen. Production will have terrible bugs. We will lose customers. Our focus must be on solving problems as a team and supporting each other to do our best day in and day out.

## Implementation

- Small Changes
  - Often we don't have the best initial idea, but improve it overtime and so smaller changes to code or policies are easier to revert. Large changes which impact us suddenly are harder to deal with.
- Ambitious Uncertainty
  - Moov is attempting solve hard problems in an innonvative way, which means we will be tasked with problems none of us have ever solved before. This should be embraced and thrived on.
- Enjoy Bordem
  - Boring solutions are often that way because of their widespread usage before Moov. We don't need to reinvent the wheel everywhere and should focus that energy in novel areas.

### Policies

Moov is regularly audited to affirm various security, data integrity and privacy controls for our applications to perform as our customers expect. We [enforce these policies](https://moov.io/soc2/) and make them available publically.

## Communication

By defailt Moov communication is async, which means a reply might come right away or a few hours later. They may be at an event for their kids or asleep so be aware that they will eventually respond. If you need urgent responses please escalate with PagerDuty.

Please discuss in public channels over using private groups or messages. When discussions are in private the results are unknown to others and easily lost when making changes as a result.

### Private Material

Not all information or discussions will be public at Moov. We default to openness, but there are several areas where information needs to remain private.

- Security vulnerabilities
  - Exposing information about technical attacks prior to their resolution can allow data to be leaked, unplanned customer downtime, and among others loss in trust from the community.
- Financials
  - Moov's financial state including revenue and costs for the company is confidential.
- Personal contact or residency
  - The physical or digital contact, geographic, and other such information is to be kept private to maintain their privacy. Additional examples to be kept private are their compensation, termination, and background/reference checks.
- Company partnerships and Acquisitions
  - We plan press releases, feature launches, and other such matters with partners to have professional and successful announcements. These are key to Moov's continued growth.
- Customer Information
  - Revealing every customer of Moov would allow competitors to more easily sell towards them and could negatively impact our business operations. Also, not every customer wants their partnerships publci.
  - Try to avoid naming customers in issues and changes as that can accidently leak information. Link to their CRM information instead.

## Teams

### Engineering

#### Communication

- Github Issues and Slack
  - Each bug report, feature request, or suggestions should be made as an Issue on the respective project. This helps us prioritize planned work on [our GitHub Projects Board](https://github.com/orgs/moov-io/projects/1) and offers the community a near-term roadmap.
- Pull Requests
  - Code is offered by employees and the community via Pull Requests (PR). Each PR is automatically tested, linted, and analyzed by various checks according to the project.
- Mailing list
  - Our [moov-users google group](https://groups.google.com/forum/#!forum/moov-users) is open to the public where we announce new releases along with answering community questions.

#### Implementation

With each change being submitted in a Pull Request this allows automated testing, validation, and linting prior to additional into our production codebase. Each change has the potential to disrupt other employees, the community or our release schedule so we strive to maintain successful builds and small easily revertable changes.

When beginning work review the open issue to confirm you understand the problem, have at least one solution in mind and can create a solution. If you need help please reach out and ask questions you may have at any time.

#### Monitoring

- We run several infrastructure services to monitor our running systems: [Graphs](https://infra.moov.io/grafana/), [Logging](https://infra.moov.io/grafana/explore), and [Alerting](https://infra.moov.io/prometheus/)

If you encounter problems or have questions with these please contact the `#infra` Slack channel.

## Contributing

If you have a change to make please open a pull request and offer your changes to the documentation. We've based this handbook from [Gitlab's Handbook](https://about.gitlab.com/handbook/).

## License

Apache License 2.0 See [LICENSE](../LICENSE) for details.
