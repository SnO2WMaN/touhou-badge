import {
  checkBadgeProps,
  checkCharacterProps,
  checkDifficulty,
  checkI18nProps,
} from './parser';

describe('checkBadgeProps()', () => {
  it('value.style must not be an array', () => {
    expect(checkBadgeProps({style: []})).toBe(false);
  });

  it.each(['plastic', 'flat', 'flat-square', 'for-the-badge', 'social'])(
    'value.style "%s" must be true',
    (valueStyle) => {
      expect(checkBadgeProps({style: valueStyle})).toBe(true);
    },
  );

  it('other value.style must be false', () => {
    expect(checkBadgeProps({style: 'something'})).toBe(false);
  });
});

describe('checkI18nProps()', () => {
  it('value.name must not be an array', () => {
    expect(
      checkI18nProps({name: [], character: 'ja-short', difficulty: 'en'}),
    ).toBe(false);
  });

  it.each(['ja', 'ja-abbr', 'en-abbr'])(
    'value.name "%s" must be true',
    (valueName) => {
      expect(
        checkI18nProps({
          name: valueName,
          character: 'ja-short',
          difficulty: 'en',
        }),
      ).toBe(true);
    },
  );

  it('other value.name must be false', () => {
    expect(
      checkI18nProps({
        name: 'something',
        character: 'ja-short',
        difficulty: 'en',
      }),
    ).toBe(false);
  });

  it('value.character must not be an array', () => {
    expect(
      checkI18nProps({
        name: 'ja-abbr',
        character: [],
        difficulty: 'en',
      }),
    ).toBe(false);
  });

  it.each(['ja-short', 'en-short'])(
    'value.character "%s" must be true',
    (valueCharacter) => {
      expect(
        checkI18nProps({
          name: 'ja-abbr',
          character: valueCharacter,
          difficulty: 'en',
        }),
      ).toBe(true);
    },
  );

  it('other value.character must be false', () => {
    expect(
      checkI18nProps({
        name: 'ja-abbr',
        character: 'something',
        difficulty: 'en',
      }),
    ).toBe(false);
  });

  it('value.difficulty must not be an array', () => {
    expect(
      checkI18nProps({
        name: 'ja-abbr',
        character: 'ja-short',
        difficulty: [],
      }),
    ).toBe(false);
  });

  it.each(['ja', 'en'])(
    'value.difficulty "%s" must be true',
    (valueDifficulty) => {
      expect(
        checkI18nProps({
          name: 'ja-abbr',
          character: 'ja-short',
          difficulty: valueDifficulty,
        }),
      ).toBe(true);
    },
  );

  it('other value.difficulty must be false', () => {
    expect(
      checkI18nProps({
        name: 'ja-abbr',
        character: 'ja-short',
        difficulty: 'something',
      }),
    ).toBe(false);
  });
});

describe('checkDifficulty()', () => {
  it('value must not be an array', () => {
    expect(checkDifficulty([])).toBe(false);
  });

  it.each(['easy', 'normal', 'hard', 'lunatic', 'extra'])(
    'value "%s" must be true',
    (value) => {
      expect(checkDifficulty(value)).toBe(true);
    },
  );

  it('other value must be false', () => {
    expect(checkDifficulty('something')).toBe(false);
  });
});

describe('checkCharacterProps()', () => {
  it('value.player must not be array', () => {
    expect(checkCharacterProps({player: [], support: ''})).toBe(false);
  });

  it('value.support must not be array', () => {
    expect(checkCharacterProps({player: '', support: []})).toBe(false);
  });

  it.each(['yukari', 'suika', 'aya'])(
    'value.support "%s" must be true if value.player is "reimu"',
    (valueSupport) => {
      expect(
        checkCharacterProps({player: 'reimu', support: valueSupport}),
      ).toBe(true);
    },
  );

  it('value.support "alice" must be false if value.player is "reimu"', () => {
    expect(checkCharacterProps({player: 'reimu', support: 'alice'})).toBe(
      false,
    );
  });

  it.each(['alice', 'patchouli', 'nitori'])(
    'value.support "%s" must be true if value.player is "marisa"',
    (valueSupport) => {
      expect(
        checkCharacterProps({player: 'marisa', support: valueSupport}),
      ).toBe(true);
    },
  );

  it('value.support "yukari" must be false if value.player is "marisa"', () => {
    expect(checkCharacterProps({player: 'marisa', support: 'yukari'})).toBe(
      false,
    );
  });
});
