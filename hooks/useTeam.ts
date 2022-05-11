import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
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

  const slug = useMemo(() => {
    if (!Team.isValidId(teamId)) {
      console.error("Invalid Team Id", teamId);
      return "";
    }

    return Team.getIdFromQuery(teamId);
  }, [teamId]);

  useEffect(() => {
    async function fetchTeam(organization: Organization) {
      startLoading();

      const teamFromApi = await new TeamSdk().getBySlug(organization, slug);
      setTeam(teamFromApi);

      stopLoading();
    }

    if (slug && organization) {
      fetchTeam(organization);
    }
  }, [slug, organization]);

  return {
    organization,
    team,
    isLoading: isLoading || isOrganizationLoading,
  };
}

export default useTeam;
