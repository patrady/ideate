import { Card } from ".";
import { Model } from "./model";

export type TeamProps = {
  id: number;
  name: string;
  slug: string;
  isActive: boolean;
  cards: Card[];
};

export class Team extends Model {
  id: number;
  name: string;
  slug: string;
  isActive: boolean;
  cards: Card[];

  constructor(props: TeamProps) {
    super();

    this.id = props.id;
    this.name = props.name;
    this.slug = props.slug;
    this.isActive = props.isActive;
    this.cards = props.cards.map((c) => new Card(c));
  }

  public override is(slug: number | string) {
    return this.slug === slug;
  }
}
