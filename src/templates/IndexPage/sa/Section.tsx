import clsx from 'clsx';
import {useTranslation} from 'next-i18next';
import React, {useMemo, useState} from 'react';
import {BadgeBlock} from './Badge';
import {SABadgeContext} from './context';
import {
  DifficultySelection,
  LabelSelection,
  MessageSelection,
  PlayerSelection,
  StyleSelection,
  SupportSelection,
} from './Selection';

export type LookProps = {
  className?: string;
  id: Record<
    | 'section'
    | 'difficulty'
    | 'player'
    | 'support'
    | 'style'
    | 'label'
    | 'message',
    string
  >;
};
export const Look: React.VFC<LookProps> = ({className, id, ...props}) => {
  const {t} = useTranslation();
  return (
    <section
      id={id.section}
      className={clsx(
        className,
        ['px-6', 'py-8'],
        ['bg-white'],
        ['shadow-md'],
        ['rounded-sm'],
      )}
    >
      <h2 className={clsx('text-2xl', 'font-bold')}>{t('sa:title')}</h2>
      <div
        className={clsx(
          'mt-4',
          ['grid', 'grid-cols-3'],
          ['gap-x-4', 'gap-y-4'],
        )}
      >
        <DifficultySelection id={id.difficulty} />
        <PlayerSelection id={id.player} />
        <SupportSelection id={id.support} />
        <StyleSelection id={id.style} />
        <LabelSelection id={id.label} />
        <MessageSelection id={id.message} />
      </div>
      <BadgeBlock className={clsx('mt-8')} />
    </section>
  );
};

export type ContainerProps = {className?: string};
export const Container: React.VFC<ContainerProps> = ({...props}) => {
  const [difficulty, setDifficulty] = useState<
    SABadgeContext['difficulty']['value']
  >('normal');
  const [player, setPlayer] = useState<SABadgeContext['player']['value']>(
    'reimu',
  );
  const [type, setType] = useState<SABadgeContext['support']['value']>(
    'yukari',
  );
  const [style, setStyle] = useState<SABadgeContext['style']['value']>(
    'flat-square',
  );
  const [label, setLabel] = useState<SABadgeContext['label']['value']>(
    'ja-abbr',
  );
  const [message, setMessage] = useState<SABadgeContext['message']['value']>(
    'en',
  );

  const value = useMemo<SABadgeContext>(
    () => ({
      difficulty: {value: difficulty, change: setDifficulty},
      player: {value: player, change: setPlayer},
      support: {value: type, change: setType},
      style: {value: style, change: setStyle},
      label: {value: label, change: setLabel},
      message: {value: message, change: setMessage},
    }),
    [difficulty, label, message, player, style, type],
  );

  return (
    <SABadgeContext.Provider value={value}>
      <Look
        {...props}
        id={{
          section: 'sa',
          difficulty: 'sa-difficulty',
          player: 'sa-player',
          support: 'sa-support',
          style: 'sa-style',
          label: 'sa-label',
          message: 'sa-message',
        }}
      />
    </SABadgeContext.Provider>
  );
};
