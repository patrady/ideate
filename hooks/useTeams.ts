import { useEffect, useState } from "react";
import { TeamsDecorator } from "../decorators";
import { Organization, Team, TeamProps, UpdateableTeamProps } from "../models";
import { TeamSdk } from "../sdk/ideate";
import useBool from "./useBool";
import useLocale from "./useLocale";
import useOrganization from "./useOrganization";

type ReturnValues = {
  teams: TeamsDecorator;
  addTeam(values: TeamProps): Promise<void>;
  updateTeam(team: Team, values: UpdateableTeamProps): Promise<void>;
  isLoading: boolean;
  error: string | undefined;
};

function useTeams(): ReturnValues {
  const [error, setError] = useState<string>();
  const [organization, isOrganizationLoading] = useOrganization();
  const [isLoading, stopLoading, startLoading] = useBool(true);
  const [teams, setTeams] = useState<TeamsDecorator>(new TeamsDecorator([]));
  const t = useLocale();

  useEffect(() => {
    async function fetchTeams(organization: Organization) {
      startLoading();

      const teamsFromApi = await new TeamSdk().getByOrganization(organization);
      setTeams(new TeamsDecorator(teamsFromApi));

      stopLoading();
    }

    if (organization) {
      fetchTeams(organization);
    }
  }, [organization]);

  async function addTeam(values: TeamProps) {
    if (!organization) {
      return;
    }

    try {
      const team = await new TeamSdk().add(organization, values);
      setTeams(teams.add(team));
    } catch (error) {
      console.error(error);
      setError(t.models.team.errors.add);
    }
  }

  async function updateTeam(team: Team, values: UpdateableTeamProps) {
    if (!organization) {
      return;
    }

    try {
      const updatedTeam = await new TeamSdk().update(
        organization,
        team,
        values
      );

      setTeams(teams.update(updatedTeam));
    } catch (error) {
      console.error(error);
      setError(t.models.team.errors.add);
    }
  }

  return {
    teams,
    isLoading: isOrganizationLoading || isLoading,
    addTeam,
    updateTeam,
    error,
  };
}

export default useTeams;
