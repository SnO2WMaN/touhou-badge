import {
  BadgeProps,
  CharactersProps,
  Difficulty,
  LocaleProps,
  Parser,
} from './types';

export const parser: Parser = (
  query,
  defaultValues = {
    style: 'flat-square',
    localeName: 'ja-abbr',
    localeCharacter: 'ja-short',
    localeDifficulty: 'en',
  },
) => {
  const badgeProps = {
    style: query.style || defaultValues.style,
  };
  const localeProps = {
    name: query.localeName || defaultValues.localeName,
    characters: query.localeCharacter || defaultValues.localeCharacter,
    difficulty: query.localeDifficulty || defaultValues.localeDifficulty,
  };
  const characterProps = {
    player: query.player,
    support: query.support,
  };
  const {difficulty} = query;

  if (
    checkBadgeProps(badgeProps) &&
    checkLocaleProps(localeProps) &&
    checkCharacterProps(characterProps) &&
    checkDifficulty(difficulty)
  )
    return {
      badge: badgeProps,
      locale: localeProps,
      difficulty,
      characters: characterProps,
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

export const checkLocaleProps = (value: {
  name: string | string[];
  characters: string | string[];
  difficulty: string | string[];
}): value is LocaleProps => {
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
      typeof value.characters === 'string' &&
      (value.characters === 'ja-short' || value.characters === 'en-short')
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
}): value is CharactersProps => {
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
