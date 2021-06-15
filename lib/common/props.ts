import {VercelRequestQuery} from '@vercel/node';

export type CommonProps = {
  style: 'plastic' | 'flat' | 'flat-square' | 'for-the-badge';
  label: 'ja-abbr' | 'en-abbr';
  message: 'ja' | 'en';
};

export const isStyle = (
  value: VercelRequestQuery[string],
): value is CommonProps['style'] =>
  typeof value === 'string' &&
  (value === 'plastic' ||
    value === 'flat' ||
    value === 'flat-square' ||
    value === 'for-the-badge');

export const isLabel = (
  value: VercelRequestQuery[string],
): value is CommonProps['label'] =>
  typeof value === 'string' && (value === 'ja-abbr' || value === 'en-abbr');

export const isMessage = (
  value: VercelRequestQuery[string],
): value is CommonProps['message'] =>
  typeof value === 'string' && (value === 'ja' || value === 'en');

export const extractCommonProps = (
  query: VercelRequestQuery,
  defaultValue: CommonProps = {
    style: 'flat-square',
    label: 'ja-abbr',
    message: 'en',
  },
): CommonProps => ({
  style: isStyle(query.style) ? query.style : defaultValue.style,
  label: isLabel(query.label) ? query.label : defaultValue.label,
  message: isMessage(query.message) ? query.message : defaultValue.message,
});
