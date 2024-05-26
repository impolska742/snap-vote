import prisma from "@/lib/prisma";

import { MaxWidthWrapper } from "@/components/shared";
import Poll from "@/components/Poll";

export default async function Home() {
  const polls = await prisma.poll.findMany({
    include: {
      user: true,
      options: true,
    },
  });

  return (
    <section className="min-h-screen bg-zinc-50">
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
