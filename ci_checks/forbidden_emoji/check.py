#!/usr/bin/python3
from glob import glob
import sys
import re

from conf import MD_FILES_PATH, FORBIDDEN_EMOJI


map_of_forbidden_emoji = {emoji.emoji_name: emoji for emoji in FORBIDDEN_EMOJI}

emoji_regex = re.compile(r'!\[a?\]\((.*?)\)')

forbidden_emoji_detected = False

for filename in glob(f'{MD_FILES_PATH}/*.md'):
    with open(filename, mode='r') as file:
        content = file.read()
        for match in emoji_regex.finditer(content):
            emoji_name = match.group(1)
            if emoji_name in map_of_forbidden_emoji:
                print(map_of_forbidden_emoji[emoji_name].forbidden_message(filename))
                forbidden_emoji_detected = True

if forbidden_emoji_detected:
    sys.exit(1)
