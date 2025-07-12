import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface NavigationItemProps {
  icon: ReactNode
  label: string
  isActive?: boolean
  badge?: string
  badgeVariant?: "default" | "secondary" | "destructive" | "outline"
}

export function NavigationItem({
  icon,
  label,
  isActive = false,
  badge,
  badgeVariant = "default",
}: NavigationItemProps) {
  return (
    <Button
      variant="ghost"
      className={`w-full justify-start ${isActive ? "bg-orange-50 text-orange-600 hover:bg-orange-100" : ""}`}
    >
      <span className="w-4 h-4 mr-3">{icon}</span>
      <span>{label}</span>
      {badge && (
        <Badge className={`ml-auto text-xs ${badgeVariant === "default" ? "bg-blue-100 text-blue-800" : ""}`}>
          {badge}
        </Badge>
      )}
    </Button>
  )
}
