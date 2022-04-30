import type { NextApiRequest, NextApiResponse } from "next";
import { Team, TeamMethodObject } from "../../../../models";
import { StatusCodes } from "http-status-codes";
import { ApiResponse } from "../../../../types";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Team>>
) {
  const { teamId } = req.query;
  console.log(`called /api/teams/${teamId}`);
  const team = new TeamMethodObject(teamId);

  if (!team.isValid()) {
    return res.status(StatusCodes.BAD_REQUEST).send(team.getErrors());
  }

  if (!team.exists()) {
    return res.status(StatusCodes.NOT_FOUND);
  }

  res.status(200).json(team.getValue());
}
