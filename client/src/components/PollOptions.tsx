"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";

import useHasVoted from "@/hooks/useHasVoted";
import { Option } from "@/types";
import BarChartBar from "./BarChartBar";
import { Button } from "./shared";

interface PollOptionsProps {
  pollId: number;
  options: Option[];
}

// const socket = io("http://localhost:8080");

export default function PollOptions({ pollId, options }: PollOptionsProps) {
  const { hasVoted, setHasVoted } = useHasVoted(pollId);

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [optionVotes, setOptionVotes] = useState<{ [key: number]: number }>(
    options.reduce((acc, option) => ({ ...acc, [option.id]: option.votes }), {})
  );

  const totalVotes = Object.entries(optionVotes).reduce(
    (total, [option_id, votes]) => total + votes,
    0
  );

  const [isVoting, setIsVoting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   socket.on(
  //     "update-votes",
  //     (updatedPollId: number, optionId: number, votes: number) => {
  //       if (updatedPollId === pollId) {
  //         setOptionVotes((prevOptionVotes) => ({
  //           ...prevOptionVotes,
  //           [optionId]: votes,
  //         }));
  //       }
  //     }
  //   );

  //   return () => {
  //     socket.off("update-votes");
  //   };
  // }, [pollId]);

  const handleVote = async (optionId: number) => {
    if (hasVoted) {
      setError("You have already voted in this poll.");
      return;
    }

    setIsVoting(true);
    try {
      // socket.emit("vote", pollId, optionId, optionVotes[optionId] + 1);
      await axios.post(`/api/poll/${pollId}/vote`, { optionId });
    } catch (error) {
      setError("Failed to vote. Please try again.");
      console.error("Error voting:", error);
    } finally {
      const updatedOptionVotes = {
        ...optionVotes,
        [optionId]: optionVotes[optionId] + 1,
      };
      setHasVoted(true);
      localStorage.setItem(`voted_${pollId}`, "true");
      setOptionVotes(updatedOptionVotes);
      setIsVoting(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <ul>
        {options.map((option) => (
          <li key={option.id} className="mb-4">
            <label className="flex items-center mb-2">
              <input
                type="radio"
                value={option.id}
                checked={selectedOption === option.id}
                onChange={() => setSelectedOption(option.id)}
                className="mr-2"
              />
              <span className="text-lg">{option.text}</span>
              <span className="text-gray-500 ml-2">
                ({optionVotes[option.id]} votes)
              </span>
            </label>
            <BarChartBar
              votes={optionVotes[option.id]}
              totalVotes={totalVotes}
            />
          </li>
        ))}
      </ul>

      <Button
        onClick={() => selectedOption && handleVote(selectedOption)}
        disabled={selectedOption === null || isVoting || hasVoted}
      >
        {hasVoted
          ? "You've already voted for this poll"
          : isVoting
          ? "Voting..."
          : "Vote"}
      </Button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
