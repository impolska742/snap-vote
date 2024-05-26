type BarChartProps = {
  optionText?: string;
  votes: number;
  totalVotes: number;
};

export default function BarChartBar({
  optionText,
  votes,
  totalVotes,
}: BarChartProps) {
  const percentage = totalVotes > 0 ? (votes / totalVotes) * 100 : 0;

  return (
    <div className="flex flex-col gap-1">
      {optionText && (
        <div className="flex w-full justify-between">
          <p className="text-lg">{optionText}</p>
          <p className="text-gray-500">{votes} Votes</p>
        </div>
      )}
      <div className="bg-gray-200 h-4 rounded overflow-hidden">
        <div
          className="bg-blue-500 h-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
