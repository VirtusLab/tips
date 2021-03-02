from models import *

MD_FILES_PATH = 'src/assets/tips'
EMOJI_FILES_PATH = 'src/assets/emoji'

FORBIDDEN_EMOJI = [
    BarelyReadableEmoji('dramat', emoji_instead='this_is_fine'),
    ForbiddenEmoji('ogarne', reason="it's very similar to an Orange logo"),
    LogoForbiddenEmoji('apple-logo', emoji_instead='apple'),
    LogoForbiddenEmoji('circle-k'),
    LogoForbiddenEmoji('microsoft', emoji_instead='windows'),
    LogoForbiddenEmoji('ups', emoji_instead='this_is_fine'),
    PoliticallyForbiddenEmoji('fashtag'),
    PoliticallyForbiddenEmoji('nie', emoji_instead='stop-sign'),
    RenamedEmoji('biedora', emoji_instead='fedora'),
    RenamedEmoji('biedux', emoji_instead='linux'),
    RenamedEmoji('krakow', emoji_instead='machete'),
]
