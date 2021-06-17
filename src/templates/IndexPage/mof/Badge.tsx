import clsx from 'clsx';
import React, {useContext, useMemo} from 'react';
import {badgesBaseUrl} from '~/lib/env';
import {MoFBadgeContext} from './context';

export const useMoFBadgeUrl = () => {
  const {
    difficulty: {value: difficulty},
    player: {value: player},
    type: {value: type},
    style: {value: style},
    label: {value: label},
    message: {value: message},
  } = useContext(MoFBadgeContext);

  const badgeUrl = useMemo(() => {
    const url = new URL(`${difficulty}/${player}/${type}/`, badgesBaseUrl.mof);
    url.searchParams.set('style', style);
    url.searchParams.set('label', label);
    url.searchParams.set('message', message);
    return url.toString();
  }, [difficulty, label, message, player, style, type]);

  return badgeUrl;
};

export const Badge: React.VFC<{className?: string}> = ({className}) => {
  const badgeUrl = useMoFBadgeUrl();
  return <img className={clsx(className)} src={badgeUrl} alt={badgeUrl} />;
};
