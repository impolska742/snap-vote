"use client";

import { useState } from "react";

export default function useHasVoted(pollId: number) {
  const [hasVoted, setHasVoted] = useState(checkIfUserHasVoted());

  function checkIfUserHasVoted() {
    const hasVoted = localStorage.getItem(`voted_${pollId}`);
    return !!hasVoted;
  }

  return { hasVoted, setHasVoted };
}
