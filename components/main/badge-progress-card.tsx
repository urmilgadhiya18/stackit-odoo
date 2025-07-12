import { Settings } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { StatsCard } from "./stats-card"
import {Avatar, AvatarFallback} from "@/components/ui/avatar";

export function BadgeProgressCard() {
  return (
    <StatsCard title="Badge progress">
      <div className="space-y-2">
        <div className="flex flex-col items-start justify-between text-sm gap-4">

            <Avatar>
                <AvatarFallback className="bg-blue-500 text-white">A</AvatarFallback>
            </Avatar>
            <span>Autobiographer</span>
        </div>
      </div>
    </StatsCard>
  )
}
