import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { database } from "../db";
import { AddCardProps, Card, UpdateCardProps } from "../models";
import { Phase, Status } from "../types";

export class CardRepository {
  static storage: Card[] = [];

  public static contains(id: string) {
    return this.find(id) !== undefined;
  }

  public static async find(id: string): Promise<Card | undefined> {
    const card = await getDoc(doc(database, "cards", id));
    if (!card.exists()) {
      return undefined;
    }

    return Card.for(card);
  }

  public static async all(
    organizationSlug: string,
    teamSlug: string
  ): Promise<Card[]> {
    const cards = await getDocs(
      query(
        collection(database, "cards"),
        where("organizationSlug", "==", organizationSlug),
        where("teamSlug", "==", teamSlug)
      )
    );

    return cards.docs.map((card) => Card.for(card));
  }

  public static async add(props: AddCardProps): Promise<Card> {
    const cardRef = await addDoc(collection(database, "cards"), {
      ...props,
      isArchived: false,
      status: Status.Todo,
      phase: Phase.Prototype,
      order: 0,
    });

    return Card.for(await getDoc(cardRef));
  }

  public static async update(props: UpdateCardProps) {
    const { id, ...rest } = props;

    await updateDoc(doc(database, "cards", props.id), { ...rest });

    return await this.find(id);
  }

  public static async delete(card: Card) {
    await deleteDoc(doc(database, "cards", card.id));
  }
}
