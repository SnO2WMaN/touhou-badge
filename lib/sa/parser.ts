import {
  BadgeProps,
  CharacterProps,
  Difficulty,
  I18nProps,
  Parser,
} from './types';

export const parser: Parser = (
  query,
  defaultValues = {
    style: 'flat-square',
    labelName: 'ja-abbr',
    labelCharacter: 'ja-short',
    labelDifficulty: 'en',
  },
) => {
  const badgeProps = {
    style: query.style || defaultValues.style,
  };
  const i18nProps = {
    name: query.labelName || defaultValues.labelName,
    character: query.labelCharacter || defaultValues.labelCharacter,
    difficulty: query.labelDifficulty || defaultValues.labelDifficulty,
  };
  const characterProps = {
    player: query.player,
    support: query.support,
  };
  const {difficulty} = query;

  if (
    checkBadgeProps(badgeProps) &&
    checkI18nProps(i18nProps) &&
    checkCharacterProps(characterProps) &&
    checkDifficulty(difficulty)
  )
    return {
      badge: badgeProps,
      i18n: i18nProps,
      difficulty,
      character: characterProps,
    };

  throw new Error('Invalid query');
};

export const checkBadgeProps = (value: {
  style: string | string[];
}): value is BadgeProps => {
  return (
    typeof value.style === 'string' &&
    (value.style === 'plastic' ||
      value.style === 'flat' ||
      value.style === 'flat-square' ||
      value.style === 'for-the-badge' ||
      value.style === 'social')
  );
};

export const checkI18nProps = (value: {
  name: string | string[];
  character: string | string[];
  difficulty: string | string[];
}): value is I18nProps => {
  if (
    !(
      typeof value.name === 'string' &&
      (value.name === 'ja' ||
        value.name === 'ja-abbr' ||
        value.name === 'en-abbr')
    )
  )
    return false;
  else if (
    !(
      typeof value.character === 'string' &&
      (value.character === 'ja-short' || value.character === 'en-short')
    )
  )
    return false;
  else if (
    !(
      typeof value.difficulty === 'string' &&
      (value.difficulty === 'ja' || value.difficulty === 'en')
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

export const checkCharacterProps = (value: {
  player: string | string[];
  support: string | string[];
}): value is CharacterProps => {
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
