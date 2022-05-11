import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    async function fetchOrganization() {
      startLoading();

      const organizationFromApi = await new OrganizationSdk().getById(
        Organization.getIdFromQuery(organizationId)
      );
      setOrganization(organizationFromApi);

      stopLoading();
    }

    if (Organization.isValidId(organizationId)) {
      fetchOrganization();
    }
  }, [organizationId]);

  return [organization, isLoading];
}

export default useOrganization;
