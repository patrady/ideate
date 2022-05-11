import { CardRepository } from "../../repositories";
import { Errors, Model } from "..";
import { Card } from "../card";
import { MethodObject } from "./methodObject";

export class CardMethodObject extends MethodObject<Card> {
  public exists() {
    console.log('id', this.getId());
    return CardRepository.contains(this.getStringId());
  }

  public getErrors() {
    return Errors.from({
      "Invalid Card Id": !Model.isValidStringId(this.id),
    });
  }

  public async getValue() {
    const value = await CardRepository.find(this.getStringId());
    if (!value) {
      throw new Error(`Card ${this.getId()} not found`);
    }

    return value;
  }
}
