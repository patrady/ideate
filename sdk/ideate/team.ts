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

  public async getBySlug(slug: string) {
    try {
      const team = await this.client.get<TeamProps>(`/api/teams/${slug}`);

      return new Team(team);
    } catch (error) {
      console.log(error);
      throw new TeamNotFound();
    }
  }

  public async add(organization: Organization, teamProps: AddTeamProps) {
    try {
      const team = await this.client.post<TeamProps>(
        `/api/organizations/${organization.slug}`,
        teamProps
      );

      return new Team(team);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async update(team: Team, values: UpdateableTeamProps) {
    try {
      const updatedTeam = await this.client.put<TeamProps>(
        `/api/teams/${team.slug}`,
        values
      );

      return new Team(updatedTeam);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
