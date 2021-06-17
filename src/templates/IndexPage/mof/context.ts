import React from 'react';
import {CommonProps} from '~/badges/common';
import {Options} from '~/badges/mof';

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
export const types: Record<Options['type'], string> = {
  // eslint-disable-next-line id-length
  a: 'mof:type.a',
  // eslint-disable-next-line id-length
  b: 'mof:type.b',
  // eslint-disable-next-line id-length
  c: 'mof:type.c',
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

export type MoFBadgeContext = {
  difficulty: {
    value: keyof typeof difficulties;
    change(value: MoFBadgeContext['difficulty']['value']): void;
  };
  player: {
    value: keyof typeof players;
    change(value: MoFBadgeContext['player']['value']): void;
  };
  type: {
    value: keyof typeof types;
    change(value: MoFBadgeContext['type']['value']): void;
  };
  style: {
    value: keyof typeof styles;
    change(value: MoFBadgeContext['style']['value']): void;
  };
  label: {
    value: keyof typeof labels;
    change(value: MoFBadgeContext['label']['value']): void;
  };
  message: {
    value: keyof typeof messages;
    change(value: MoFBadgeContext['message']['value']): void;
  };
};

export const MoFBadgeContext = React.createContext<MoFBadgeContext>({
  difficulty: {value: 'normal', change() {}},
  player: {value: 'reimu', change() {}},
  type: {value: 'a', change() {}},
  style: {value: 'flat-square', change() {}},
  label: {value: 'ja-abbr', change() {}},
  message: {value: 'en', change() {}},
});
