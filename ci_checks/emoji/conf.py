from models import *

MD_FILES_PATH = 'src/assets/tips'
EMOJI_FILES_PATH = 'src/assets/emoji'
FORBIDDEN_EMOJI = [
  BarelyReadableEmoji('dramat', emoji_instead='this_is_fine'),
  BarelyReadableEmoji('pacman', emoji_instead='pacman-dark'),
  ControversialEmoji('fuggg', emoji_instead='no_good'),
  ForbiddenEmoji('ogarne', reason="it's very similar to an Orange logo"),
  LogoForbiddenEmoji('apple-logo', emoji_instead='apple'),
  LogoForbiddenEmoji('azure-on-fire', emoji_instead='fire'),
  LogoForbiddenEmoji('circle-k'),
  LogoForbiddenEmoji('microsoft', emoji_instead='windows'),
  LogoForbiddenEmoji('ups', emoji_instead='this_is_fine'),
  PoliticallyForbiddenEmoji('general-spurdo', emoji_instead='male-police-officer'),
  PoliticallyForbiddenEmoji('grammar-nazi', emoji_instead='abc'),
  PoliticallyForbiddenEmoji('fashtag'),
  PoliticallyForbiddenEmoji('nie', emoji_instead='stop-sign'),
  PoliticallyForbiddenEmoji('pepepanic', emoji_instead='scream'),
  PoliticallyForbiddenEmoji('sad_pepe', emoji_instead='sad'),
  RenamedEmoji('biedora', emoji_instead='fedora'),
  RenamedEmoji('biedux', emoji_instead='linux'),
  RenamedEmoji('krakow', emoji_instead='machete'),
]
