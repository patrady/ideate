import {
  AddableCardprops,
  AddCardProps,
  Card,
  CardProps,
  Organization,
  Team,
  UpdateableCardProps,
} from "../../models";
import { Phase, Status } from "../../types";
import { ApiClient } from "./apiClient";

export class CardsSdk {
  private client = new ApiClient();

  public async get(organization: Organization, team: Team) {
    try {
      const cards = await this.client.get<CardProps[]>(
        `/api/cards?organization=${organization.slug}&team=${team.slug}`
      );

      return cards.map((c) => new Card(c));
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  public async add(
    organization: Organization,
    team: Team,
    cardProps: AddableCardprops
  ) {
    try {
      const props: AddCardProps = {
        ...cardProps,
        organizationSlug: organization.slug,
        teamSlug: team.slug,
      };

      const card = await this.client.post<CardProps>(`/api/cards`, props);
      return new Card(card);
    } catch (error) {
      throw new Error("Oops, could not add the card.");
    }
  }

  public async move(card: Card, phase: Phase, status: Status) {
    return this.update(card, { phase, status });
  }

  public async update(card: Card, props: UpdateableCardProps) {
    try {
      const updatedCard = await this.client.put<CardProps>(
        `/api/cards/${card.id}`,
        { ...card, ...props }
      );

      return new Card(updatedCard);
    } catch (error) {
      throw new Error("Oops, could not update the card.");
    }
  }

  public async delete(card: Card) {
    try {
      await this.client.delete(`/api/cards/${card.id}`);
    } catch (error) {
      throw new Error("Oops, could not delete the card.");
    }
  }
}
