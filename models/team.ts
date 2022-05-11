import { DocumentData, DocumentSnapshot } from "firebase/firestore";
import { Model } from "./model";

export type TeamProps = {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
};

export type AddTeamProps = Pick<TeamProps, "name" | "slug">;
export type UpdateTeamProps = Pick<TeamProps, "slug"> & UpdateableTeamProps;
export type UpdateableTeamProps = Pick<TeamProps, "name" | "isActive">;

export class Team extends Model {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;

  constructor(props: TeamProps) {
    super();

    this.id = props.id;
    this.name = props.name;
    this.slug = props.slug;
    this.isActive = props.isActive;
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

  public static for(object: DocumentSnapshot<DocumentData>) {
    return new Team({
      ...(object.data() as TeamProps),
      id: object.id,
    });
  }

  toJSON() {
    return {
      name: this.name,
      slug: this.slug,
      isActive: this.isActive,
    };
  }
}
