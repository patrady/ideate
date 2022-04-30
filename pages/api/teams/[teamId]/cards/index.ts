import type { NextApiRequest, NextApiResponse } from "next";
import { StatusCodes } from "http-status-codes";
import { Card, Controller, TeamMethodObject } from "../../../../../models";
import { ApiResponse } from "../../../../../types";
import { CardRepository } from "../../../../../repositories";

class CardsController extends Controller {
  team: TeamMethodObject;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    super(req, res);

    const { teamId } = this.req.query;
    this.team = new TeamMethodObject(teamId);
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
    if (!this.team.isValid()) {
      return this.res
        .status(StatusCodes.BAD_REQUEST)
        .json(this.team.getErrors());
    }

    if (!this.team.exists()) {
      return this.res.status(StatusCodes.NOT_FOUND);
    }

    return this.res.status(200).json(this.team.getValue().cards);
  }

  private async post() {
    const newCard = await CardRepository.add(this.req.body);
    return this.res.status(200).json(newCard);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Card>>
) {
  return await new CardsController(req, res).call();
}
