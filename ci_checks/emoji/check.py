#!/usr/bin/python3
from glob import glob
from os.path import isfile
from os import listdir
import sys
import re

from conf import MD_FILES_PATH, EMOJI_FILES_PATH, FORBIDDEN_EMOJI


map_of_forbidden_emoji = {emoji.emoji_name: emoji for emoji in FORBIDDEN_EMOJI}

emoji_regex = re.compile(r'!\[(a?)\]\((.*?)\)')

is_error = False

emoji_filename_list = []

for filename in glob(f'{MD_FILES_PATH}/*.md'):
    with open(filename, mode='r') as file:
        content = file.read()
        for match in emoji_regex.finditer(content):
            is_animated = match.group(1) == 'a'
            emoji_name = match.group(2)

            # Add emoji to an emoji_filename_list
            expected_emoji_filename = f'{emoji_name}.{"gif" if is_animated else "png"}'
            emoji_filename_list.append(expected_emoji_filename)

            # Check if emoji is forbidden
            if emoji_name in map_of_forbidden_emoji:
                print(map_of_forbidden_emoji[emoji_name].forbidden_message(filename))
                is_error = True

            # Check if emoji has a corresponding image file
            expected_emoji_path = f'{EMOJI_FILES_PATH}/{expected_emoji_filename}'
            if not isfile(expected_emoji_path):
                print(f'Emoji "{emoji_name}" from file {filename} has no corresponding emoji file ' +\
                      f'(should be {expected_emoji_path})')
                is_error = True

# Check if there are orphaned emoji files
for file in listdir(EMOJI_FILES_PATH):
    if file not in emoji_filename_list:
        print(f'Emoji file {file} is not used in any tip markdown file')
        is_error = True

if is_error:
    sys.exit(1)
