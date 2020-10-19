## <img src="images/git-party.gif" height="24" /> Git tips <img src="images/git-party.gif" height="24" />

### Force push and hard reset 
**Do not** use `git push --force`. Use `git push --force-with-lease` <img src="images/muscle.png" title="muscle" height="16" /> <br/>
This will prevent you from accidentally overwriting the history pushed to the same branch by someone else in the meantime.

**Do not** use `git reset --hrad`. Use `git reset --keep` <img src="images/hard-hat-parrot.gif" title="hard-hat-parrot" height="16" /> <br/>
This will prevent you from accidentally losing uncommitted files.

For more details, see http://slides.com/plipski/git-linear-history#/3 and http://slides.com/plipski/git-linear-history#/7

### Previous branch shortcut
Use `git checkout -` or `git switch -` to check out the **previously checked-out branch** <img src="images/leftwards_arrow_with_hook.png" height="16" /> <br/>
The same also works with `git merge -`, `git rebase -` and `git cherry-pick -` <img src="images/cherries.png" title="cherries" height="16" /> <img src="images/pick.png" title="pick" height="16" />

Btw, `cd -` goes into the previous directory in many shells <img src="images/bash.png" title="bash" height="16" />
