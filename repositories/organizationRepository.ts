import { Organization } from "../models";
import { TeamsRepository } from ".";

export class OrganizationRepository {
  public static contains(slug: string) {
    return this.find(slug) !== undefined;
  }

  public static async find(slug: string): Promise<Organization | undefined> {
    return (await this.all()).find((organization) => organization.is(slug));
  }

  public static async all(): Promise<Organization[]> {
    return [
      new Organization({
        id: 1,
        name: "Ramsey Solutions",
        slug: "ramsey-solutions",
        isActive: true,
        teams: await TeamsRepository.all(),
      }),
    ];
  }
}
