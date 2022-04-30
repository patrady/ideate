import type { NextApiRequest, NextApiResponse } from "next";
import { Organization } from "../../../models";
import { OrganizationRepository } from "../../../repositories";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Organization[]>
) {
  res.status(200).json(OrganizationRepository.all());
}
