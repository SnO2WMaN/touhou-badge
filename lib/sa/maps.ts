import {Option} from './types';

export const mapLabelText: {
  name: {
    [key in Option['i18n']['name']]: string;
  };
  character: {
    [key in Option['i18n']['character']]: {
      [key in Option['player'] | Option['support']]: string;
    };
  };
} = {
  name: {
    ja: '東方地霊殿',
    'ja-abbr': '地霊殿',
    'en-abbr': 'SA',
  },
  character: {
    'ja-short': {
      reimu: '霊夢',
      yukari: '紫',
      suika: '萃香',
      aya: '文',
      marisa: '魔理沙',
      alice: 'アリス',
      patchouli: 'パチュリー',
      nitori: 'にとり',
    },
    'en-short': {
      reimu: 'Reimu',
      yukari: 'Yukari',
      suika: 'Suika',
      aya: 'Aya',
      marisa: 'Marisa',
      alice: 'Arice',
      patchouli: 'Patchouli',
      nitori: 'Nitori',
    },
  },
};

export const mapMessageText: {
  [key in Option['i18n']['difficulty']]: {
    [key in Option['difficulty']]: string;
  };
} = {
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

export const mapColor: {
  [key in Option['difficulty']]: string;
} = {
  easy: '#86d88a',
  normal: '#a3a9ff',
  hard: '#e5adad',
  lunatic: '#d988e3',
  extra: '#d2b872',
};
