import clsx from 'clsx';
import React from 'react';

export const Badge: React.VFC<{className?: string; badgeUrl: string}> = ({
  className,
  badgeUrl,
}) => {
  return <img className={clsx(className)} src={badgeUrl} alt={badgeUrl} />;
};

export const BadgeBlock: React.VFC<{className?: string; badgeUrl: string}> = ({
  className,
  badgeUrl,
}) => {
  return (
    <div className={clsx(className, 'bg-gray-50', ['py-4'], ['rounded-sm'])}>
      <div className={clsx('h-12', 'flex', 'justify-center', 'items-center')}>
        <Badge badgeUrl={badgeUrl} />
      </div>
    </div>
  );
};
