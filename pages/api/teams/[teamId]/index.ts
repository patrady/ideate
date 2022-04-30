import type { NextApiRequest, NextApiResponse } from "next";
import { Team, TeamMethodObject } from "../../../../models";
import { StatusCodes } from "http-status-codes";
import { ApiResponse } from "../../../../types";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Team>>
) {
  const { teamId } = req.query;
  const team = new TeamMethodObject(teamId);

  if (team.isInvalid()) {
    return res.status(StatusCodes.BAD_REQUEST).send(team.getErrors());
  }

  if (!team.exists()) {
    return res.status(StatusCodes.NOT_FOUND);
  }

  res.status(200).json(team.getValue());
}
