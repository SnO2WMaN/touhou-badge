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

export const translateName: TranslateName = (map, i18n) => map[i18n.name];

export const translateDifficulty: TranslateDifficulty = (
  map,
  i18n,
  difficulty,
) => map[i18n.difficulty][difficulty];

export const translateCharacters: TranslateCharacters = (
  map,
  i18n,
  character,
) =>
  [
    map[i18n.character].player[character.player],
    map[i18n.character].support[character.support],
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
      name: translateName(mapName, option.i18n),
      characters: translateCharacters(
        mapCharacters,
        option.i18n,
        option.character,
      ),
    }),
    message: getMessageText({
      difficulty: translateDifficulty(
        mapDifficulties,
        option.i18n,
        option.difficulty,
      ),
    }),
    color: getColor(option, mapColor),
  };
};
