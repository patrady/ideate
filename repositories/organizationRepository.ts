import { Organization } from "../models";
import { TeamsRepository } from ".";

export class OrganizationRepository {
  public static contains(id: number) {
    return this.find(id) !== undefined;
  }

  public static find(id: number): Organization | undefined {
    return this.all().find((organization) => organization.is(id));
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
