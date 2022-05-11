import Button from "@ramsey-design-system/button";
import Heading from "@ramsey-design-system/heading";
import { NextPage } from "next";
import Head from "next/head";
import { Page, PlusIcon, TeamLink, TeamLinkContainer } from "../../components";
import AddTeamModal from "../../components/team/addTeamModal";
import UpdateTeamModal from "../../components/team/updateTeamModal";
import { useBool, useLocale, useSelected, useTeams } from "../../hooks";
import { Team, UpdateableTeamProps } from "../../models";

const TeamsPage: NextPage = () => {
  const t = useLocale();
  const { teams, addTeam, updateTeam } = useTeams();
  const [isModalOpen, closeModal, openModal] = useBool();
  const [selectedTeam, setSelectedTeam, resetSelectedTeam] =
    useSelected<Team>();

  async function handleUpdateTeam(values: UpdateableTeamProps) {
    if (!selectedTeam) {
      return;
    }

    await updateTeam(selectedTeam, values);
    resetSelectedTeam();
  }

console.log('teams', teams);

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
        {teams.sort().map((team) => (
          <TeamLink key={team.id} team={team} onEdit={setSelectedTeam} />
        ))}
      </TeamLinkContainer>
      <Button appearance="ghost" onClick={openModal}>
        <PlusIcon className="rds-Button-icon rds-Button-icon--left" />
        Add Team
      </Button>
      <AddTeamModal isOpen={isModalOpen} onAdd={addTeam} onClose={closeModal} />
      {selectedTeam && (
        <UpdateTeamModal
          isOpen
          team={selectedTeam}
          onUpdate={handleUpdateTeam}
          onClose={resetSelectedTeam}
        />
      )}
    </Page>
  );
};

export default TeamsPage;
