from models import *

MD_FILES_PATH = 'src/assets/tips'
EMOJI_FILES_PATH = 'src/assets/emoji'

FORBIDDEN_EMOJI = [
    PoliticallyForbiddenEmoji('biedux', emoji_instead='linux'),
    PoliticallyForbiddenEmoji('fashtag'),
    PoliticallyForbiddenEmoji('krakow', emoji_instead='machete'),
    PoliticallyForbiddenEmoji('nie', emoji_instead='stop-sign'),
    LogoForbiddenEmoji('apple-logo', emoji_instead='apple'),
    LogoForbiddenEmoji('microsoft', emoji_instead='windows'),
    LogoForbiddenEmoji('ups', emoji_instead='this_is_fine'),
]
