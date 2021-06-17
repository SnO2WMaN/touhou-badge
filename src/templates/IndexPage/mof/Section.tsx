import clsx from 'clsx';
import React, {useMemo, useState} from 'react';
import {Badge} from './Badge';
import {MoFBadgeContext} from './context';
import {
  DifficultySelection,
  LabelSelection,
  MessageSelection,
  PlayerSelection,
  StyleSelection,
  TypeSelection,
} from './Selection';

export type LookProps = {
  className?: string;
  id: Record<
    | 'section'
    | 'difficulty'
    | 'player'
    | 'type'
    | 'style'
    | 'label'
    | 'message',
    string
  >;
};
export const Look: React.VFC<LookProps> = ({className, id, ...props}) => {
  return (
    <section id={id.section} className={clsx(className)}>
      <h2 className={clsx('text-2xl', 'font-bold')}>東方風神録</h2>
      <div className={clsx('mt-2', 'grid', 'grid-cols-3')}>
        <DifficultySelection id={id.difficulty} />
        <PlayerSelection id={id.player} />
        <TypeSelection id={id.type} />
      </div>
      <div className={clsx('mt-2', 'grid', 'grid-cols-3')}>
        <StyleSelection id={id.style} />
        <LabelSelection id={id.label} />
        <MessageSelection id={id.message} />
      </div>
      <div className={clsx('mt-4', 'flex', 'flex-col', 'items-center')}>
        <Badge />
        <div className={clsx('w-full')} />
      </div>
    </section>
  );
};

export type ContainerProps = {className?: string};
export const Container: React.VFC<ContainerProps> = ({...props}) => {
  const [difficulty, setDifficulty] = useState<
    MoFBadgeContext['difficulty']['value']
  >('normal');
  const [player, setPlayer] = useState<MoFBadgeContext['player']['value']>(
    'reimu',
  );
  const [type, setType] = useState<MoFBadgeContext['type']['value']>('a');
  const [style, setStyle] = useState<MoFBadgeContext['style']['value']>(
    'flat-square',
  );
  const [label, setLabel] = useState<MoFBadgeContext['label']['value']>(
    'ja-abbr',
  );
  const [message, setMessage] = useState<MoFBadgeContext['message']['value']>(
    'en',
  );

  const value = useMemo<MoFBadgeContext>(
    () => ({
      difficulty: {value: difficulty, change: setDifficulty},
      player: {value: player, change: setPlayer},
      type: {value: type, change: setType},
      style: {value: style, change: setStyle},
      label: {value: label, change: setLabel},
      message: {value: message, change: setMessage},
    }),
    [difficulty, label, message, player, style, type],
  );

  return (
    <MoFBadgeContext.Provider value={value}>
      <Look
        {...props}
        id={{
          section: 'mof',
          difficulty: 'mof-difficulty',
          player: 'mof-player',
          type: 'mof-type',
          style: 'mof-style',
          label: 'mof-label',
          message: 'mof-message',
        }}
      />
    </MoFBadgeContext.Provider>
  );
};
