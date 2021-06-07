import {
  getColor,
  translateCharacters,
  translateDifficulty,
  translateName,
} from './generator';

describe('translateName()', () => {
  const mapMocked = {
    ja: '東方地霊殿',
    'en-abbr': 'SA',
  };

  it.each([
    [mapMocked.ja, {name: 'ja'} as const],
    [mapMocked['en-abbr'], {name: 'en-abbr'} as const],
  ])('Mocked map test %i', (expected, i18n) => {
    expect(translateName(mapMocked, i18n)).toBe(expected);
  });
});

describe('translateDifficulty()', () => {
  const mapMocked = {
    en: {easy: 'EASY', normal: 'NORMAL'},
    jp: {easy: 'イージー', normal: 'ノーマル'},
  };

  it.each([
    [mapMocked.en.easy, {difficulty: 'en'} as const, 'easy' as const],
    [mapMocked.en.normal, {difficulty: 'en'} as const, 'normal' as const],
    [mapMocked.jp.easy, {difficulty: 'jp'} as const, 'easy' as const],
    [mapMocked.jp.normal, {difficulty: 'jp'} as const, 'normal' as const],
  ])('Mocked map test %i', (expected, i18n, difficulty) => {
    expect(translateDifficulty(mapMocked, i18n, difficulty)).toBe(expected);
  });
});

describe('translateCharacters()', () => {
  const mapMocked = {
    'ja-short': {player: {reimu: '霊夢'}, support: {yukari: '紫'}},
    'en-short': {player: {reimu: 'Reimu'}, support: {yukari: 'Yukari'}},
  };

  it.each([
    [
      `${mapMocked['ja-short'].player.reimu}+${mapMocked['ja-short'].support.yukari}`,
      {character: 'ja-short'} as const,
      {player: 'reimu', support: 'yukari'} as const,
    ],
  ])('Mocked map test %i', (expected, i18n, characters) => {
    expect(translateCharacters(mapMocked, i18n, characters)).toBe(expected);
  });
});

describe('getColor()', () => {
  const mapMocked = {easy: '#00FF00', normal: '#0000FF'};

  it.each([
    [mapMocked.easy, {difficulty: 'easy'} as const],
    [mapMocked.normal, {difficulty: 'normal'} as const],
  ])('Mocked map test %i', (expected, key) => {
    expect(getColor(key, mapMocked)).toBe(expected);
  });
});
