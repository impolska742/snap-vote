import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

import Poll from "@/components/Poll";
import { MaxWidthWrapper } from "@/components/shared";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import User from "./user";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const polls = await prisma.poll.findMany({
    include: {
      user: true,
      options: true,
    },
  });

  return (
    <section className="min-h-screen bg-zinc-50">
      <h2>Server Session</h2>
      <pre>{JSON.stringify(session)}</pre>
      <h2>Client Session</h2>
      <User />
      <MaxWidthWrapper className="relative pb-24 pt-10 sm:pb-32 lg:pt-24 xl:pt-32 lg:pb-52">
        <h1 className="text-2xl font-bold md:text-4xl lg:text-5xl text-[#11111] mb-8">
          Polls
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6">
          {polls.map((poll) => (
            <Poll key={poll.id} poll={poll} />
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
