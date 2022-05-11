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
        `/api/organizations/${organization.id}/teams`
      );

      return teams.map((team) => new Team(team));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async getById(organization: Organization, id: string) {
    try {
      const team = await this.client.get<TeamProps>(
        `/api/organizations/${organization.id}/teams/${id}`
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
        `/api/organizations/${organization.id}/teams`,
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
        `/api/organizations/${organization.id}/teams/${team.id}`,
        values
      );

      return new Team(updatedTeam);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
