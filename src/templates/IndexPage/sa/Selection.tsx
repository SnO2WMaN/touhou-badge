import clsx from 'clsx';
import {useTranslation} from 'next-i18next';
import React, {useContext, useMemo} from 'react';
import {
  difficulties,
  labels,
  messages,
  players,
  SABadgeContext,
  styles,
  supportsMarisa,
  supportsReimu,
} from './context';

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

export const DifficultySelection: React.VFC<{
  id: string;
  className?: string;
}> = ({...props}) => {
  const {
    difficulty: {value, change},
  } = useContext(SABadgeContext);

  const isValidValue = (value: string): value is Parameters<typeof change>[0] =>
    Object.keys(difficulties).includes(value);

  return (
    <Selection
      {...props}
      i18n={{label: 'mof:label.difficulty'}}
      value={value}
      choices={difficulties}
      handleChange={(event) => {
        if (isValidValue(event.target.value)) change(event.target.value);
      }}
    />
  );
};

export const PlayerSelection: React.VFC<{
  id: string;
  className?: string;
}> = ({...props}) => {
  const {
    player: {value, change},
    support: {change: changeSupport},
  } = useContext(SABadgeContext);

  return (
    <Selection
      {...props}
      i18n={{label: 'mof:label.player'}}
      value={value}
      choices={players}
      handleChange={(event) => {
        if (event.target.value === 'reimu') {
          change(event.target.value);
          changeSupport('yukari');
        } else if (event.target.value === 'marisa') {
          change(event.target.value);
          changeSupport('alice');
        }
      }}
    />
  );
};

export const SupportSelection: React.VFC<{
  id: string;
  className?: string;
}> = ({...props}) => {
  const {
    player: {value: valuePlayer},
    support: {value: valueSupport, change},
  } = useContext(SABadgeContext);
  const choices = useMemo(
    () => (valuePlayer === 'reimu' ? supportsReimu : supportsMarisa),
    [valuePlayer],
  );
  const handleChange = useMemo<
    React.ComponentProps<typeof Selection>['handleChange']
  >(
    () => (event) => {
      const value = event.target.value;
      if (
        valuePlayer === 'reimu' &&
        (Object.keys(supportsReimu).includes as (
          value: string,
        ) => value is keyof typeof supportsReimu)(value)
      )
        change(value);
      else if (
        valuePlayer === 'marisa' &&
        (Object.keys(supportsMarisa).includes as (
          value: string,
        ) => value is keyof typeof supportsMarisa)(value)
      )
        change(value);
    },
    [change, valuePlayer],
  );

  return (
    <Selection
      {...props}
      i18n={{label: 'sa:label.support'}}
      value={valueSupport}
      choices={choices}
      handleChange={handleChange}
    />
  );
};

export const StyleSelection: React.VFC<{
  id: string;
  className?: string;
}> = ({...props}) => {
  const {
    style: {value, change},
  } = useContext(SABadgeContext);

  const isValidValue = (value: string): value is Parameters<typeof change>[0] =>
    Object.keys(styles).includes(value);

  return (
    <Selection
      {...props}
      i18n={{label: 'common:label.style'}}
      value={value}
      choices={styles}
      handleChange={(event) => {
        if (isValidValue(event.target.value)) change(event.target.value);
      }}
    />
  );
};

export const LabelSelection: React.VFC<{
  id: string;
  className?: string;
}> = ({...props}) => {
  const {
    label: {value, change},
  } = useContext(SABadgeContext);

  const isValidValue = (value: string): value is Parameters<typeof change>[0] =>
    Object.keys(labels).includes(value);

  return (
    <Selection
      {...props}
      i18n={{label: 'common:label.label'}}
      value={value}
      choices={labels}
      handleChange={(event) => {
        if (isValidValue(event.target.value)) change(event.target.value);
      }}
    />
  );
};

export const MessageSelection: React.VFC<{
  id: string;
  className?: string;
}> = ({...props}) => {
  const {
    message: {value, change},
  } = useContext(SABadgeContext);

  const isValidValue = (value: string): value is Parameters<typeof change>[0] =>
    Object.keys(messages).includes(value);

  return (
    <Selection
      {...props}
      i18n={{label: 'common:label.message'}}
      value={value}
      choices={messages}
      handleChange={(event) => {
        if (isValidValue(event.target.value)) change(event.target.value);
      }}
    />
  );
};
