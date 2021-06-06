import {BadgeProps, Character, Difficulty} from './types';

export const checkBadgeProps = (value: {
  style: string | string[];
  i18n: {
    name: string | string[];
    difficulty: string | string[];
    character: string | string[];
  };
}): value is BadgeProps => {
  if (
    !(
      typeof value.style === 'string' &&
      typeof value.i18n.name === 'string' &&
      typeof value.i18n.difficulty === 'string' &&
      typeof value.i18n.character === 'string'
    )
  )
    return false;
  if (
    !(
      value.style === 'plastic' ||
      value.style === 'flat' ||
      value.style === 'flat-square' ||
      value.style === 'for-the-badge' ||
      value.style === 'social'
    )
  )
    return false;
  if (
    !(
      value.i18n.name === 'ja' ||
      value.i18n.name === 'ja-abbr' ||
      value.i18n.name === 'en-abbr'
    )
  )
    return false;
  if (!(value.i18n.difficulty === 'ja' || value.i18n.difficulty === 'en'))
    return false;
  if (
    !(
      value.i18n.character === 'ja-short' || value.i18n.character === 'en-short'
    )
  )
    return false;
  return true;
};

export const checkDifficulty = (
  value: string | string[],
): value is Difficulty => {
  return (
    typeof value === 'string' &&
    (value === 'easy' ||
      value === 'normal' ||
      value === 'hard' ||
      value === 'lunatic' ||
      value === 'extra')
  );
};

export const checkCharacter = (value: {
  player: string | string[];
  support: string | string[];
}): value is Character => {
  if (!(typeof value.player === 'string' && typeof value.support === 'string'))
    return false;
  if (!(value.player === 'reimu' || value.player === 'marisa')) return false;
  if (value.player === 'reimu')
    return (
      value.support === 'yukari' ||
      value.support === 'suika' ||
      value.support === 'aya'
    );
  else
    return (
      value.support === 'alice' ||
      value.support === 'patchouli' ||
      value.support === 'nitori'
    );
};
