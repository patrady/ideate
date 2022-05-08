import {
  AddTeamProps,
  Organization,
  Team,
  TeamProps,
  UpdateableTeamProps,
} from "../../models";
import { ApiClient } from "./apiClient";
import { TeamNotFound } from "./errors";

export class TeamSdk {
  private client = new ApiClient();

  public async getByOrganization(organization: Organization) {
    try {
      const teams = await this.client.get<TeamProps[]>(
        `/api/organizations/${organization.slug}/teams`
      );

      return teams.map((team) => new Team(team));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async getBySlug(organization: Organization, slug: string) {
    try {
      const team = await this.client.get<TeamProps>(
        `/api/organizations/${organization.slug}/teams/${slug}`
      );

      return new Team(team);
    } catch (error) {
      console.log(error);
      throw new TeamNotFound();
    }
  }

  public async add(organization: Organization, teamProps: AddTeamProps) {
    try {
      const team = await this.client.post<TeamProps>(
        `/api/organizations/${organization.slug}/teams`,
        teamProps
      );

      return new Team(team);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async update(
    organization: Organization,
    team: Team,
    values: UpdateableTeamProps
  ) {
    try {
      const updatedTeam = await this.client.put<TeamProps>(
        `/api/organizations/${organization.slug}/teams/${team.slug}`,
        values
      );

      return new Team({ ...team, ...values });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
