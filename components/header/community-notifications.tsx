import { Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function CommunityNotifications() {
  return (
    <Button variant="ghost" size="sm" className="relative">
      <Users className="w-4 h-4" />
      <Badge className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center p-0">
        1
      </Badge>
    </Button>
  )
}
