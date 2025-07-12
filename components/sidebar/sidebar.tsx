import { Home, MessageSquare, Tag, Bookmark, Zap, MessageCircle, FileText, Users, Building2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { NavigationItem } from "./navigation-item"

export function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen sticky top-14">
      <nav className="p-4 space-y-1">
        <NavigationItem icon={<Home />} label="Home" isActive />
        <NavigationItem icon={<MessageSquare />} label="Questions" />
        <NavigationItem icon={<Tag />} label="Tags" />
        <NavigationItem icon={<Bookmark />} label="Saves" />
        <NavigationItem icon={<Zap />} label="Challenges" badge="NEW" badgeVariant="default" />
        <NavigationItem icon={<MessageCircle />} label="Chat" />
        <NavigationItem icon={<FileText />} label="Articles" />
        <NavigationItem icon={<Users />} label="Users" />
        <NavigationItem icon={<Building2 />} label="Companies" />

        <Separator className="my-4" />

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">COLLECTIVES</span>
            <Button variant="ghost" size="sm" className="w-6 h-6 p-0">
              <Plus className="w-3 h-3" />
            </Button>
          </div>
          <p className="text-xs text-gray-500">Communities for your favorite technologies.</p>
        </div>

      </nav>
    </aside>
  )
}
