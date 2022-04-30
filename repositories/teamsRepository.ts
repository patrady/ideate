import { Team } from "../models";
import { CardRepository } from "./cardRepository";

export class TeamsRepository {
  public static contains(slug: string) {
    return this.find(slug) !== undefined;
  }

  public static find(slug: string): Team | undefined {
    return this.all().find((team) => team.is(slug));
  }

  public static all(): Team[] {
    return [
      new Team({
        id: 1,
        name: "Campfire Squad",
        slug: "campfire-squad",
        isActive: true,
        cards: CardRepository.storage,
      }),
      new Team({
        id: 2,
        name: "Dark Mode",
        slug: "dark-mode",
        isActive: true,
        cards: CardRepository.storage,
      }),
      new Team({
        id: 3,
        name: "Acquisition Team",
        slug: "acquisition-team",
        isActive: false,
        cards: CardRepository.storage,
      }),
    ];
  }
}
