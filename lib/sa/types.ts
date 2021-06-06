export type BadgeProps = {
  style: 'plastic' | 'flat' | 'flat-square' | 'for-the-badge' | 'social';
  i18n: {
    name: 'ja' | 'ja-abbr' | 'en-abbr';
    difficulty: 'ja' | 'en';
    character: 'ja-short' | 'en-short';
  };
};
export type Difficulty = 'easy' | 'normal' | 'hard' | 'lunatic' | 'extra';

export type Character = CharacterReimu | CharacterMarisa;
type CharacterReimu = {
  player: 'reimu';
  support: 'yukari' | 'suika' | 'aya';
};
type CharacterMarisa = {
  player: 'marisa';
  support: 'alice' | 'patchouli' | 'nitori';
};

export type Option = BadgeProps & {difficulty: Difficulty} & Character;
