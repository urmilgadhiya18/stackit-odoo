import { Settings } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { StatsCard } from "./stats-card"

export function WatchedTagsCard() {
  const tags = ["react", "javascript", "typescript"]

  return (
    <StatsCard title="Watched tags" action={<Settings className="w-4 h-4 text-gray-400" />}>
      <div className="flex flex-wrap gap-1 mb-2">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>
      <p className="text-xs text-gray-500">Customize your content by watching tags.</p>
    </StatsCard>
  )
}
