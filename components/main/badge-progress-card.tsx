import { Settings } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { StatsCard } from "./stats-card"

export function BadgeProgressCard() {
  return (
    <StatsCard title="Badge progress" action={<Settings className="w-4 h-4 text-gray-400" />}>
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span>Autobiographer</span>
          <span className="text-gray-500">0/1</span>
        </div>
        <Progress value={0} className="h-2" />
        <p className="text-xs text-gray-500">Complete "About Me" section of user profile.</p>
      </div>
    </StatsCard>
  )
}
