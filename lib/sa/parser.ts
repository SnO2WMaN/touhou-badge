import {VercelRequestQuery} from '@vercel/node';
import {Option} from './types';
import {checkBadgeProps, checkCharacter, checkDifficulty} from './validators';

export const parser = (
  query: VercelRequestQuery,
  defaultValues = {
    style: 'flat-square',
    labelName: 'ja-abbr',
    labelDifficulty: 'en',
    labelCharacter: 'ja-short',
  },
): Option => {
  const badgeProps = {
    style: query.style || defaultValues.style,
    i18n: {
      name: query.labelName || defaultValues.labelName,
      difficulty: query.labelDifficulty || defaultValues.labelDifficulty,
      character: query.labelCharacter || defaultValues.labelCharacter,
    },
  };
  const character = {player: query.player, support: query.support};
  const {difficulty} = query;

  if (
    checkBadgeProps(badgeProps) &&
    checkDifficulty(difficulty) &&
    checkCharacter(character)
  )
    return {...badgeProps, ...character, difficulty};

  throw new Error('Invalid query');
};
