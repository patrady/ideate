import { TeamsRepository } from "../../repositories";
import { Team, Errors, Model } from "..";
import { MethodObject } from "./methodObject";
import { QueryParam } from "../../types";

export class TeamMethodObject extends MethodObject<Team> {
  private organizationId: QueryParam;

  constructor(id: QueryParam, organizationId: QueryParam) {
    super(id);
    this.organizationId = organizationId;
  }

  public exists() {
    return TeamsRepository.contains(this.getOrganizationId(), this.getId());
  }

  public getErrors() {
    return Errors.from({
      "Invalid Team Id": !Model.isValidId(this.id),
    });
  }

  public async getValue() {
    const value = await TeamsRepository.find(
      this.getOrganizationId(),
      this.getId()
    );
    if (!value) {
      throw new Error(`Team ${this.getId()} not found`);
    }

    return value;
  }

  public getOrganizationId(): string {
    return Model.getIdFromQuery(this.organizationId);
  }
}
