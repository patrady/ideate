import { Team } from "../models";

export class TeamsDecorator {
  constructor(public teams: Team[]) {}

  public get items() {
    return this.teams;
  }

  public add(team: Team) {
    return new TeamsDecorator([...this.items, team]);
  }

  public update(team: Team) {
    const index = this.findIndex(team);
    this.items[index] = team;

    return new TeamsDecorator([...this.items]);
  }

  public sort() {
    return this.items.sort(Team.sort);
  }

  public remove(card: Team) {
    return new TeamsDecorator(this.items.filter((i) => !i.is(card)));
  }

  public find(id: number | Team): Team | undefined {
    return this.items[this.findIndex(id)];
  }

  private findIndex(card: Team | number) {
    return this.items.findIndex((i) => i.is(card));
  }
}
