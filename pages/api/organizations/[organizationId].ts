import type { NextApiRequest, NextApiResponse } from "next";
import {
  Controller,
  Organization,
  OrganizationMethodObject,
} from "../../../models";
import { StatusCodes } from "http-status-codes";
import { ApiResponse } from "../../../types";
import { TeamsRepository } from "../../../repositories";

class OrganizationController extends Controller {
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

    this.res.status(200).json(await this.organization.getValue());
  }

  private async addTeam() {
    const newTeam = await TeamsRepository.add(this.req.body);
    return this.res.status(200).json(newTeam);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Organization>>
) {
  return await new OrganizationController(req, res).call();
}
