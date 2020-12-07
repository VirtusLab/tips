## Semantic Versioning
### 2 Apr 2020

We all know and love [Semantic Versioning](https://semver.org/) aka major = breaking API change,
minor = non-breaking API change, patch = no API change ![](broken_heart)

But there's a catch! Given that you aim at maintaing the compatibility for a reasonably long time
(so as not to force the consumers to constantly adapt), the changes perceived as the most _significant_
are typically coming via **minor**, not **major** releases! ![](hushed)

Minor releases usually add new features and deprecate (but not remove!) the existing ones.
Major releases usually remove the already deprecated features that aren't used anymore &mdash;
and therefore often don't seem very _significant_ from the consumer's perspective ![](wastebasket)

Note that this is counterintutive to how one might be inclined to think about software versioning &mdash;
and hence some products use `marketing-driven versioning` aka `romantic versioning` instead &mdash; _major release for significant changes, minor release for less significant changes_.
See [sentimentalversioning.org](http://sentimentalversioning.org/) for a nice diss of node.js/backbone.js/TeX ![a](party-poop)


## Semver vs Forward compatibility
### 16 Apr 2020

Semantic versioning (aka _sane versioning_) tells that whether
a change is major/minor depends on API compatibility... but note
that's always about **backward** compatibility ![](back) i.e. whether an
**older API client** will still be able to use a **newer API provider** ![](older_adult)

Forward compatibility, in turn, is suspiciously never mentioned
by [semver spec](https://semver.org/) and for a good reason: it's typically
less important to make sure that a **newer API client** is able
to use an **older API provider** ![](shrug)<br/>
There are exceptions, however, like when the API client is some
kind of plugin to the API provider, e.g. an IDE... we might want
a plugin built against a newer API to be still pluggable to older
versions of the API provider ![](electric_plug)

A surprising consequence is that a minor aka
**backward-compatible** change can still **break forward
compatibility** ![](hushed) think of adding an endpoint to the
API &mdash; a newer client will crash when trying to
call the newly-added endpoint on the older API ![](stackoverflow)<br/>
Similarly for a major aka **non-backward-compatible**
change &mdash; it can still **preserve forward compatibility**...
think of removing an endpoint from the API ![](wastebasket)
