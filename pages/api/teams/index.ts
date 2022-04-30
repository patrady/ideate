import type { NextApiRequest, NextApiResponse } from "next";
import { Team } from "../../../models";
import { TeamsRepository } from "../../../repositories";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Team[]>
) {
  res.status(200).json(TeamsRepository.all());
}
