import { type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
  className?: string
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <Card className={cn("p-6", className)}>
      <div className="flex flex-col items-center justify-center text-center py-6 px-4">
        <Icon className="h-12 w-12 text-muted-foreground/40 mb-4" />
        <h3 className="text-lg font-medium mb-2">{title}</h3>
        <p className="text-muted-foreground mb-6 max-w-sm">{description}</p>
        {actionLabel && onAction && (
          <Button onClick={onAction} className="w-full sm:w-auto">
            {actionLabel}
          </Button>
        )}
      </div>
    </Card>
  )
}
