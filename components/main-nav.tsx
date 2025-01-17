import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Grid2X2, History, Settings, HelpCircle, LayoutGrid, FileSpreadsheet, Database } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {
  isCollapsed: boolean
}

export function MainNav({ className, isCollapsed }: MainNavProps) {
  const items = [
    {
      title: "Dashboard",
      icon: Grid2X2,
      href: "#",
    },
    {
      title: "Spreadsheets",
      icon: FileSpreadsheet,
      href: "#",
      isActive: true,
    },
    {
      title: "Data Sources",
      icon: Database,
      href: "#",
    },
    {
      title: "Templates",
      icon: LayoutGrid,
      href: "#",
    },
    {
      title: "History",
      icon: History,
      href: "#",
    },
    {
      title: "Settings",
      icon: Settings,
      href: "#",
    },
    {
      title: "Help & Support",
      icon: HelpCircle,
      href: "#",
    },
  ]

  return (
    <div
      data-collapsed={isCollapsed}
      className={cn(
        "group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2",
        className
      )}
    >
      <nav className="grid gap-1 px-2">
        {items.map((item, index) => (
          <Tooltip key={index} delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                variant={item.isActive ? "secondary" : "ghost"}
                asChild
                className={cn(
                  "w-full justify-start",
                  isCollapsed && "h-12 w-12 justify-center p-0"
                )}
              >
                <a href={item.href}>
                  <item.icon className={cn("h-4 w-4", item.isActive && "mr-2")} />
                  {!isCollapsed && <span>{item.title}</span>}
                </a>
              </Button>
            </TooltipTrigger>
            {isCollapsed && (
              <TooltipContent side="right" className="flex items-center gap-4">
                {item.title}
              </TooltipContent>
            )}
          </Tooltip>
        ))}
      </nav>
    </div>
  )
}

