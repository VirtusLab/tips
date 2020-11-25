## Semantic Versioning
### 2 Apr 2020

We all know and love Semantic Versioning https://semver.org/ aka major = breaking API change,
minor = non-breaking API change, patch = no API change ![](broken_heart)

But there's a catch! Given that you aim at maintaing the compatibility for a reasonably long time
(so as not to force the consumers to constantly adapt), the changes perceived as the most *significant*
are typically coming via **minor**, not **major** releases! ![](hushed)

Minor releases usually add new features and deprecate (but not remove!) the existing ones.
Major releases usually remove the already deprecated features that aren't used anymore -
and therefore often don't seem very *significant* from the consumer's perspective ![](wastebasket)

Note that this is counterintutive to how one might be inclined to think about software versioning -
and hence some products use `marketing-driven versioning` aka `romantic versioning` instead -
*major release for significant changes, minor release for less significant changes*.
See http://sentimentalversioning.org/ for a nice diss of node.js/backbone.js/TeX ![a](party-poop)


## Semver vs Forward compatibility
### 16 Apr 2020

Semantic versioning (aka *sane versioning*) tells that whether
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
API - a newer client will crash when trying to
call the newly-added endpoint on the older API ![](stackoverflow)<br/>
Similarly for a major aka **non-backward-compatible**
change - it can still **preserve forward compatibility**...
think of removing an endpoint from the API ![a](haha-babuga)


## Date/time representation
### 22 Apr 2020

Avoid date/time representations that correspond to
a **local date/time**. Examples include Java's `LocalDateTime`
and SQL's `TIMESTAMP` aka `TIMESTAMP WITHOUT TIME ZONE` ![](nie)

The problem is that they give an **impression of pointing
to a specific point in time** while in fact, they don't ![](bangbang)

What specific instant they point to depends on what
time zone happens to be assumed for them further down
the application code...<br/>
You might come across advice to always treat local date/-
time as UTC, but that's hard to enforce in practice ![](niby-czlowiek-wiedzial)

For instance, in a JVM-based app, a single call to
`LocalDateTime.now()` will pollute the domain with a
value that's implicitly timezoned to **default** TZ of
the machine - which is typically **different from UTC**! ![a](pepepanic)

As a rule of thumb, always use `java.time.ZonedDateTime`/`org.joda.time.DateTime` (on JVM),
`TIMESTAMP WITH TIME ZONE` (in SQL) or generally: the timestamp types
for the given platform/DB that actually represent a specific point in time. ![](spurdo-thumbs-up)
