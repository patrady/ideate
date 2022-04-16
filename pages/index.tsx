import type { NextPage } from "next";
import Head from "next/head";
import { Board } from "../components";
import { useLocale } from "../hooks";

const BoardPage: NextPage = () => {
  const t = useLocale();

  return (
    <>
      <Head>
        <title>{t.pages.index.title}</title>
        <meta name="description" content={t.pages.index.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Board />
    </>
  );
};

export default BoardPage;
