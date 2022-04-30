import type { NextApiRequest, NextApiResponse } from "next";
import { ApiResponse, ApiStatus } from "../../types";

export class Controller {
  req: NextApiRequest;
  res: NextApiResponse;
  method: ApiStatus;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    this.req = req;
    this.res = res;
    this.method = req.method as ApiStatus;
  }
}
