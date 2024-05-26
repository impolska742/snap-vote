"use client";

import { Button } from "./shared";

interface VoteButtonProps {
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
}

export default function VoteButton({
  onClick,
  disabled,
  children,
}: VoteButtonProps) {
  return (
    <Button onClick={onClick} disabled={disabled}>
      {children}
    </Button>
  );
}
