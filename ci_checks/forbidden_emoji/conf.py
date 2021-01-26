from models import *

MD_FILES_PATH = 'src/assets/tips'

FORBIDDEN_EMOJI = [
    PoliticallyForbiddenEmoji('biedux', emoji_instead='linux'),
    PoliticallyForbiddenEmoji('krakow', emoji_instead='machete'),
    PoliticallyForbiddenEmoji('fashtag'),
    LogoForbiddenEmoji('apple-logo', emoji_instead='apple'),
    LogoForbiddenEmoji('microsoft', emoji_instead='windows'),
    LogoForbiddenEmoji('ups', emoji_instead='this_is_fine'),
]
