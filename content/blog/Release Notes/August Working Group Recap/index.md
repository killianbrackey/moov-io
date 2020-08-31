---
title: "August Recap of Moov community working groups"
date: "2020-08-31T08:23:51+08:00"
resources:
- name: feature 
  src: images/cover.jpg
categories: 
    - Release Notes
authors: 
    - Graham McBain
---
## August Working Group Recap

This month marked the first meetings of the Moov ACH & ICL working groups. Our first of many ongoing monthly meetings where community members come together and discuss how we can improve our open source projects. This all started a few weeks ago when one community member asked a question about mobile check capture. What resulted was a lengthy discussion and finally a suggestion to host a call. 

During the ICL call we had roughly a dozen community members join for a lively discussion of a few topics. Early on it was decided that for legal reasons, finding an open source solution to mobile image capture wasn’t going to be the best use of time. The conversation then took a turn and we discovered some pain points that we can work on.

Later in the month it was time for the ACH kickoff call and we again had a strong showing from the community. This discussion ended up focusing on how we can make it easier for people to generate ACH files from common invoices or file types. With so many people still using tools like excel to keep records it's important that we provide translators or at the very least guides to make this easier.

Each of these calls created some actionable issues and questions that we're hoping the community can help with. Take a look at the issue's below, leave a comment or join the next workshop to help shape the future of Fintech! 

### Image Cash Letter Community Suggestions:

#### X9 viewer that works on Mac
Many on the call raised the issue that there is no available X9 viewer that works for mac. While we are working on something that would work in the browser, this issue was opened on the project if you’d like to take a look here: https://github.com/moov-io/imagecashletter/issues/109

#### Expanded support for longtail of X9 formats in Reader Function
Many vendors use different formats and it’s not entirely clear what the format is until it is rejected by the ODFI. Our proposed solution is to attempt to discover the format of a given file if it’s unknown. You can read more about the proposed solution here: https://github.com/moov-io/imagecashletter/issues/111

#### ICL format field guide
There is a lot of knowledge around ICL formats that isn’t widely available. During the call, Zach from HM Bradley suggested we create a human readable “field guide” that explains all the different formats, which vendors use them and how to differentiate between them. This project will be started soon and will live in the ICL documentation here: https://moov-io.github.io/imagecashletter/


### ACH Community Suggestions:

#### EDI Record Support
There is a wide variety of EDI records that are used throughout the private and public sectors. These records are often followed by payment remittance that can take the form of an ACH. By supporting popular EDI records we can allow businesses to more quickly and easily programmatically create ACH payments from their EDI records. We’re currently seeking input from the community on which records are most in demand for this service: https://github.com/moov-io/ach/issues/773


#### Translators for CSV/XSLS and other common file types
As Wade said on our ACH working group call, “There are probably trillions of dollars in ACH payments that start as an excel file”. Taking this assumption into account we have floated the idea of creating a sub package in the ACH project for turning CSV/XSLS files into ACH files. https://github.com/moov-io/ach/issues/775

#### Standard ACH Workflows Library
Between the low level ACH library and the high level PayGate API there was a request for another library to sit in between. This project would handle common workflows that cover most ACH use cases. If this is a project that interests you, please give feedback on the issue here: https://github.com/moov-io/ach/issues/776



### If you’d like to join any of these working groups you can signup using the forms below:

(ACH working group)[https://forms.gle/ygSiDJ8si2pzFaQx8]

(ICL working group)[https://forms.gle/AxSQTS4fUD5RU1dz8]

(Watchman working group)[https://forms.gle/aRk3TBk29uXuDk9D9]


These working groups have been invaluable for us to connect with the community. We love hearing from people using the libraries and get their feedback on how they can be improved. In the month of September we are continuing the ICL/ACH groups as well as launching a new working group around our Watchman project. 

Thank you to everyone in the community who contributed. We appreciate everyone’s involvement in helping us make the financial world run more smoothly. 
