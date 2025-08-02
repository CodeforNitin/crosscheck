import { Link } from "react-router-dom";
import { ArrowLeft, ShoppingCart, TrendingUp, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { ThemeToggle } from "@/components/theme-toggle";

// Dummy data for charts
const delayData = [
  { month: "Jan", prToPo: 3.5, target: 2 },
  { month: "Feb", prToPo: 4.2, target: 2 },
  { month: "Mar", prToPo: 2.8, target: 2 },
  { month: "Apr", prToPo: 5.1, target: 2 },
  { month: "May", prToPo: 3.9, target: 2 },
  { month: "Jun", prToPo: 2.3, target: 2 }
];

const siteDelayData = [
  { site: "Site A", avgDelay: 4.2, orders: 23 },
  { site: "Site B", avgDelay: 2.8, orders: 31 },
  { site: "Site C", avgDelay: 6.1, orders: 18 },
  { site: "Site D", avgDelay: 3.5, orders: 27 },
  { site: "Site E", avgDelay: 1.9, orders: 35 }
];

const prCountData = [
  { site: "Downtown Office", count: 45 },
  { site: "Residential Tower", count: 38 },
  { site: "Shopping Mall", count: 52 },
  { site: "Industrial Complex", count: 29 },
  { site: "Mixed Use Building", count: 41 }
];

const executivePerformance = [
  { name: "John Smith", value: 92, color: "#10B981" },
  { name: "Sarah Wilson", value: 88, color: "#3B82F6" },
  { name: "Mike Johnson", value: 95, color: "#8B5CF6" },
  { name: "Lisa Garcia", value: 85, color: "#F59E0B" }
];

export default function Purchase() {
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
                  Purchase Management
                </h1>
                <p className="text-slate-600 dark:text-slate-300">
                  Handle procurement and vendor management
                </p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mb-8 flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-slate-600" />
            <Select defaultValue="current">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">Current Month</SelectItem>
                <SelectItem value="last">Last Month</SelectItem>
                <SelectItem value="last3">Last 3 Months</SelectItem>
                <SelectItem value="last6">Last 6 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-slate-600" />
            <Select defaultValue="all">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select Site" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sites</SelectItem>
                <SelectItem value="site1">Downtown Office</SelectItem>
                <SelectItem value="site2">Residential Tower</SelectItem>
                <SelectItem value="site3">Shopping Mall</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ShoppingCart className="h-5 w-5" />
              <span>Purchase Analytics</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="charts" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="charts">Purchase Analytics</TabsTrigger>
                <TabsTrigger value="data">Purchase Entries</TabsTrigger>
              </TabsList>
              
              <TabsContent value="charts" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* PR to PO Delay Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">PR to PO Delay Trend</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={delayData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis label={{ value: 'Days', angle: -90, position: 'insideLeft' }} />
                          <Tooltip />
                          <Line type="monotone" dataKey="prToPo" stroke="#ef4444" strokeWidth={3} name="Actual Delay" />
                          <Line type="monotone" dataKey="target" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" name="Target" />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Site-wise Delay Orders */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Site-wise Delay Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={siteDelayData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="site" />
                          <YAxis label={{ value: 'Avg Delay (Days)', angle: -90, position: 'insideLeft' }} />
                          <Tooltip />
                          <Bar dataKey="avgDelay" fill="#f59e0b" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Site-wise PR Count */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Site-wise PR Raised Count</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={prCountData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="site" />
                          <YAxis label={{ value: 'PR Count', angle: -90, position: 'insideLeft' }} />
                          <Tooltip />
                          <Bar dataKey="count" fill="#3b82f6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Purchase Executive Performance */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Purchase Executive Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={executivePerformance}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, value }) => `${name}: ${value}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {executivePerformance.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="data" className="mt-6">
                <div className="text-center py-12">
                  <ShoppingCart className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                    Purchase Data Table
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    This section will contain purchase entries with fields like Item, Quantity, Vendor, Date, and Amount.
                  </p>
                  <p className="text-sm text-slate-500">
                    Continue prompting to have this page fully implemented with the purchase management functionality.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
