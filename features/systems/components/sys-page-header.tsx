import { Button } from "@/components/ui/button"

interface SysPageHeaderProps {
  onSystemMaintenance?: () => void
  onAddSystem?: () => void
}

export function SysPageHeader({ onSystemMaintenance, onAddSystem }: SysPageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-wider">SYSTEMS MONITOR</h1>
        <p className="text-sm text-neutral-400">Infrastructure health and maintenance oversight</p>
      </div>
      <div className="flex gap-2">
        <Button 
          className="bg-orange-500 hover:bg-orange-600 text-white"
          onClick={onAddSystem}
        >
          Add System
        </Button>
        <Button 
          className="bg-orange-500 hover:bg-orange-600 text-white"
          onClick={onSystemMaintenance}
        >
          Schedule Maintenance
        </Button>
      </div>
    </div>
  )
}
