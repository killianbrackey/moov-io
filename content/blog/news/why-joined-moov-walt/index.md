---
title: "Open-Source Embedded Financial Services [or] Why I Fell in Love with Moov"
date: "2020-08-14T19:24:51+08:00"
featured: true
resources:
- name: feature
  src: images/feature.jpg
categories: 
    - News & updates
authors: 
    - Walt Cox
---

Financial Services in the US thrive on legacy technology, shrouded in payment jargon operating on top of COBOL systems processing trillions of dollars with text-based files. So how does one embark on the ancient wilderness of US payment systems? Without a Delorean to take you back to the 1970s, for my part, I’ve always been a bit obsessed with understanding how something works from the inside out, like taking apart a lamp when I was three years old. So I jumped at the opportunity to work inside of a financial institution, I wanted to see and touch everything from the inside.

Very quickly, the allure of moving tens of millions of dollars to and from the Fed every day lost its appeal once faced with the unending and unforgiving task of reconciling two dozen general ledgers daily, not to mention disputes, errors, and exceptions. Running and scaling teams on proprietary, legacy software translate to teaching young, smart individuals to think in terms of 1980’s processes; cut-offs, memo-post, outdated reporting, ungodly sized exception files that can’t be modified, nor thrown into Excel without custom programs on top of a banks core system.  This problem becomes compounded when working with hundreds of proprietary programs built on and around the core system within a financial institution.

{{< callout >}}
> And so I joined the thousands of companies, banks, and folks before me, and began building software to prop up legacy software, to solve a customer usability problem, reporting issues, or business process.
{{< /callout >}}

Sometime later, as a product manager inside of a billion-dollar unicorn I had a problem; I could fall back to using a proprietary third-party ACH solution, or I could attempt to build against the NACHA standards. While a third party implementation translates to a faster time-to-market, as I learned in my previous roles, it lends to building workstreams around someone else's interpretation of the standard. Instead, I turned to open source to learn about ACH and how others might be generated ACH files with OSS libraries. I had a proficient working knowledge of ACH and understood what was required inside of a financial institution to process and settle, audit, and meet daily cut-offs and I had a sponsor bank. Sure I could run a team around ACH, but I didn’t understand the file mechanics, and couldn’t yet translate that to a set of requirements for my developers. The technical construct of the file, batch headers, entry record details, addenda records, and the million other details that make up the backbone of money movement in the US banking system. What’s the difference in batching single verse hundreds of entries and what’s the differences in the file between same-day and standard ACH? What happens when I’m sending files out of balance? How can I translate 600 pages of NACHA regulations into a programming language? I needed help and answers from a trusted source whose work was evaluated, tested, and validated against a public forum.

Naturally, I turned to my most trusted allies; Google, Stack Exchange, GitHub, who unanimously delivered the top result for open-source ACH libraries in May 2019; Moov.io. Now Moov ACH is no casual GitHub library. What started as a pet project by one of the foremost FinTech innovators of our time, turned into the most starred ACH library on GitHub; delivering a referenceable, freely licensed software that anyone could chew through to understand and launch an ACH product. I was elated.

{{< callout >}}
> Moov’s work is not a proprietary abstraction on the standard of ACH; it’s the NACHA standard built-in a Go library.
{{< /callout >}}

The power of translating a standard into software means that my proprietary implementation of ACH could be measured against a living, working standard that was battle-tested and validated by production deployments, with trillions of transactions processed against this single library. My engineers didn’t have to trust my interpretation of NACHA rules and guidelines, they could reference the Github libraries and documentation.

My engineers could join a thriving open-source community to ask questions and jump into working sessions. Rather than submit a ticket, enter a 12-18 month roadmap cycle where executives beg, yell and plead cases for improved features, engineers could submit pull requests or jump on a call and speak with other engineers about improving the code (what a concept!). I had sought an open-source ACH standard, but I had discovered an ocean of open-source financial service protocols and a community rallying around and supporting it.

Last week was my first week at Moov and I’ve become enamored with the model,  team, culture, and projects. We are embarking on bringing the open-source model to financial services, where everyone involved can benefit together. These are not mere standards that lie in wait for adoption by a broader community. Moov is a business able to process directly to the Fed for ACH, wires, check image processing, and much more. I have never seen more technology underpinning a startup, nor have I seen a bigger groundswell of support driving a company forward (500 community users and growing!). I encourage you to join our Community, poke around our 37+ Github projects  and join us if you’re interested in shedding light on the basic functions of financial services.