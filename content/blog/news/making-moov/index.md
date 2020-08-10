---
title: "Making Moov"
date: "2020-08-10T19:23:51+08:00"
featured: true
resources:
- name: feature
  src: images/moov-line-logo.jpg
categories: 
    - News & updates
authors: 
    - Josh Sadler
    - Wade Arnold
---

{{< lead >}}
First of all, hi, we’re Moov. We’re a new company with a mission to bring joy to developers tasked with building on top of the United States banking and payments infrastructure. We have [world-class investors](/investors) that believe in our mission and we’re [building a team](/careers) of men and women who are passionate about building a better future.
{{< /lead >}}

## The beginning
Moov’s story begins with founder and CEO Wade Arnold, who founded Banno, a white-label digital banking platform for community banks and credit unions, in 2008. Banno was acquired by Jack Henry & Associates, Inc. in 2014 and has become the premier digital banking and open API platform. After leaving Jack Henry in 2016, Wade joined BILLGO, a leading bill payment company, as EVP of Technology and interim CTO. Wade’s experience in the digital banking, core banking, and payments space led to a deep understanding of the challenges in building modern banking software in the United States.

Wade’s a programmer first, so in 2017 he started building a “protocol to API” for ACH, the primary method of electronic money movement in the US. 

{{< callout >}}
> The goal of this project was to take something that all of us in fintech need, that isn’t a strategic differentiator in any business, and make it open source. 
{{< /callout >}}


To get technical for a minute, the [Moov ACH library](https://github.com/moov-io/ach) was written in Go, which is a modern and cloud-native programming language growing in popularity, and can be used as a library in a Go project or as a RESTful HTTP API. The library makes it easy for developers to generate NACHA formatted files.

Not surprisingly, the ACH library was immediately useful to developers frantically searching Github to find an easy way to implement something to meet the needs of their business. A developer community was born. “Is this real?” “Does it work?” “Who else uses this?” are all reasonable questions to ask of critical financial infrastructure available as an Apache 2.0 open source software on the public internet.

To support the developer community, a Slack organization was created to provide support, get feedback, fix bugs, and increasingly, allow members that were building products to make connections to other builders. Today the Slack community has over 450 members. Well-known fintechs and financial institutions, and companies serving other verticals joined the Slack and started contributing to the open source projects. 


## Starting a Moovment
More libraries were created for low-level protocols like Fedwire, OFAC sanctions lists, Image Cash Letter for Check 21, Metro 2 consumer credit reports, ISO 8583 for card payments, etc. These are things that are hard to build on your own, at least without studying the specifications, but with a community contributing their expertise, these implementations become more stable and feature rich.

Moov’s purpose and story was to be the modular building blocks on which companies needing to move money and store value can be built, backed by an open and inclusive community. A movement (moovment?) is nothing without a logo, so Gigantic Design, a firm based in Dubuque, Iowa, took on the task to create Moov’s brand. 

## Moov, the company

Enter Moov Financial, Inc.

![The Moov logo](/images/logos/base-moov-black.svg)

At the heart of Moov is an open source community committed to delivering high-quality, industry standard financial service protocols for any business looking to receive, send or store money. We use these libraries ourselves and care about how they work for others. 

For too long the developers have been scouring the internet attempting to quickly become experts and deploy high quality, working financial service protocols, like ACH. Too many organizations have been forced to build half-baked ACH libraries, or several inside of the same organization, only to have significant technical debt to resolve years later. 

{{< callout >}}
> By delivering the right tools, documentation and services, Moov empowers developers to focus on delivering high quality code without wasting precious time reinventing the wheel.
{{< /callout >}}

Now backed by 7 institutional investors and 27 influential individuals in our $5.5 million seed round, Moov is building a platform for platforms. 

Let’s take a quick detour to study the three elements of a platform as defined by Mark Bonchek and Sangeet Paul Choudary in their [2013 Harvard Business Review article](https://hbr.org/2013/01/three-elements-of-a-successful-platform):

> In our view, the success of a platform strategy is determined by three factors:

- **Connection:** how easily others can plug into the platform to share and transact
- **Gravity:** how well the platform attracts participants, both producers and consumers
- **Flow:** how well the platform fosters the exchange and co-creation of value

We’re developers for developer-first at Moov, so modularity is a key tenant of our system. Who are we to determine which other systems you can integrate with? APIs, webhooks and event-based architecture make it possible to connect systems without the challenges many of us have experienced with legacy systems.

Already we’ve seen a gravitational pull to Moov’s Slack community from those wanting to contribute and share and those that want to use a system that will make the initiatives within their company easier to obtain. 

The “co-creation of value” is a beautiful definition for open source and a community of people sharing ideas and expertise.

## The brand

Our brand image aligns with our values. We think software should be beautiful. Not just in how it looks, but in how it works, even under the hood. We designed a logo and identity that could grow and evolve with us.

{{< tweet 1286648846852947969 >}}

The logo is simple enough on its own but stands out among the crowd of other emerging fintechs and financial infrastructures companies. Moov takes on the characteristics of what we want to communicate and what we stand behind. We’re a community, and want that community to be seen within our logo.

![The Moov logo](/images/moov-logo-animation.gif)

## What's next

We’re just getting started. [We’re hiring](/careers) to accelerate our product roadmap, foster the community, and enable developers to be heroes.

If our mission resonates with you, [follow us on Twitter](https://twitter.com/moov_io), [star us on Github](https://github.com/moov-io), [join us on Slack](https://slack.moov.io), or get involved in the way that works best for you.