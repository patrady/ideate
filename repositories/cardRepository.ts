import { AddCardProps, Card, UpdateCardProps } from "../models";
import { Phase, Status } from "../types";

export class CardRepository {
  static storage: Card[] = [];

  public static contains(id: number) {
    return this.find(id) !== undefined;
  }

  public static async find(id: number): Promise<Card | undefined> {
    return (await this.all()).find((card) => card.is(id));
  }

  public static async findIndex(id: number): Promise<number> {
    return (await this.all()).findIndex((card) => card.is(id));
  }

  public static async all(): Promise<Card[]> {
    return Promise.resolve(this.storage);
  }

  public static async add(props: AddCardProps): Promise<Card> {
    const cards = await this.all();
    const previousCard = cards.length > 0 ? cards[cards.length - 1] : undefined;
    const newCard = new Card({
      ...props,
      id: (previousCard?.id || 0) + 1,
      isArchived: false,
      status: Status.Todo,
      phase: Phase.Prototype,
      order: 10,
    });

    this.storage = [...cards, newCard];

    return newCard;
  }

  public static async update(props: UpdateCardProps) {
    const cards = await this.all();
    const card = (await this.find(props.id))!;
    const index = await this.findIndex(props.id);

    cards[index] = new Card({ ...card, ...props });
    this.storage = [...cards];

    return cards[index];
  }

  public static async delete(card: Card) {
    const cards = await this.all();
    const remainingCards = cards.filter((c) => !c.equals(card));

    this.storage = [...remainingCards];

    return card;
  }
}
