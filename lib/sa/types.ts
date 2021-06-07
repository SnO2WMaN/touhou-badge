import {VercelRequestQuery} from '@vercel/node';
import {Format} from 'badge-maker';

export type BadgeProps = {
  style: 'plastic' | 'flat' | 'flat-square' | 'for-the-badge' | 'social';
};

export type I18nProps = {
  name: 'ja' | 'ja-abbr' | 'en-abbr';
  difficulty: 'ja' | 'en';
  character: 'ja-short' | 'en-short';
};

export type Difficulty = 'easy' | 'normal' | 'hard' | 'lunatic' | 'extra';

export type CharacterProps = CharacterReimu | CharacterMarisa;
type CharacterReimu = {
  player: 'reimu';
  support: 'yukari' | 'suika' | 'aya';
};
type CharacterMarisa = {
  player: 'marisa';
  support: 'alice' | 'patchouli' | 'nitori';
};

export type Option = {
  badge: BadgeProps;
  i18n: I18nProps;
  character: CharacterProps;
  difficulty: Difficulty;
};

export type Parser = (
  query: VercelRequestQuery,
  defaultValues: {[key in string]: string},
) => Option;

export type Generator = (payload: Option) => Format;

export type MapName = {[key in I18nProps['name']]: string};
export type MapCharacters = {
  [key in I18nProps['character']]: {
    player: {[key in CharacterProps['player']]: string};
    support: {[key in CharacterProps['support']]: string};
  };
};
export type MapDifficulties = {
  [key in I18nProps['difficulty']]: {[key in Difficulty]: string};
};
export type MapColors = {[key in Difficulty]: string};

export type TranslateName = <TMap extends {[key in string]: string}>(
  map: TMap,
  i18n: {name: keyof TMap},
) => string;
export type TranslateDifficulty = <
  TMap extends {[key in string]: {[key in string]: string}}
>(
  map: TMap,
  i18n: {difficulty: keyof TMap},
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
  i18n: {character: keyof TMap},
  character: {player: string; support: string},
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
