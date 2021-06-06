import {Format} from 'badge-maker';
import {mapColor, mapLabelText, mapMessageText} from './maps';
import {Option} from './types';

export const getLabelText = <
  TI18nName extends string,
  TI18nCharacter extends string,
  TPlayer extends string,
  TSupport extends string
>(
  {
    i18n,
    player,
    support,
  }: {
    i18n: {name: TI18nName; character: TI18nCharacter};
    player: TPlayer;
    support: TSupport;
  },
  map: {
    name: {[key in TI18nName]: string};
    character: {
      [key in TI18nCharacter]: {
        [key in TPlayer | TSupport]: string;
      };
    };
  },
): string => {
  return [
    map.name[i18n.name],
    [
      map.character[i18n.character][player],
      map.character[i18n.character][support],
    ].join('+'),
  ].join(' ');
};

export const getMessageText = <
  TI18nDifficulty extends string,
  TDifficulty extends string
>(
  {
    i18n,
    difficulty,
  }: {
    i18n: {difficulty: TI18nDifficulty};
    difficulty: TDifficulty;
  },
  map: {[key in TI18nDifficulty]: {[key in TDifficulty]: string}},
): string => {
  return map[i18n.difficulty][difficulty];
};

export const getColor = <TDifficulty extends string>(
  {difficulty}: {difficulty: TDifficulty},
  map: {[key in TDifficulty]: string},
): string => {
  return map[difficulty];
};

export const generator = (option: Option): Format => {
  return {
    style: option.style,
    label: getLabelText(option, mapLabelText),
    message: getMessageText(option, mapMessageText),
    color: getColor(option, mapColor),
  };
};
