import { Organization, OrganizationProps } from "../../models";
import { ApiClient } from "./apiClient";
import { OrganizationNotFound } from "./errors";

export class OrganizationSdk {
  private client = new ApiClient();

  public async get() {
    try {
      const organizations = await this.client.get<OrganizationProps[]>(
        "/api/organizations"
      );

      return organizations.map((o) => new Organization(o));
    } catch (error) {
      console.log(error);
      throw new OrganizationNotFound();
    }
  }

  public async getById(id: string) {
    try {
      const organization = await this.client.get<OrganizationProps>(
        `/api/organizations/${id}`
      );

      return new Organization(organization);
    } catch (error) {
      console.log(error);
      throw new OrganizationNotFound();
    }
  }
}
