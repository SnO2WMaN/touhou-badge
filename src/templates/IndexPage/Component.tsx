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
    <main className={clsx(className, 'container', 'mx-auto')}>
      <div className={clsx('grid', 'grid-cols-3')}>
        <SectionMoF className={clsx('')} />
      </div>
    </main>
  );
};

export type ContainerProps = {className?: string};
export const Container: React.VFC<ContainerProps> = ({...props}) => {
  return <Look {...props} SectionMoF={SectionMoF} />;
};
