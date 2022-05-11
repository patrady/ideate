import {
  AddTeamProps,
  Card,
  CardProps,
  Organization,
  UpdateTeamProps,
} from "../models";
import { Team, TeamProps } from "../models";
import {
  doc,
  updateDoc,
  collection,
  getDocs,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { database } from "../db";

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

    return new Team({
      ...(team.data() as TeamProps),
      cards: cards.docs.map((card) => card.data() as CardProps),
    });
  }

  public static async add(
    organization: Organization,
    props: AddTeamProps
  ): Promise<Team> {
    const team = new Team({
      id: 0,
      name: props.name,
      slug: props.slug,
      isActive: true,
      cards: [],
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

    return new Team({ ...team, ...teamProps });
  }

  public static async all(organizationSlug: string): Promise<Team[]> {
    const teams = await getDocs(
      collection(database, "organizations", organizationSlug, "teams")
    );

    return teams.docs.map((o) => new Team(o.data() as TeamProps));
  }
}
