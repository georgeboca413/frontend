import { Button } from "@/components/ui/button"

interface OpsPageHeaderProps {
  onNewOperation?: () => void
  onMissionBrief?: () => void
}

export function OpsPageHeader({ onNewOperation, onMissionBrief }: OpsPageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-wider">OPERATIONS CENTER</h1>
        <p className="text-sm text-neutral-400">Mission planning and execution oversight</p>
      </div>
      <div className="flex gap-2">
        <Button 
          className="bg-orange-500 hover:bg-orange-600 text-white"
          onClick={onNewOperation}
        >
          New Operation
        </Button>
        <Button 
          className="bg-orange-500 hover:bg-orange-600 text-white"
          onClick={onMissionBrief}
        >
          Mission Brief
        </Button>
      </div>
    </div>
  )
}
