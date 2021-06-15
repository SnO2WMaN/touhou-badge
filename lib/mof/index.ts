import {VercelRequestQuery} from '@vercel/node';
import {
  colorsDifficulty,
  CommonProps,
  Difficulty,
  factoryGetBadgeProps,
  i18nDifficulty,
  isDifficulty,
  LabelGenerator,
  MessageGenerator,
  selectColor,
} from '../common';

export {extractCommonProps} from '../common';

export type Options = {
  difficulty: Difficulty;
  player: 'reimu' | 'marisa';
  type: 'a' | 'b' | 'c';
};

export const isPlayer = (
  value: VercelRequestQuery[string],
): value is Options['player'] =>
  typeof value === 'string' && (value === 'reimu' || value === 'marisa');

export const isType = (
  value: VercelRequestQuery[string],
): value is Options['type'] =>
  typeof value === 'string' &&
  (value === 'a' || value === 'b' || value === 'c');

export const extractOptions = (query: VercelRequestQuery): Options => {
  const {difficulty, player, type} = query;
  if (!isDifficulty(difficulty) || !isPlayer(player) || !isType(type))
    throw new Error('Invalid query');
  return {difficulty, player, type};
};

const generateLabel: LabelGenerator<
  Options,
  {
    game: Record<CommonProps['label'], string>;
    player: Record<CommonProps['label'], Record<Options['player'], string>>;
    type: Record<CommonProps['label'], Record<Options['type'], string>>;
  }
> = ({player, type}, {label}, i18n) => {
  switch (label) {
    case 'ja-abbr':
      return `${i18n.game[label]} ${i18n.player[label][player]}${i18n.type[label][type]}`;
    default:
      return `${i18n.game[label]} ${i18n.player[label][player]} ${i18n.type[label][type]}`;
  }
};

const generateMessage: MessageGenerator<
  Options,
  {difficulty: typeof i18nDifficulty}
> = ({difficulty}, {message}, i18n): string =>
  i18n.difficulty[message][difficulty];

export const getBadgeProps = factoryGetBadgeProps(
  generateLabel,
  generateMessage,
  selectColor,
  {
    game: {
      'ja-abbr': '風神録',
      'en-abbr': 'MoF',
    },
    player: {
      'ja-abbr': {reimu: '霊夢', marisa: '魔理沙'},
      'en-abbr': {reimu: 'Reimu', marisa: 'Marisa'},
    },
    type: {
      // eslint-disable-next-line id-length
      'ja-abbr': {a: 'A', b: 'B', c: 'C'},
      // eslint-disable-next-line id-length
      'en-abbr': {a: 'A', b: 'B', c: 'C'},
    },
    difficulty: i18nDifficulty,
  },
  colorsDifficulty,
);
