import { CardRepository } from "../../repositories";
import { Errors, Model } from "..";
import { Card } from "../card";
import { MethodObject } from "./methodObject";

export class CardMethodObject extends MethodObject<Card> {
  public exists() {
    return CardRepository.contains(this.getId());
  }

  public getErrors() {
    return Errors.from({
      "Invalid Card Id": !Model.isValidId(this.id),
    });
  }

  public async getValue() {
    const value = await CardRepository.find(this.getId());
    if (!value) {
      throw new Error(`Card ${this.getId()} not found`);
    }

    return value;
  }
}
