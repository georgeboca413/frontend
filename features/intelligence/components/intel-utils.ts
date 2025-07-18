export function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}

export function filterReports(reports: any[], searchTerm: string) {
  if (!searchTerm) return reports
  
  return reports.filter((report) => {
    const tags = JSON.parse(report.tags || '[]') as string[]
    return (
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reportId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  })
}
