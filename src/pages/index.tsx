import {GetStaticPropsContext, NextPage} from 'next';
import {useTranslation} from 'next-i18next';
import {serverSideTranslations} from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import React from 'react';
import {NextI18nextConfig} from '~/i18n';
import {IndexPage} from '~/templates/IndexPage';

export type UrlQuery = Record<string, never>;
export const getStaticProps = async ({
  locale,
}: GetStaticPropsContext<UrlQuery>) => {
  return {
    props: {
      ...(locale &&
        (await serverSideTranslations(
          locale,
          ['common', 'index', 'mof', 'sa'],
          NextI18nextConfig,
        ))),
    },
  };
};

export type PageProps = Record<string, never>;
export const Page: NextPage<PageProps> = ({...props}) => {
  const {t} = useTranslation();

  return (
    <>
      <Head>
        <title>{t('page_title.index')}</title>
      </Head>
      <IndexPage />
    </>
  );
};
export default Page;
