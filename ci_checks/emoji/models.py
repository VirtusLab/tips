from dataclasses import dataclass
from typing import Optional


@dataclass
class ForbiddenEmoji:
    emoji_name: str
    reason: str
    emoji_instead: Optional[str] = None

    def forbidden_message(self, filename):
        return f'''Forbidden emoji detected in a {filename} file:
    The "{self.emoji_name}" emoji is forbidden because {self.reason}.''' +\
               (f' Use "{self.emoji_instead}" instead.' if self.emoji_instead is not None else '')


@dataclass(init=False)
class PoliticallyForbiddenEmoji(ForbiddenEmoji):
    def __init__(self, emoji_name: str, emoji_instead: Optional[str] = None):
        super(PoliticallyForbiddenEmoji, self).__init__(emoji_name=emoji_name, reason="it's politically incorrect",
                                                        emoji_instead=emoji_instead)


@dataclass(init=False)
class LogoForbiddenEmoji(ForbiddenEmoji):
    def __init__(self, emoji_name: str, emoji_instead: Optional[str] = None):
        super(LogoForbiddenEmoji, self).__init__(emoji_name=emoji_name, reason="it's a commercial logo",
                                                 emoji_instead=emoji_instead)


@dataclass(init=False)
class RenamedEmoji(ForbiddenEmoji):
    def __init__(self, emoji_name: str, emoji_instead: Optional[str] = None):
        super(RenamedEmoji, self).__init__(emoji_name=emoji_name, reason="for this site purpose has been renamed (and "
                                                                         "not allowed to be used with original name)",
                                           emoji_instead=emoji_instead)


@dataclass(init=False)
class BarelyReadableEmoji(ForbiddenEmoji):
    def __init__(self, emoji_name: str, emoji_instead: Optional[str] = None):
        super(BarelyReadableEmoji, self).__init__(emoji_name=emoji_name, reason="it's barely readable",
                                                  emoji_instead=emoji_instead)
