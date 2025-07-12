import { StatsCard } from "./stats-card"

export function ReputationCard() {
  return (
    <StatsCard title="Reputation">
      <div className="text-2xl font-bold">1,247</div>
      <p className="text-xs text-gray-500 mt-1">
        Earn reputation by <span className="text-blue-600">Asking</span>,{" "}
        <span className="text-blue-600">Answering</span> & <span className="text-blue-600">Editing</span>.
      </p>
    </StatsCard>
  )
}
