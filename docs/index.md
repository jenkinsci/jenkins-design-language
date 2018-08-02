---
title: Jenkins Design Language
layout: index
---

This repository contains the ongoing rewrite; for the JDL 1, you can [find the sources here](https://github.com/jenkinsci/blueocean-plugin/tree/master/jenkins-design-language) and [see the storybook](jdl-storybook)

Jenkins Design Language is a UI library to build interfaces for plugins. The goals are to have a consistent experience for developers, while providing the easiest way to build a UI.

## Example

{% highlight jsx %}
<Page>
<Navigation>
<Group>
<Item><Link to="/docs">Docs</Link></Item>
</Group>
</Navigation>
</Page>
{% endhighlight %}
