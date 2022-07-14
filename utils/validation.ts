import { NextApiResponse } from "next";

export const checkIfExists = (
  res: NextApiResponse,
  param: any,
  errorCode: number,
  message: string
) => {
  if (!param) {
    return res.status(errorCode).json({ error: message });
  }
};
