## Force push and hard reset
### 25 Mar 2020

**Do not** use `git push --force`. Use `git push --force-with-lease` ![](muscle) <br/>
This will prevent you from accidentally overwriting the history pushed to the same branch by someone else in the meantime.

**Do not** use `git reset --hard`. Use `git reset --keep` ![a](hard-hat-parrot) <br/>
This will prevent you from accidentally losing uncommitted files.

For more details, see [slide 3](http://slides.com/plipski/git-linear-history#/3) and [slide 7](http://slides.com/plipski/git-linear-history#/7)
from Paweł Lipski's `Painless Linear History in Git` presentation


## Previous branch shortcut
### 27 Mar 2020

Use `git checkout -` or `git switch -` to check out the **previously checked-out branch** ![](leftwards_arrow_with_hook) <br/>
The same also works with `git merge -`, `git rebase -` and `git cherry-pick -` ![](cherries) ![](pick)

Btw, `cd -` goes into the previous directory in many shells ![](bash)


## Upstream
### 6 Apr 2020

Next time you do `git push`, add `-u`/`--set-upstream` (or enhance your favorite `gp`/`ggpush`/... alias).<br/>
The perks include:

![](one)  Remote tracking branch info in `git status`:

> $ git status<br/>
> On branch feature/ABC-123<br/>
> Your branch is behind 'origin/feature/ABC-123' by 1 commit, and can be fast-forwarded.

![](two)  `@{upstream}` (`@{u}` for short) resolves to the remote counterpart of the current branch in many contexts, like:
* `git diff @{u}`, much more convenient than `git diff origin/feature/ABC-123`
* `git reset --keep @{u}`, pretty convenient way to (safely! `--keep` FTW) reset the state of branch to whatever is in the remote tracking branch.


## Git rebase
### 24 Apr 2020

To cut-and-paste an arbitrary segment of git history into
another place, use the most general form of `git rebase` ![](scissors):

> git rebase --onto <A=new-base> <B=commits-until> <C=branch-to-rebase>

This means take the _commits from branch C (inclusive) back until
commit B (exclusive) and reapply it onto the commit A_ ![](machete) <br/>
Assuming you're on a branch `feature/foo` that has 3 commits
and that's built upon branch `feature/base`, a typical
invocation will look like:

> git rebase --onto feature/base feature/foo~3 feature/foo

Note that the common form `git rebase feature/base`
is just a special case of the `--onto A B C`
invocation that assumes certain (often unintended)
default values ![](no_good)

Also, it's almost always a good idea to also
pass `-i`/`--interactive` option to rebase (or select
`Interactive mode` in IntelliJ); this way you can
preview what is going to happen or even cancel
the rebase if the range of commits turns out
incorrect ![a](worg-brom-gome)


## Commit storage
### 7 May 2020

Contrary to the popular belief, git does not store
commits as **diffs** (well known from `git diff`,
`git log -p`, `git show` or GitHub/Bitbucket commit/PR view). <br/>
Instead, commits are stored as **full snapshots**
of the entire repository ![](camera_with_flash)

This would lead to a massive disk space waste if
approached naively... but git optimizes the storage
by identifying the files (_blobs_ in gitspeak) and
directories (_trees_ in gitspeak) by SHA-1 hash of
their contents, thus never storing two copies of
an identical file/directory ![](hash)

See `git cat-file -p HEAD` for the internal representation
of the current commit; `tree <hash>` points to the
directory snapshot recorded in `HEAD`. <br/>
`git cat-file -p HEAD^{tree}`, in turn, shows the
representation of this directory snapshot, which
keeps pointers to snapshots of its subdirectories etc. ![a](nyan-cat)

This approach is excellent for source code since it's
typically consisted of small files; storage of large
files that are often changed and/or removed over the
course of git history is, in turn, inefficient (hence
the need for e.g. [Git LFS](https://git-lfs.github.com/)) ![a](github-parrot)


## Remove unnecessary remote branches
### 28 May 2020

`git fetch` by default does not remove
local "mirrors" (`origin/...`) of the
branches that have been removed in the
remote repository ![](wastebasket) <br/>
It only adds/updates the mirrors for the
branches that have been created/updated
in the remote since the last fetch ![](arrow_down) <br/>
The side effect is that local git repositories
usually accumulate a massive number of useless
mirrors even after their counterparts are long
gone from the remote repository
(see `git branch -r` in your repo now) ![](no_good)

To make sure `git fetch` also removes your local
`origin/...` branches corresponding to the branches
already removed in the remote, pass `-p`/`--prune` flag: <br/>

> git fetch -p


## Git reflog
### 4 Jun 2020

Even advanced git users sometimes face the following scenario `(*)`: <br/>
_I commited changes that used [INSERT CLASS/METHOD/TRICK etc.], then I did
[INSERT GIT ACTIONS] and I can no longer find those changes_ ![a](revert-it-parrot)

Git is actually explicitly designed to counteract problems like that;
it guarantees that **anything that's been committed can be retrieved**
unless the repo's been corrupted or GCed in the meantime
(there's a reasonably long GC expiry time even for unreachable commits, though) ![](relieved)

To see the history of how the "current branch" aka `HEAD` pointer has been moving in the past,
view `git reflog` aka the record of all operations that involve moving the `HEAD`
like checkout, commit, merge, pull, rebase, reset, revert etc. ![](scroll)

Now to deal with the `(*)` problem, add `-p`/`--patch` (`git reflog -p`, also works for `git log`)
to see the changes introduced **by every commit that's ever been HEAD in the repo**,
and `/`-search for `[CLASS/METHOD/TRICK]` in the pager, or pipe the output to `grep` ![](sleuth_or_spy)


## Fast-forward only pull
### 27 Jul 2020

Next time you run `git pull`, add `--ff-only` flag (or enhance your favorite `gl`/`gpl`/... alias) ![](pull-request) <br/>
This will ensure that your local branch will only be modified if the pull can be performed
in a **fast-forward** manner (i.e. if the commit of the remote branch
is a descendant of your local branch) ![](bika-bika)

If a pull fails, you can then decide yourself how to deal with the remote branch
that diverged from the local branch; most likely you want to simply reset
(`git reset --keep @{upstream}`) the local branch to whatever commit the remote branch points to ![](point_left)


## Pull requests good practices
### 9 Nov 2020

Keep your pull requests small. As a (relatively) old saying goes,
_10 lines changed = 10 issues on review; 500 lines changed = mmm'kay,
looks fine to me_ ![](xd-thinking)

Of course trimming PRs down to 10 lines is almost always impossible.
Nevertheless, keeping their scope limited makes the job easier for reviewers:
smaller PR means the reviewer needs to keep less context in the "brain cache"
and is less likely to miss an important change ![](brain)

Especially, **refactors should NOT be mixed** with bugfixes or new features.
Naming the branches `refactor/...`, `bugfix/...`, `feature/...`, `chore/...` etc.
helps keep the focus ![a](party-bug)

_But... but... won't small PRs cause that I'll have more git branches
(sometimes stacked on each other), which will make my local repo unmanagable?_
Ha! nope, coz you've got [git-machete-intellij-plugin](https://github.com/VirtusLab/git-machete-intellij-plugin#git-machete-intellij-plugin)
or [git-machete CLI](https://github.com/VirtusLab/git-machete#git-machete) ![a](git-machete-fading)


## Committer vs author
### 12 Jan 2021

Contrary to the popular belief, each commit doesn't contain just one set of
**name+email+date**, but **two** of them ![](gemini)

**Author & author date** are set when the commit is first created using `git commit`. <br/>
These values remain unchanged when the commit is "modified"
(or actually, a new commit is made based on the original one) via amend,
cherry-pick, rebase etc. ![](cherries)![](pick)

**Committer & commit date** are set to the same values as author/author date
when the commit is first created, <br/>
but every time the commit is "modified", they are updated to reflect the current user
(which might differ from the original author) and timestamp ![](writing_hand)

`git log` only displays author&author date by default; use `git log --pretty=fuller`
to include committer&commit date as well ![](+1) <br/>
If author differs from committer, GitHub indicates that by `X authored and Y committed...`
in the commit listing; actually, GitHub also takes **pusher** into account...
which can be different from both author and committer ![](github)
