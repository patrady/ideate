import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Organization, Team } from "../models";
import { TeamSdk } from "../sdk/ideate";
import useBool from "./useBool";
import useOrganization from "./useOrganization";

type ReturnValues = {
  organization: Organization | undefined;
  team: Team | undefined;
  isLoading: boolean;
};

function useTeam(): ReturnValues {
  const {
    query: { teamId },
  } = useRouter();
  const [isLoading, stopLoading, startLoading] = useBool(true);
  const [organization, isOrganizationLoading] = useOrganization();
  const [team, setTeam] = useState<Team>();

  useEffect(() => {
    async function fetchTeam(organization: Organization) {
      startLoading();

      const teamFromApi = await new TeamSdk().getById(
        organization,
        Team.getIdFromQuery(teamId)
      );
      setTeam(teamFromApi);

      stopLoading();
    }

    if (Team.isValidId(teamId) && organization) {
      fetchTeam(organization);
    }
  }, [teamId, organization]);

  return {
    organization,
    team,
    isLoading: isLoading || isOrganizationLoading,
  };
}

export default useTeam;
