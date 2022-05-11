import { DocumentData, DocumentSnapshot } from "firebase/firestore";
import { Model, Team } from ".";

export type OrganizationProps = {
  id: string;
  name: string;
  isActive: boolean;
  teams: Team[];
};

export class Organization extends Model {
  id: string;
  name: string;
  isActive: boolean;
  teams: Team[];

  constructor(props: OrganizationProps) {
    super();

    this.id = props.id;
    this.name = props.name;
    this.isActive = props.isActive;
    this.teams = props.teams ? props.teams.map((t) => new Team(t)) : [];
  }

  public static for(object: DocumentSnapshot<DocumentData>) {
    return new Organization({
      ...(object.data() as OrganizationProps),
      id: object.id,
    });
  }
}
