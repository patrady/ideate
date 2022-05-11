import { DocumentData, DocumentSnapshot } from "firebase/firestore";
import { Model } from "./model";

export type TeamProps = {
  id: string;
  name: string;
  isActive: boolean;
};

export type AddTeamProps = Pick<TeamProps, "name"> & { slug: string };
export type UpdateTeamProps = Pick<TeamProps, "id"> & UpdateableTeamProps;
export type UpdateableTeamProps = Pick<TeamProps, "name" | "isActive">;

export class Team extends Model {
  id: string;
  name: string;
  isActive: boolean;

  constructor(props: TeamProps) {
    super();

    this.id = props.id;
    this.name = props.name;
    this.isActive = props.isActive;
  }

  public override is(team: number | string | Team) {
    if (typeof team == "string" || typeof team === "number") {
      return this.id === team;
    }

    return this.id === team.id;
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
}
