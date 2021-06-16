import {appWithTranslation} from 'next-i18next';
import {AppProps} from 'next/app';
import React from 'react';
import 'tailwindcss/tailwind.css';
import {NextI18nextConfig} from '~/i18n';

export const App: React.FC<AppProps> = ({Component, pageProps}) => {
  return <Component {...pageProps} />;
};

export default appWithTranslation(App, NextI18nextConfig);
