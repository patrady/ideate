import { TeamsRepository } from "../../repositories";
import { Team, Errors, MethodObject, Model } from "..";

export class TeamMethodObject extends MethodObject<Team> {
  public exists() {
    return TeamsRepository.contains(this.getSlug());
  }

  public getErrors() {
    return Errors.from({
      "Invalid Team Slug": !Model.isValidSlug(this.id),
    });
  }

  public getValue() {
    const value = TeamsRepository.find(this.getSlug());
    if (!value) {
      throw new Error(`Team ${this.getSlug()} not found`);
    }

    return value;
  }

  public getSlug(): string {
    return Model.getSlugFromQuery(this.id);
  }
}
