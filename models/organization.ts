import { Model, Team } from ".";

export type OrganizationProps = {
  id: number;
  name: string;
  slug: string;
  isActive: boolean;
  teams: Team[];
};

export class Organization extends Model {
  id: number;
  name: string;
  slug: string;
  isActive: boolean;
  teams: Team[];

  constructor(props: OrganizationProps) {
    super();

    this.id = props.id;
    this.name = props.name;
    this.slug = props.slug;
    this.isActive = props.isActive;
    this.teams = props.teams.map((t) => new Team(t));
  }

  public override is(slug: number | string) {
    return this.slug === slug;
  }
}
