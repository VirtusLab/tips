Force push and hard reset
25 March 2020

**Do not** use `git push --force`. Use `git push --force-with-lease` ![](muscle) <br/>
This will prevent you from accidentally overwriting the history pushed to the same branch by someone else in the meantime.

**Do not** use `git reset --hard`. Use `git reset --keep` ![a](hard-hat-parrot) <br/>
This will prevent you from accidentally losing uncommitted files.

For more details, see http://slides.com/plipski/git-linear-history#/3 and http://slides.com/plipski/git-linear-history#/7

=======
Previous branch shortcut
27 March 2020

Use `git checkout -` or `git switch -` to check out the **previously checked-out branch** ![](leftwards_arrow_with_hook) <br/>
The same also works with `git merge -`, `git rebase -` and `git cherry-pick -` ![](cherries) ![](pick)

Btw, `cd -` goes into the previous directory in many shells ![](bash)
