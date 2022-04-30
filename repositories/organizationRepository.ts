import { Organization } from "../models";
import { TeamsRepository } from ".";

export class OrganizationRepository {
  public static contains(slug: string) {
    return this.find(slug) !== undefined;
  }

  public static find(slug: string): Organization | undefined {
    return this.all().find((organization) => organization.is(slug));
  }

  public static all(): Organization[] {
    return [
      new Organization({
        id: 1,
        name: "Ramsey Solutions",
        slug: "ramsey-solutions",
        isActive: true,
        teams: TeamsRepository.all(),
      }),
    ];
  }
}
