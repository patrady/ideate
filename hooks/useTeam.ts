import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { Team } from "../models";
import { TeamSdk } from "../sdk/ideate";
import useBool from "./useBool";

type ReturnValues = [team: Team | undefined, isLoading: boolean];

function useTeam(): ReturnValues {
  const {
    query: { teamId },
  } = useRouter();
  const [isLoading, stopLoading, startLoading] = useBool(true);
  const [team, setTeam] = useState<Team>();

  const slug = useMemo(() => {
    if (!Team.isValidSlug(teamId)) {
      console.error("Invalid Team Id", teamId);
      return "";
    }

    return Team.getSlugFromQuery(teamId);
  }, [teamId]);

  useEffect(() => {
    async function fetchTeam() {
      startLoading();

      const teamFromApi = await new TeamSdk().getBySlug(slug);
      setTeam(teamFromApi);

      stopLoading();
    }

    if (slug) {
      fetchTeam();
    }
  }, [slug]);

  return [team, isLoading];
}

export default useTeam;
