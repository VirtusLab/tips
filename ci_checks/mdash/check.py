import sys
from glob import glob
import re

from conf import MD_FILES_PATH

unwanted_hyphen_regex = re.compile(r'^.* [–-] ', flags=re.MULTILINE)

was_error = False

for filename in glob(f'{MD_FILES_PATH}/*.md'):
    with open(filename, mode='r') as file:
        content = file.read()
        for match in unwanted_hyphen_regex.finditer(content):
            print(f'You have an unwanted hyphen (-) instead of mdash (&mdash;) in file "{filename}": "{match.group(0)}"')
            was_error = True

if was_error:
    sys.exit(1)
