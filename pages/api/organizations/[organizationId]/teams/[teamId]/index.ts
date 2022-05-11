import type { NextApiRequest, NextApiResponse } from "next";
import { StatusCodes } from "http-status-codes";
import { Controller, Team, TeamMethodObject } from "../../../../../../models";
import { ApiResponse } from "../../../../../../types";
import { TeamsRepository } from "../../../../../../repositories";

class TeamController extends Controller {
  private team: TeamMethodObject;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    super(req, res);

    const { organizationId, teamId } = req.query;
    this.team = new TeamMethodObject(teamId, organizationId);
  }

  public call() {
    switch (this.method) {
      case "GET":
        return this.get();
      case "PUT":
        return this.put();
    }
  }

  private async get() {
    if (this.team.isInvalid()) {
      return this.res
        .status(StatusCodes.BAD_REQUEST)
        .send(this.team.getErrors());
    }

    if (!this.team.exists()) {
      return this.res.status(StatusCodes.NOT_FOUND);
    }

    this.res.status(200).json(await this.team.getValue());
  }

  private async put() {
    if (this.team.isInvalid()) {
      return this.res
        .status(StatusCodes.BAD_REQUEST)
        .json(this.team.getErrors());
    }

    if (!this.team.exists()) {
      return this.res.status(StatusCodes.NOT_FOUND);
    }

    const team = await TeamsRepository.update(
      this.team.getOrganizationId(),
      await this.team.getValue(),
      this.req.body
    );

    return this.res.status(200).json(team);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Team>>
) {
  return await new TeamController(req, res).call();
}
