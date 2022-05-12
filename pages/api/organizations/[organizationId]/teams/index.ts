import type { NextApiRequest, NextApiResponse } from "next";
import { Controller, OrganizationMethodObject } from "../../../../../models";
import { StatusCodes } from "http-status-codes";
import { TeamsRepository } from "../../../../../repositories";

class TeamsController extends Controller {
  private organization: OrganizationMethodObject;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    super(req, res);

    const { organizationId } = req.query;
    this.organization = new OrganizationMethodObject(organizationId);
  }

  public call() {
    switch (this.method) {
      case "GET":
        return this.get();
      case "POST":
        return this.addTeam();
    }
  }

  private async get() {
    if (this.organization.isInvalid()) {
      return this.res
        .status(StatusCodes.BAD_REQUEST)
        .send(this.organization.getErrors());
    }

    if (!this.organization.exists()) {
      return this.res.status(StatusCodes.NOT_FOUND);
    }

    return this.res
      .status(200)
      .json(await TeamsRepository.all(this.organization.getId()));
  }

  private async addTeam() {
    if (!this.organization.exists()) {
      return this.res.status(StatusCodes.NOT_FOUND);
    }

    const newTeam = await TeamsRepository.add(
      await this.organization.getValue()!,
      this.req.body
    );
    return this.res.status(200).json(newTeam);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return await new TeamsController(req, res).call();
}
