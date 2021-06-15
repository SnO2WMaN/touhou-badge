import {NextPage} from 'next';
import React from 'react';

export type PageProps = Record<string, never>;
export const Page: NextPage<PageProps> = ({...props}) => {
  return (
    <>
      <main>
        <p />
      </main>
    </>
  );
};
export default Page;
