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

export type CharacterReimu = {
  player: 'reimu';
  support: 'yukari' | 'suika' | 'aya';
};
export type CharacterMarisa = {
  player: 'marisa';
  support: 'alice' | 'patchouli' | 'nitori';
};

export type Options = {
  difficulty: Difficulty;
} & (CharacterReimu | CharacterMarisa);

export const isValidCharacter = (value: {
  player: VercelRequestQuery[string];
  support: VercelRequestQuery[string];
}): value is CharacterReimu | CharacterMarisa =>
  (typeof value.player === 'string' &&
    typeof value.support === 'string' &&
    value.player === 'reimu' &&
    (value.support === 'yukari' ||
      value.support === 'suika' ||
      value.support === 'aya')) ||
  (value.player === 'marisa' &&
    (value.support === 'alice' ||
      value.support === 'patchouli' ||
      value.support === 'nitori'));

export const extractOptions = (query: VercelRequestQuery): Options => {
  const {difficulty, player, support} = query;
  const character = {player, support};
  if (!isDifficulty(difficulty) || !isValidCharacter(character))
    throw new Error('Invalid query');
  return {difficulty, ...character};
};

const generateLabel: LabelGenerator<
  Options,
  {
    game: Record<CommonProps['label'], string>;
    character: Record<
      CommonProps['label'],
      {
        player: Record<Options['player'], string>;
        support: Record<Options['support'], string>;
      }
    >;
  }
> = ({player, support}, {label}, i18n) => {
  switch (label) {
    case 'ja-abbr':
      return `${i18n.game[label]} ${i18n.character[label].player[player]}+${i18n.character[label].support[support]}`;
    default:
      return `${i18n.game[label]} ${i18n.character[label].player[player]} & ${i18n.character[label].support[support]}`;
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
      'ja-abbr': '地霊殿',
      'en-abbr': 'SA',
    },
    character: {
      'ja-abbr': {
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
      'en-abbr': {
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
    },
    difficulty: i18nDifficulty,
  },
  colorsDifficulty,
);
