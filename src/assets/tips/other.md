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
You might come across advice to always treat local date/
time as UTC, but that's hard to enforce in practice ![](niby-czlowiek-wiedzial)

For instance, in a JVM-based app, a single call to
`LocalDateTime.now()` will pollute the domain with a
value that's implicitly timezoned to **default** TZ of
the machine &mdash; which is typically **different from UTC**! ![a](pepepanic)

As a rule of thumb, always use `java.time.ZonedDateTime` (on JVM),
`TIMESTAMP WITH TIME ZONE` (in SQL) or generally: the timestamp types
for the given platform/DB that actually represent a specific point in time. ![](spurdo-thumbs-up)
