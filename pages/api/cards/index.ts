import type { NextApiRequest, NextApiResponse } from "next";
import { Controller, Organization, Team } from "../../../models";
import { CardRepository } from "../../../repositories";

class CardsController extends Controller {
  organizationId: string;
  teamId: string;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    super(req, res);

    const { organization, team } = this.req.query;
    this.organizationId = Organization.getIdFromQuery(organization);
    this.teamId = Team.getIdFromQuery(team);
  }

  public call() {
    switch (this.method) {
      case "GET":
        return this.get();
      case "POST":
        return this.post();
    }
  }

  private async get() {
    return this.res
      .status(200)
      .json(await CardRepository.all(this.organizationId, this.teamId));
  }

  private async post() {
    const newCard = await CardRepository.add(this.req.body);
    return this.res.status(200).json(newCard);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return await new CardsController(req, res).call();
}
