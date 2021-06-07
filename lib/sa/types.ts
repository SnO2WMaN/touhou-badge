import {VercelRequestQuery} from '@vercel/node';
import {Format} from 'badge-maker';

export type BadgeProps = {
  style: 'plastic' | 'flat' | 'flat-square' | 'for-the-badge' | 'social';
};

export type LocaleProps = {
  name: 'ja' | 'ja-abbr' | 'en-abbr';
  difficulty: 'ja' | 'en';
  characters: 'ja-short' | 'en-short';
};

export type Difficulty = 'easy' | 'normal' | 'hard' | 'lunatic' | 'extra';

export type CharactersProps = CharacterReimuProps | CharacterMarisaProps;
type CharacterReimuProps = {
  player: 'reimu';
  support: 'yukari' | 'suika' | 'aya';
};
type CharacterMarisaProps = {
  player: 'marisa';
  support: 'alice' | 'patchouli' | 'nitori';
};

export type Option = {
  badge: BadgeProps;
  locale: LocaleProps;
  characters: CharactersProps;
  difficulty: Difficulty;
};

export type Parser = (
  query: VercelRequestQuery,
  defaultValues?: {
    [key in
      | 'style'
      | 'localeName'
      | 'localeCharacter'
      | 'localeDifficulty']: string;
  },
) => Option;

export type Generator = (payload: Option) => Format;

export type MapName = {[key in LocaleProps['name']]: string};
export type MapCharacters = {
  [key in LocaleProps['characters']]: {
    player: {[key in CharactersProps['player']]: string};
    support: {[key in CharactersProps['support']]: string};
  };
};
export type MapDifficulties = {
  [key in LocaleProps['difficulty']]: {[key in Difficulty]: string};
};
export type MapColors = {[key in Difficulty]: string};

export type TranslateName = <TMap extends {[key in string]: string}>(
  map: TMap,
  locales: {name: keyof TMap},
) => string;
export type TranslateDifficulty = <
  TMap extends {[key in string]: {[key in string]: string}}
>(
  map: TMap,
  locales: {difficulty: keyof TMap},
  difficulty: keyof TMap[keyof TMap],
) => string;
export type TranslateCharacters = <
  TMap extends {
    [key in string]: {
      player: {[key in string]: string};
      support: {[key in string]: string};
    };
  }
>(
  map: TMap,
  locales: {characters: keyof TMap},
  characters: {player: string; support: string},
) => string;

export type GetLabelText = (texts: {
  name: string;
  characters: string;
}) => string;
export type GetMessageText = (texts: {difficulty: string}) => string;
export type GetColor = <TMap extends {[key in string]: string}>(
  arg: {difficulty: keyof TMap},
  map: TMap,
) => string;
