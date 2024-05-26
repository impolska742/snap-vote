import Link from "next/link";

import { Poll as PollType } from "@/types";
import BarChartBar from "./BarChartBar";

interface PollProps {
  poll: PollType;
}

export default function Poll({ poll }: PollProps) {
  const totalVotes = poll.options.reduce(
    (acc, option) => acc + option.votes,
    0
  );

  return (
    <Link
      href={`/poll/${poll.id}`}
      className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 active:scale-[0.99]"
    >
      <h1 className="block text-xl font-semibold mb-2 text-blue-600 hover:underline">
        {poll.question}
      </h1>
      <p className="text-gray-600">Created by: {poll.user.name}</p>
      <p className="text-gray-600 mb-4">Total Votes: {totalVotes}</p>
      <ul className="list-disc flex flex-col list-inside gap-2">
        {poll.options.map((option) => (
          <BarChartBar
            key={option.id}
            optionText={option.text}
            votes={option.votes}
            totalVotes={totalVotes}
          />
        ))}
      </ul>
    </Link>
  );
}
