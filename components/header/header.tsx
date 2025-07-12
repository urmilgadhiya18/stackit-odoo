import { Button } from "@/components/ui/button"
import { Logo } from "./logo"
import { SearchBar } from "./search-bar"
import { NotificationsDropdown } from "./notifications-dropdown"
import { AchievementsDropdown } from "./achievements-dropdown"
import { UserMenu } from "./user-menu"
import { CommunityNotifications } from "./community-notifications"

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-6">
            <Logo />
            <nav className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                Products
              </Button>
            </nav>
          </div>

          {/* Search Bar */}
          <SearchBar />

          {/* Right Side Icons */}
          <div className="flex items-center space-x-2">
            <CommunityNotifications />
            <NotificationsDropdown />
            <AchievementsDropdown />
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  )
}
