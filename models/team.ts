import { Card } from ".";
import { CardProps } from "./card";
import { Model } from "./model";

export type TeamProps = {
  id: number;
  name: string;
  slug: string;
  isActive: boolean;
  cards: CardProps[];
};

export type AddTeamProps = Pick<TeamProps, "name" | "slug">;
export type UpdateTeamProps = Pick<TeamProps, "slug"> & UpdateableTeamProps;
export type UpdateableTeamProps = Pick<TeamProps, "name" | "isActive">;

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
    this.cards = props.cards ? props.cards.map((c) => new Card(c)) : [];
  }

  public override is(team: number | string | Team) {
    if (typeof team == "string" || typeof team === "number") {
      return this.slug === team;
    }

    return this.slug === team.slug;
  }

  static sort(a: Team, b: Team) {
    return a.name.localeCompare(b.name);
  }

  toJSON() {
    return {
      name: this.name,
      slug: this.slug,
      isActive: this.isActive,
      cards: this.cards.map((c) => c.toJSON()),
    };
  }
}
