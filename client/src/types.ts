type Option = {
  id: number;
  text: string;
  votes: number;
};

type User = {
  id: number;
  name: string;
};

type Poll = {
  id: number;
  question: string;
  endTime: Date | null;
  userId: number;
  createdAt: Date;
  user: User;
  options: Option[];
};

export type { Option, User, Poll };
