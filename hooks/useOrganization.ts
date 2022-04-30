import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { Organization } from "../models";
import { OrganizationSdk } from "../sdk/ideate";
import useBool from "./useBool";

type ReturnValues = [
  organization: Organization | undefined,
  isLoading: boolean
];

function useOrganization(): ReturnValues {
  const {
    query: { organizationId },
  } = useRouter();
  const [isLoading, stopLoading, startLoading] = useBool(true);
  const [organization, setOrganization] = useState<Organization>();

  const slug = useMemo(() => {
    if (!Organization.isValidSlug(organizationId)) {
      console.error("Invalid Organization Slug", organizationId);
      return "";
    }

    return Organization.getSlugFromQuery(organizationId);
  }, [organizationId]);

  useEffect(() => {
    async function fetchOrganization() {
      startLoading();

      const organizationFromApi = await OrganizationSdk.getBySlug(slug);
      setOrganization(organizationFromApi);

      stopLoading();
    }

    if (slug) {
      fetchOrganization();
    }
  }, [slug]);

  return [organization, isLoading];
}

export default useOrganization;
