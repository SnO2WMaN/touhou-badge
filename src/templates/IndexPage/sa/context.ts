import React from 'react';
import {CommonProps} from '~/badges/common';
import {CharacterMarisa, CharacterReimu, Options} from '~/badges/sa';

export const difficulties: Record<Options['difficulty'], string> = {
  easy: 'mof:difficulty.easy',
  normal: 'mof:difficulty.normal',
  hard: 'mof:difficulty.hard',
  lunatic: 'mof:difficulty.lunatic',
  extra: 'mof:difficulty.extra',
};
export const players: Record<Options['player'], string> = {
  reimu: 'mof:player.reimu',
  marisa: 'mof:player.marisa',
};
export const supportsReimu: Record<CharacterReimu['support'], string> = {
  yukari: 'sa:support.yukari',
  suika: 'sa:support.suika',
  aya: 'sa:support.aya',
};
export const supportsMarisa: Record<CharacterMarisa['support'], string> = {
  alice: 'sa:support.alice',
  patchouli: 'sa:support.patchouli',
  nitori: 'sa:support.nitori',
};
export const styles: Record<CommonProps['style'], string> = {
  plastic: 'common:badge.style.plastic',
  flat: 'common:badge.style.flat',
  'flat-square': 'common:badge.style.flat-square',
  'for-the-badge': 'common:badge.style.for-the-badge',
};
export const labels: Record<CommonProps['label'], string> = {
  'ja-abbr': 'common:badge.label.ja',
  'en-abbr': 'common:badge.label.en',
};
export const messages: Record<CommonProps['message'], string> = {
  ja: 'common:badge.message.ja',
  en: 'common:badge.message.en',
};

export type SABadgeContext = {
  difficulty: {
    value: keyof typeof difficulties;
    change(value: SABadgeContext['difficulty']['value']): void;
  };
  player: {
    value: keyof typeof players;
    change(value: SABadgeContext['player']['value']): void;
  };
  support: {
    value: keyof typeof supportsReimu | keyof typeof supportsMarisa;
    change(
      value: keyof typeof supportsReimu | keyof typeof supportsMarisa,
    ): void;
  };
  style: {
    value: keyof typeof styles;
    change(value: SABadgeContext['style']['value']): void;
  };
  label: {
    value: keyof typeof labels;
    change(value: SABadgeContext['label']['value']): void;
  };
  message: {
    value: keyof typeof messages;
    change(value: SABadgeContext['message']['value']): void;
  };
};

export const SABadgeContext = React.createContext<SABadgeContext>({
  difficulty: {value: 'normal', change() {}},
  player: {value: 'reimu', change() {}},
  support: {value: 'yukari', change() {}},
  style: {value: 'flat-square', change() {}},
  label: {value: 'ja-abbr', change() {}},
  message: {value: 'en', change() {}},
});
