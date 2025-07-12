import { Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function AchievementsDropdown() {
  const achievements = [
    {
      name: "Nice Answer",
      description: "Answer score of 10 or more",
      color: "bg-yellow-500",
    },
    {
      name: "Student",
      description: "First question with score of 1 or more",
      color: "bg-gray-400",
    },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Trophy className="w-4 h-4" />
          <Badge className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center p-0">
            {achievements.length}
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Recent Achievements</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {achievements.map((achievement, index) => (
          <DropdownMenuItem key={index}>
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 ${achievement.color} rounded-full flex items-center justify-center`}>
                <Trophy className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-medium">{achievement.name}</span>
                <span className="text-sm text-gray-500">{achievement.description}</span>
              </div>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
