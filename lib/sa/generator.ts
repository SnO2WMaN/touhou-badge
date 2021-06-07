import {
  Generator,
  GetColor,
  GetLabelText,
  GetMessageText,
  MapCharacters,
  MapColors,
  MapDifficulties,
  MapName,
  TranslateCharacters,
  TranslateDifficulty,
  TranslateName,
} from './types';

const mapName: MapName = {
  ja: '東方地霊殿',
  'ja-abbr': '地霊殿',
  'en-abbr': 'SA',
};
const mapCharacters: MapCharacters = {
  'ja-short': {
    player: {reimu: '霊夢', marisa: '魔理沙'},
    support: {
      yukari: '紫',
      suika: '萃香',
      aya: '文',
      alice: 'アリス',
      patchouli: 'パチュリー',
      nitori: 'にとり',
    },
  },
  'en-short': {
    player: {reimu: 'Reimu', marisa: 'Marisa'},
    support: {
      yukari: 'Yukari',
      suika: 'Suika',
      aya: 'Aya',
      alice: 'Arice',
      patchouli: 'Patchouli',
      nitori: 'Nitori',
    },
  },
};
export const mapDifficulties: MapDifficulties = {
  ja: {
    easy: 'イージー',
    normal: 'ノーマル',
    hard: 'ハード',
    lunatic: 'ルナティック',
    extra: 'エクストラ',
  },
  en: {
    easy: 'EASY',
    normal: 'NORMAL',
    hard: 'HARD',
    lunatic: 'LUNATIC',
    extra: 'EXTRA',
  },
};

export const mapColor: MapColors = {
  easy: '#86d88a',
  normal: '#a3a9ff',
  hard: '#e5adad',
  lunatic: '#d988e3',
  extra: '#d2b872',
};

export const translateName: TranslateName = (map, locales) => map[locales.name];

export const translateDifficulty: TranslateDifficulty = (
  map,
  locales,
  difficulty,
) => map[locales.difficulty][difficulty];

export const translateCharacters: TranslateCharacters = (
  map,
  locales,
  character,
) =>
  [
    map[locales.characters].player[character.player],
    map[locales.characters].support[character.support],
  ].join('+');

export const getLabelText: GetLabelText = ({characters, name}) =>
  [name, characters].join(' ');

export const getMessageText: GetMessageText = ({difficulty}) => difficulty;

export const getColor: GetColor = ({difficulty}, map): string =>
  map[difficulty];

export const generator: Generator = (option) => {
  return {
    style: option.badge.style,
    label: getLabelText({
      name: translateName(mapName, option.locale),
      characters: translateCharacters(
        mapCharacters,
        option.locale,
        option.characters,
      ),
    }),
    message: getMessageText({
      difficulty: translateDifficulty(
        mapDifficulties,
        option.locale,
        option.difficulty,
      ),
    }),
    color: getColor(option, mapColor),
  };
};
