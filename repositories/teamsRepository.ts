import { AddTeamProps, Organization, UpdateTeamProps, Team } from "../models";
import { database } from "../db";
import {
  doc,
  updateDoc,
  collection,
  getDocs,
  setDoc,
  getDoc,
} from "firebase/firestore";

export class TeamsRepository {
  public static contains(organizationId: string, id: string) {
    return this.find(organizationId, id) !== undefined;
  }

  public static async find(
    organizationId: string,
    id: string
  ): Promise<Team | undefined> {
    const team = await getDoc(
      doc(database, "organizations", organizationId, "teams", id)
    );
    if (!team.exists()) {
      return undefined;
    }

    return Team.for(team);
  }

  public static async add(
    organization: Organization,
    props: AddTeamProps
  ): Promise<Team> {
    const team = new Team({
      id: props.slug,
      name: props.name,
      isActive: true,
    });

    await setDoc(
      doc(database, "organizations", organization.id, "teams", props.slug),
      { ...props, isActive: true }
    );

    return team;
  }

  public static async update(
    organizationId: string,
    team: Team,
    teamProps: UpdateTeamProps
  ) {
    await updateDoc(
      doc(database, "organizations", organizationId, "teams", team.id),
      {
        name: teamProps.name,
        isActive: teamProps.isActive,
      }
    );

    return this.find(organizationId, team.id);
  }

  public static async all(organizationId: string): Promise<Team[]> {
    const teams = await getDocs(
      collection(database, "organizations", organizationId, "teams")
    );

    return teams.docs.map((team) => Team.for(team));
  }
}
