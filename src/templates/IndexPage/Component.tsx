import clsx from 'clsx';
import React from 'react';
import {SectionMoF} from './mof';

export type LookProps = {
  className?: string;
  SectionMoF: React.VFC<{className?: string}>;
};
export const Look: React.VFC<LookProps> = ({
  className,
  SectionMoF,
  ...props
}) => {
  return (
    <main
      className={clsx(
        className,
        'w-full',
        'grid',
        ['gap-x-4', 'gap-y-4'],
        ['grid-cols-1', 'lg:grid-cols-2', 'xl:grid-cols-3'],
      )}
    >
      <SectionMoF className={clsx()} />
    </main>
  );
};

export type ContainerProps = {className?: string};
export const Container: React.VFC<ContainerProps> = ({...props}) => {
  return <Look {...props} SectionMoF={SectionMoF} />;
};
