import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";

import { MaxWidthWrapper } from "@/components/shared";
import PollOptions from "@/components/PollOptions";

export default async function PollPage({ params }: { params: { id: string } }) {
  const poll = await prisma.poll.findUnique({
    where: { id: parseInt(params.id) },
    include: {
      user: true,
      options: true,
    },
  });

  if (!poll) {
    return notFound();
  }

  const totalVotes = poll.options.reduce(
    (acc, option) => acc + option.votes,
    0
  );

  return (
    <section className="min-h-screen bg-zinc-50">
      <MaxWidthWrapper className="relative pb-24 pt-10 sm:pb-32 lg:pt-24 xl:pt-32 lg:pb-52">
        <h1 className="text-2xl font-bold mb-4 md:text-4xl lg:text-5xl text-[#11111]">
          {poll.question}
        </h1>
        <p className="text-gray-600 mb-2">Created by: {poll.user.name}</p>
        <p className="text-gray-600 mb-6">Total Votes: {totalVotes}</p>

        <PollOptions pollId={poll.id} options={poll.options} />
      </MaxWidthWrapper>
    </section>
  );
}
