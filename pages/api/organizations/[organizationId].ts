import type { NextApiRequest, NextApiResponse } from "next";
import { Organization, OrganizationMethodObject } from "../../../models";
import { StatusCodes } from "http-status-codes";
import { ApiResponse } from "../../../types";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Organization>>
) {
  const { organizationId } = req.query;
  const organiation = new OrganizationMethodObject(organizationId);

  if (!organiation.isValid()) {
    return res.status(StatusCodes.BAD_REQUEST).send(organiation.getErrors());
  }

  if (!organiation.exists()) {
    return res.status(StatusCodes.NOT_FOUND);
  }

  res.status(200).json(organiation.getValue());
}
