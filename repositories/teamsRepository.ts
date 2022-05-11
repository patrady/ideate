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
  public static contains(organizationSlug: string, slug: string) {
    return this.find(organizationSlug, slug) !== undefined;
  }

  public static async find(
    organizationSlug: string,
    slug: string
  ): Promise<Team | undefined> {
    const team = await getDoc(
      doc(database, "organizations", organizationSlug, "teams", slug)
    );
    if (!team.exists()) {
      return undefined;
    }

    const cards = await getDocs(
      collection(
        database,
        "organizations",
        organizationSlug,
        "teams",
        slug,
        "cards"
      )
    );

    return Team.for(team);
  }

  public static async add(
    organization: Organization,
    props: AddTeamProps
  ): Promise<Team> {
    const team = new Team({
      id: props.slug,
      name: props.name,
      slug: props.slug,
      isActive: true,
    });

    await setDoc(
      doc(database, "organizations", organization.slug, "teams", props.slug),
      team.toJSON()
    );

    return team;
  }

  public static async update(
    organizationSlug: string,
    team: Team,
    teamProps: UpdateTeamProps
  ) {
    await updateDoc(
      doc(database, "organizations", organizationSlug, "teams", team.slug),
      {
        name: teamProps.name,
        isActive: teamProps.isActive,
      }
    );

    return this.find(organizationSlug, team.id);
  }

  public static async all(organizationSlug: string): Promise<Team[]> {
    const teams = await getDocs(
      collection(database, "organizations", organizationSlug, "teams")
    );

    return teams.docs.map((team) => Team.for(team));
  }
}
