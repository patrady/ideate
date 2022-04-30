import Heading from "@ramsey-design-system/heading";
import { NextPage } from "next";
import Head from "next/head";
import { Page, TeamLink, TeamLinkContainer } from "../../components";
import { useLocale, useOrganization } from "../../hooks";
import { Team } from "../../models";

const BoardPage: NextPage = () => {
  const t = useLocale();
  const [organization, isLoading] = useOrganization();

  return (
    <Page>
      <Head>
        <title>{t.pages.organizations.index.title}</title>
        <meta
          name="description"
          content={t.pages.organizations.index.description}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Heading level="1">Teams</Heading>
      <TeamLinkContainer>
        {organization?.teams.sort(Team.sort).map((team) => (
          <TeamLink key={team.slug} team={team} organization={organization} />
        ))}
      </TeamLinkContainer>
    </Page>
  );
};

export default BoardPage;
