import clsx from 'clsx';
import {useTranslation} from 'next-i18next';
import React, {useMemo, useState} from 'react';
import {CommonProps} from '~/badges/common';
import {CharacterMarisa, CharacterReimu, Options} from '~/badges/sa';
import {badgesBaseUrl} from '~/lib/env';
import {BadgeBlock} from './Badge';
import {Selection} from './Selection';

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

export type LookProps = {
  className?: string;
  id: string;
  badgeUrl: string;
  selections: Record<string, React.VFC<{className?: string}>>;
};
export const Look: React.VFC<LookProps> = ({
  className,
  id,
  selections,
  badgeUrl,
  ...props
}) => {
  const {t} = useTranslation();
  return (
    <section
      id={id}
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
        {Object.entries(selections).map(([key, Selection]) => (
          <Selection key={key} />
        ))}
      </div>
      <BadgeBlock className={clsx('mt-8')} badgeUrl={badgeUrl} />
    </section>
  );
};

export type ContainerProps = {className?: string};
export const Container: React.VFC<ContainerProps> = ({...props}) => {
  const [difficulty, setDifficulty] = useState<keyof typeof difficulties>(
    'normal',
  );
  const [player, setPlayer] = useState<keyof typeof players>('reimu');
  const [supportReimu, setSupportReimu] = useState<keyof typeof supportsReimu>(
    'yukari',
  );
  const [supportMarisa, setSupportMarisa] = useState<
    keyof typeof supportsMarisa
  >('alice');
  const [style, setStyle] = useState<keyof typeof styles>('flat-square');
  const [label, setLabel] = useState<keyof typeof labels>('ja-abbr');
  const [message, setMessage] = useState<keyof typeof messages>('en');

  const badgeUrl = useMemo(() => {
    const url = new URL(
      player === 'reimu'
        ? `${difficulty}/${player}/${supportReimu}/`
        : `${difficulty}/${player}/${supportMarisa}/`,
      badgesBaseUrl.sa,
    );
    url.searchParams.set('style', style);
    url.searchParams.set('label', label);
    url.searchParams.set('message', message);
    return url.toString();
  }, [difficulty, label, message, player, style, supportMarisa, supportReimu]);

  const selections = useMemo<
    Record<string, React.VFC<{className?: string}>>
  >(() => {
    const SelectionDifficulty = ({...props}) => (
      <Selection
        {...props}
        id="sa-difficulty"
        i18n={{label: 'sa:label.difficulty'}}
        value={difficulty}
        choices={difficulties}
        handleChange={(event) => {
          const value = event.target.value;
          if (
            (Object.keys(difficulties).includes as (
              value: string,
            ) => value is keyof typeof difficulties)(value)
          )
            setDifficulty(value);
        }}
      />
    );
    const SelectionSupportReimu = ({...props}) => (
      <Selection
        {...props}
        id="sa-support"
        i18n={{label: 'sa:label.support'}}
        value={supportReimu}
        choices={supportsReimu}
        handleChange={(event) => {
          const value = event.target.value;
          if (
            (Object.keys(supportsReimu).includes as (
              value: string,
            ) => value is keyof typeof supportsReimu)(value)
          )
            setSupportReimu(value);
        }}
      />
    );
    const SelectionSupportMarisa = ({...props}) => (
      <Selection
        {...props}
        id="sa-player"
        i18n={{label: 'sa:label.player'}}
        value={supportMarisa}
        choices={supportsMarisa}
        handleChange={(event) => {
          const value = event.target.value;
          if (
            (Object.keys(supportsMarisa).includes as (
              value: string,
            ) => value is keyof typeof supportsMarisa)(value)
          )
            setSupportMarisa(value);
        }}
      />
    );
    const SelectionPlayer = ({...props}) => (
      <Selection
        {...props}
        id="sa-player"
        i18n={{label: 'sa:label.player'}}
        value={player}
        choices={players}
        handleChange={(event) => {
          const value = event.target.value;
          if (
            (Object.keys(players).includes as (
              value: string,
            ) => value is keyof typeof players)(value)
          )
            setPlayer(value);
        }}
      />
    );
    const SelectionStyle = ({...props}) => (
      <Selection
        {...props}
        id="sa-player"
        i18n={{label: 'common:label.style'}}
        value={style}
        choices={styles}
        handleChange={(event) => {
          const value = event.target.value;
          if (
            (Object.keys(styles).includes as (
              value: string,
            ) => value is keyof typeof styles)(value)
          )
            setStyle(value);
        }}
      />
    );
    const SelectionLabel = ({...props}) => (
      <Selection
        {...props}
        id="sa-player"
        i18n={{label: 'common:label.label'}}
        value={label}
        choices={labels}
        handleChange={(event) => {
          const value = event.target.value;
          if (
            (Object.keys(labels).includes as (
              value: string,
            ) => value is keyof typeof labels)(value)
          )
            setLabel(value);
        }}
      />
    );
    const SelectionMessage = ({...props}) => (
      <Selection
        {...props}
        id="sa-messages"
        i18n={{label: 'common:label.message'}}
        value={message}
        choices={messages}
        handleChange={(event) => {
          const value = event.target.value;
          if (
            (Object.keys(messages).includes as (
              value: string,
            ) => value is keyof typeof messages)(value)
          )
            setMessage(value);
        }}
      />
    );
    return {
      difficulty: SelectionDifficulty,
      player: SelectionPlayer,
      support:
        player === 'reimu' ? SelectionSupportReimu : SelectionSupportMarisa,
      style: SelectionStyle,
      label: SelectionLabel,
      message: SelectionMessage,
    };
  }, [difficulty, label, message, player, style, supportMarisa, supportReimu]);

  return (
    <Look {...props} id="sa" badgeUrl={badgeUrl} selections={selections} />
  );
};
