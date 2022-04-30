import type { NextPage } from "next";
import Head from "next/head";
import { Board } from "../../../../components";
import { useLocale, useTeam } from "../../../../hooks";

const BoardPage: NextPage = () => {
  const t = useLocale();
  // const team = useTeam();

  return (
    <>
      <Head>
        <title>{t.pages.organizations.show.teams.show.title}</title>
        <meta
          name="description"
          content={t.pages.organizations.show.teams.show.description({
            name: "hi",
          })}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Board />
    </>
  );
};

export default BoardPage;
