import { OrganizationRepository } from "../../repositories";
import { Errors, Organization, Model } from "..";
import { MethodObject } from "./methodObject";

export class OrganizationMethodObject extends MethodObject<Organization> {
  public getErrors() {
    return Errors.from({
      "Invalid Team Id": !Model.isValidId(this.id),
    });
  }

  public exists() {
    return OrganizationRepository.contains(this.getSlug());
  }

  public async getValue() {
    const value = await OrganizationRepository.find(this.getSlug());
    if (!value) {
      throw new Error(`Organization ${this.getSlug()} not found`);
    }

    return value;
  }

  public getSlug(): string {
    return Model.getIdFromQuery(this.id);
  }
}
