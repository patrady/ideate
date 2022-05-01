import { Organization, OrganizationProps } from "../../models";
import { ApiClient } from "./apiClient";
import { OrganizationNotFound } from "./errors";

export class OrganizationSdk {
  private client = new ApiClient();

  public async getBySlug(slug: string) {
    try {
      const team = await this.client.get<OrganizationProps>(
        `/api/organizations/${slug}`
      );

      return new Organization(team);
    } catch (error) {
      console.log(error);
      throw new OrganizationNotFound();
    }
  }
}
