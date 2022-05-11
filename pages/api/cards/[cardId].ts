import type { NextApiRequest, NextApiResponse } from "next";
import { StatusCodes } from "http-status-codes";
import { CardMethodObject, Card, Controller } from "../../../models";
import { ApiResponse } from "../../../types";
import { CardRepository } from "../../../repositories";

class CardController extends Controller {
  card: CardMethodObject;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    super(req, res);

    const { cardId } = this.req.query;
    this.card = new CardMethodObject(cardId);
  }

  public call() {
    switch (this.method) {
      case "PUT":
        return this.put();
      case "DELETE":
        return this.delete();
    }
  }

  private async put() {
    if (this.card.isInvalid()) {
      return this.res
        .status(StatusCodes.BAD_REQUEST)
        .json(this.card.getErrors());
    }

    if (!this.card.exists()) {
      return this.res.status(StatusCodes.NOT_FOUND);
    }

    const card = await CardRepository.update(this.req.body);
    return this.res.status(200).json(card);
  }

  private async delete() {
    if (this.card.isInvalid()) {
      return this.res
        .status(StatusCodes.BAD_REQUEST)
        .json(this.card.getErrors());
    }

    if (!this.card.exists()) {
      return this.res.status(StatusCodes.NOT_FOUND);
    }

    const card = await this.card.getValue();
    await CardRepository.delete(card);

    this.res.status(StatusCodes.ACCEPTED).json(card);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Card>>
) {
  return await new CardController(req, res).call();
}
