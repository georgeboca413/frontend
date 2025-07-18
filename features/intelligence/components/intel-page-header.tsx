import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"

interface IntelPageHeaderProps {
  onNewReport?: () => void
  onFilter?: () => void
}

export function IntelPageHeader({ onNewReport, onFilter }: IntelPageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-wider">INTELLIGENCE CENTER</h1>
        <p className="text-sm text-neutral-400">Classified reports and threat analysis</p>
      </div>
      <div className="flex gap-2">
        <Button 
          className="bg-orange-500 hover:bg-orange-600 text-white"
          onClick={onNewReport}
        >
          New Report
        </Button>
        <Button 
          className="bg-orange-500 hover:bg-orange-600 text-white"
          onClick={onFilter}
        >
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>
    </div>
  )
}
