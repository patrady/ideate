import { OrganizationRepository } from "../../repositories";
import { Errors, MethodObject, Organization, Model } from "..";

export class OrganizationMethodObject extends MethodObject<Organization> {
  public getErrors() {
    return Errors.from({
      "Invalid Team Id": !Model.isValidId(this.id),
    });
  }

  public exists() {
    return OrganizationRepository.contains(this.getId());
  }

  public getValue() {
    const value = OrganizationRepository.find(this.getId());
    if (!value) {
      throw new Error(`Organization ${this.getId()} not found`);
    }

    return value;
  }
}
