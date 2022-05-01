import { useEffect, useState } from "react";
import { TeamsDecorator } from "../decorators";
import { Team, TeamProps, UpdateableTeamProps } from "../models";
import { TeamSdk } from "../sdk/ideate";
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
  const [teams, setTeams] = useState<TeamsDecorator>(new TeamsDecorator([]));
  const t = useLocale();

  useEffect(() => {
    if (organization) {
      setTeams(new TeamsDecorator(organization?.teams));
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
    try {
      const updatedTeam = await new TeamSdk().update(team, values);
      setTeams(teams.update(updatedTeam));
    } catch (error) {
      console.error(error);
      setError(t.models.team.errors.add);
    }
  }

  return {
    teams,
    isLoading: isOrganizationLoading,
    addTeam,
    updateTeam,
    error,
  };
}

export default useTeams;
