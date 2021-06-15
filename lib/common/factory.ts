import {CommonProps} from './props';

export type LabelGenerator<TOptions, TI18n> = (
  options: TOptions,
  common: CommonProps,
  i18n: TI18n,
) => string;

export type MessageGenerator<TOptions, TI18n> = (
  options: TOptions,
  common: CommonProps,
  i18n: TI18n,
) => string;

export type ColorSelector<TOptions, TColors> = (
  options: TOptions,
  colors: TColors,
) => string;

export type Factory = <
  TOptions,
  TI18nLabelGenerator,
  TI18nMessageGenerator,
  TColors
>(
  labelGenerator: LabelGenerator<TOptions, TI18nLabelGenerator>,
  messageGenerator: MessageGenerator<TOptions, TI18nMessageGenerator>,
  colorSelector: ColorSelector<TOptions, TColors>,
  i18n: TI18nLabelGenerator & TI18nMessageGenerator,
  colors: TColors,
) => (
  options: TOptions,
  common: CommonProps,
) => {
  style: 'plastic' | 'flat' | 'flat-square' | 'for-the-badge';
  label: string;
  message: string;
  color: string;
};

export const factoryGetBadgeProps: Factory = (
  label,
  message,
  color,
  i18n,
  colors,
) => (options, common) => ({
  style: common.style,
  label: label(options, common, i18n),
  message: message(options, common, i18n),
  color: color(options, colors),
});
