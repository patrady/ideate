import { Team, TeamProps } from "../../models";
import { ApiClient } from "./apiClient";
import { TeamNotFound } from "./errors";

export class TeamSdk {
  private static client = new ApiClient();

  public static async getBySlug(slug: string) {
    try {
      const team = await this.client.get<TeamProps>(`/api/teams/${slug}`);
      console.log("team from api", team);

      return new Team(team);
    } catch (error) {
      console.log(error);
      throw new TeamNotFound();
    }
  }
}
