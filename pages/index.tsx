import type { NextPage } from "next";
import Head from "next/head";
import { Board } from "../components";

const BoardPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ideate | Board</title>
        <meta
          name="description"
          content="Track product prototypes, tests, and features"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Board cards={[]} />
    </>
  );
};

export default BoardPage;
