import clsx from 'clsx';
import {appWithTranslation} from 'next-i18next';
import {AppProps} from 'next/app';
import React from 'react';
import 'tailwindcss/tailwind.css';
import {NextI18nextConfig} from '~/i18n';

export const App: React.FC<AppProps> = ({Component, pageProps}) => {
  return (
    <div className={clsx('w-full', 'min-h-screen', 'py-8', 'bg-blue-50')}>
      <div className={clsx('container', 'mx-auto')}>
        <Component {...pageProps} />
      </div>
    </div>
  );
};

export default appWithTranslation(App, NextI18nextConfig);
