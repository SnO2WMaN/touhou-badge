import clsx from 'clsx';
import React, {useContext, useMemo} from 'react';
import {badgesBaseUrl} from '~/lib/env';
import {SABadgeContext} from './context';

export const useSABadgeUrl = () => {
  const {
    difficulty: {value: difficulty},
    player: {value: player},
    support: {value: support},
    style: {value: style},
    label: {value: label},
    message: {value: message},
  } = useContext(SABadgeContext);

  const badgeUrl = useMemo(() => {
    const url = new URL(
      `${difficulty}/${player}/${support}/`,
      badgesBaseUrl.sa,
    );
    url.searchParams.set('style', style);
    url.searchParams.set('label', label);
    url.searchParams.set('message', message);
    return url.toString();
  }, [difficulty, label, message, player, style, support]);

  return badgeUrl;
};

export const Badge: React.VFC<{className?: string}> = ({className}) => {
  const badgeUrl = useSABadgeUrl();
  return <img className={clsx(className)} src={badgeUrl} alt={badgeUrl} />;
};

export const BadgeBlock: React.VFC<{className?: string}> = ({className}) => {
  return (
    <div className={clsx(className, 'bg-gray-50', ['py-4'], ['rounded-sm'])}>
      <div className={clsx('h-12', 'flex', 'justify-center', 'items-center')}>
        <Badge />
      </div>
    </div>
  );
};
