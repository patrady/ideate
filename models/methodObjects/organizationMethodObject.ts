import { OrganizationRepository } from "../../repositories";
import { Errors, MethodObject, Organization, Model } from "..";

export class OrganizationMethodObject extends MethodObject<Organization> {
  public getErrors() {
    return Errors.from({
      "Invalid Team Id": !Model.isValidSlug(this.id),
    });
  }

  public exists() {
    return OrganizationRepository.contains(this.getSlug());
  }

  public getValue() {
    const value = OrganizationRepository.find(this.getSlug());
    if (!value) {
      throw new Error(`Organization ${this.getSlug()} not found`);
    }

    return value;
  }

  public getSlug(): string {
    return Model.getSlugFromQuery(this.id);
  }
}
