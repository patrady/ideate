import { TeamsRepository } from "../../repositories";
import { Team, Errors, Model } from "..";
import { MethodObject } from "./methodObject";
import { QueryParam } from "../../types";

export class TeamMethodObject extends MethodObject<Team> {
  private organizationSlug: QueryParam;

  constructor(id: QueryParam, organizationSlug: QueryParam) {
    super(id);
    this.organizationSlug = organizationSlug;
  }

  public exists() {
    return TeamsRepository.contains(this.getOrganizationSlug(), this.getSlug());
  }

  public getErrors() {
    return Errors.from({
      "Invalid Team Slug": !Model.isValidSlug(this.id),
    });
  }

  public async getValue() {
    const value = await TeamsRepository.find(this.getOrganizationSlug(), this.getSlug());
    if (!value) {
      throw new Error(`Team ${this.getSlug()} not found`);
    }

    return value;
  }

  public getSlug(): string {
    return Model.getSlugFromQuery(this.id);
  }

  public getOrganizationSlug(): string {
    return Model.getSlugFromQuery(this.organizationSlug);
  }
}
