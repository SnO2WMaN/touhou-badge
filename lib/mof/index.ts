import {VercelRequestQuery} from '@vercel/node';
import {
  colors,
  CommonProps,
  Difficulty,
  factoryGetBadgeProps,
  isDifficulty,
  LabelGenerator,
  MessageGenerator,
  selectColor,
} from '../common';

export {extractCommonProps} from '../common';

export type Options = {
  difficulty: Difficulty;
  character: 'reimu' | 'marisa';
  type: 'a' | 'b' | 'c';
};

export const isCharacter = (
  value: VercelRequestQuery[string],
): value is Options['character'] =>
  typeof value === 'string' && (value === 'reimu' || value === 'marisa');

export const isType = (
  value: VercelRequestQuery[string],
): value is Options['type'] =>
  typeof value === 'string' &&
  (value === 'a' || value === 'b' || value === 'c');

export const extractOptions = (query: VercelRequestQuery): Options => {
  const {difficulty, character, type} = query;
  if (!isDifficulty(difficulty) || !isCharacter(character) || !isType(type))
    throw new Error('Invalid query');
  return {difficulty, character, type};
};

const generateLabel: LabelGenerator<
  Options,
  {
    game: Record<CommonProps['label'], string>;
    character: Record<
      CommonProps['label'],
      Record<Options['character'], string>
    >;
    type: Record<CommonProps['label'], Record<Options['type'], string>>;
  }
> = ({character, type}, {label}, i18n) => {
  switch (label) {
    case 'ja-abbr':
      return `${i18n.game[label]} ${i18n.character[label][character]}${i18n.type[label][type]}`;
    default:
      return `${i18n.game[label]} ${i18n.character[label][character]} ${i18n.type[label][type]}`;
  }
};

const generateMessage: MessageGenerator<
  Options,
  {
    difficulty: Record<
      CommonProps['message'],
      Record<Options['difficulty'], string>
    >;
  }
> = ({difficulty}, {message}, i18n): string =>
  i18n.difficulty[message][difficulty];

export const getBadgeProps = factoryGetBadgeProps(
  generateLabel,
  generateMessage,
  selectColor,
  {
    game: {'ja-abbr': '風神録', 'en-abbr': 'MoF'},
    character: {
      'ja-abbr': {reimu: '霊夢', marisa: '魔理沙'},
      'en-abbr': {reimu: 'Reimu', marisa: 'Marisa'},
    },
    type: {
      // eslint-disable-next-line id-length
      'ja-abbr': {a: 'A', b: 'B', c: 'C'},
      // eslint-disable-next-line id-length
      'en-abbr': {a: 'A', b: 'B', c: 'C'},
    },
    difficulty: {
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
    },
  },
  colors,
);
