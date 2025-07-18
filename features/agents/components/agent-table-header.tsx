import { AGENT_TABLE_HEADERS_CONFIG } from "../config/agent-config"

export function AgentTableHeader() {
  return (
    <thead>
      <tr className="border-b border-neutral-700">
        {AGENT_TABLE_HEADERS_CONFIG.map((header) => (
          <th key={header} className="text-left py-3 px-4 text-xs font-medium text-neutral-400 tracking-wider">
            {header}
          </th>
        ))}
      </tr>
    </thead>
  )
}
