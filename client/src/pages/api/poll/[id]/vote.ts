import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { optionId } = req.body;

    try {
      await prisma.option.update({
        where: { id: optionId },
        data: {
          votes: { increment: 1 },
        },
      });

      res.status(200).json({ message: "Vote recorded" });
    } catch (error) {
      res.status(500).json({ error: "Error recording vote" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
