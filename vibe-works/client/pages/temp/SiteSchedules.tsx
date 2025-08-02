
export default function SiteSchedules() {
  const [selectedSite, setSelectedSite] = useState("site1");

  const handleDateCapture = (id: number, type: 'start' | 'end') => {
    const today = new Date().toISOString().split('T')[0];
    console.log(`Capturing ${type} date for activity ${id}: ${today}`);
    // Here you would update the actual data
  };

  const getStatusBadge = (item: any) => {
    if (item.actualEnd) {
      return <Badge variant="secondary" className="bg-green-100 text-green-800">Completed</Badge>;
    } else if (item.actualStart) {
      return <Badge variant="secondary" className="bg-blue-100 text-blue-800">In Progress</Badge>;
    } else {
      return <Badge variant="secondary" className="bg-gray-100 text-gray-800">Not Started</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Monthly Site Schedule
                </h1>
                <p className="text-slate-600 dark:text-slate-300">
                  Track project activities and monitor progress
                </p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Site Selection */}
        <div className="mb-8">
          <div className="flex items-center space-x-4">
            <MapPin className="h-5 w-5 text-slate-600" />
            <Select value={selectedSite} onValueChange={setSelectedSite}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select Site" />
              </SelectTrigger>
              <SelectContent>
                {sites.map((site) => (
                  <SelectItem key={site.id} value={site.id}>
                    {site.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Schedule Table */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Project Schedule</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="text-left py-3 px-4 font-medium text-slate-900 dark:text-white">Activity / Sub-activity</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-900 dark:text-white">Location</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-900 dark:text-white">Supervisor</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-900 dark:text-white">Planner</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-900 dark:text-white">Duration</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-900 dark:text-white">Planned Start</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-900 dark:text-white">Planned End</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-900 dark:text-white">Predecessor</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-900 dark:text-white">Actual Start</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-900 dark:text-white">Actual End</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-900 dark:text-white">Delay (Days)</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-900 dark:text-white">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {scheduleData.map((item) => (
                    <tr key={item.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800">
                      <td className="py-3 px-4">
                        <div className="font-medium text-slate-900 dark:text-white">{item.activity}</div>
                        <div className="text-sm text-slate-600 dark:text-slate-400 ml-4">└ {item.subActivity}</div>
                      </td>
                      <td className="py-3 px-4 text-slate-700 dark:text-slate-300">{item.location}</td>
                      <td className="py-3 px-4 text-slate-700 dark:text-slate-300">{item.supervisor}</td>
                      <td className="py-3 px-4 text-slate-700 dark:text-slate-300">{item.planner}</td>
                      <td className="py-3 px-4 text-slate-700 dark:text-slate-300">{item.duration} days</td>
                      <td className="py-3 px-4 text-slate-700 dark:text-slate-300">{item.plannedStart}</td>
                      <td className="py-3 px-4 text-slate-700 dark:text-slate-300">{item.plannedEnd}</td>
                      <td className="py-3 px-4 text-slate-700 dark:text-slate-300">{item.predecessor}</td>
                      <td className="py-3 px-4">
                        {item.actualStart ? (
                          <span className="text-slate-700 dark:text-slate-300">{item.actualStart}</span>
                        ) : (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDateCapture(item.id, 'start')}
                          >
                            Capture Start
                          </Button>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {item.actualEnd ? (
                          <span className="text-slate-700 dark:text-slate-300">{item.actualEnd}</span>
                        ) : item.actualStart ? (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDateCapture(item.id, 'end')}
                          >
                            Capture End
                          </Button>
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {item.delayDays > 0 ? (
                          <span className="text-red-600 font-medium flex items-center">
                            <AlertTriangle className="h-4 w-4 mr-1" />
                            {item.delayDays}
                          </span>
                        ) : (
                          <span className="text-green-600">0</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {getStatusBadge(item)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Performance Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Schedule Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Overall Completion</span>
                    <span className="text-sm font-bold">{performanceData.overallCompletion}%</span>
                  </div>
                  <Progress value={performanceData.overallCompletion} className="h-3" />
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-3">Supervisor Performance</h4>
                  <div className="space-y-3">
                    {performanceData.supervisorPerformance.map((supervisor) => (
                      <div key={supervisor.name} className="flex items-center justify-between">
                        <span className="text-sm text-slate-600 dark:text-slate-400">{supervisor.name}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-slate-500">{supervisor.completion}%</span>
                          <Progress value={supervisor.completion} className="w-20 h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Delay Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium mb-3">Planner-wise Average Delay</h4>
                  <div className="space-y-3">
                    {performanceData.plannerDelays.map((planner) => (
                      <div key={planner.name} className="flex items-center justify-between">
                        <span className="text-sm text-slate-600 dark:text-slate-400">{planner.name}</span>
                        <span className="text-sm font-medium">{planner.avgDelay} days</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-3">Delay Distribution</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">On Time</span>
                      <span className="font-medium">60%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">1-3 Days Late</span>
                      <span className="font-medium">25%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">&gt;3 Days Late</span>
                      <span className="font-medium">15%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
