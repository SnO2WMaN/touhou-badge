import {VercelRequestQuery} from '@vercel/node';
import {ColorSelector} from './factory';

export type Difficulty = 'easy' | 'normal' | 'hard' | 'lunatic' | 'extra';

export const isDifficulty = (
  value: VercelRequestQuery[string],
): value is Difficulty =>
  typeof value === 'string' &&
  (value === 'easy' ||
    value === 'normal' ||
    value === 'hard' ||
    value === 'lunatic' ||
    value === 'extra');

export const selectColor: ColorSelector<
  {difficulty: Difficulty},
  Record<Difficulty, string>
> = ({difficulty}, colors): string => colors[difficulty];

export const colors: Record<Difficulty, string> = {
  easy: '#86d88a',
  normal: '#a3a9ff',
  hard: '#e5adad',
  lunatic: '#d988e3',
  extra: '#d2b872',
};
