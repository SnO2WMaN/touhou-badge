import clsx from 'clsx';
import {useTranslation} from 'next-i18next';
import React from 'react';

export const Selection: React.VFC<{
  className?: string;
  i18n: {label: string};
  id: string;
  value: string;
  choices: Record<string, string>;
  handleChange: React.ChangeEventHandler<HTMLSelectElement>;
}> = ({className, id, value, i18n, choices, handleChange}) => {
  const {t} = useTranslation();

  return (
    <label className={clsx(className, 'flex', 'flex-col')} htmlFor={id}>
      <span className={clsx('text-sm')}>{t(i18n.label)}</span>
      <select
        className={clsx(
          ['mt-1'],
          ['px-2'],
          ['py-2'],
          ['border', 'border-blue-200'],
          ['rounded-sm'],
        )}
        id={id}
        value={value}
        onChange={handleChange}
      >
        {Object.entries(choices).map(([value, label]) => (
          <option key={value} value={value}>
            {t(label)}
          </option>
        ))}
      </select>
    </label>
  );
};
