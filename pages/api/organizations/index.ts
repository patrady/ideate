import type { NextApiRequest, NextApiResponse } from "next";
import { Organization } from "../../../models";
import { OrganizationRepository } from "../../../repositories";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Organization[]>
) {
  return res.status(200).json(await OrganizationRepository.all());
}
