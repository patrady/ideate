import { AddTeamProps, UpdateTeamProps } from "../models";
import { CardRepository } from "./cardRepository";
import { Team } from '../models/team'

export class TeamsRepository {
  static storage: Team[] = [
    new Team({
      id: 1,
      name: "Campfire Squad",
      slug: "campfire-squad",
      isActive: true,
      cards: CardRepository.storage,
    }),
    new Team({
      id: 2,
      name: "Dark Mode",
      slug: "dark-mode",
      isActive: true,
      cards: CardRepository.storage,
    }),
    new Team({
      id: 3,
      name: "Acquisition Team",
      slug: "acquisition-team",
      isActive: false,
      cards: CardRepository.storage,
    }),
  ];

  public static contains(slug: string) {
    return this.find(slug) !== undefined;
  }

  public static async find(slug: string | number): Promise<Team | undefined> {
    return (await this.all()).find((team) => team.is(slug));
  }

  public static async findIndex(id: number): Promise<number> {
    return (await this.all()).findIndex((card) => card.is(id));
  }

  public static async add(props: AddTeamProps): Promise<Team> {
    const teams = await this.all();

    const newTeam = new Team({
      ...props,
      id: 1,
      isActive: true,
      cards: [],
    });

    this.storage = [...teams, newTeam];

    return newTeam;
  }

  public static async update(props: UpdateTeamProps) {
    const teams = await this.all();
    const team = (await this.find(props.id))!;
    const index = await this.findIndex(props.id);

    teams[index] = new Team({ ...team, ...props });
    this.storage = [...teams];

    return teams[index];
  }

  public static all(): Promise<Team[]> {
    return Promise.resolve(this.storage);
  }
}
