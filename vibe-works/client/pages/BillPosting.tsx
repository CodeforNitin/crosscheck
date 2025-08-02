import { Link } from "react-router-dom";
import { ArrowLeft, FileText, BarChart3, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import { ThemeToggle } from "@/components/theme-toggle";

// Dummy data for charts
const monthlyBillData = [
  { month: "Jan", processed: 45, pending: 12, amount: 2.5 },
  { month: "Feb", processed: 52, pending: 8, amount: 3.2 },
  { month: "Mar", processed: 38, pending: 15, amount: 2.8 },
  { month: "Apr", processed: 61, pending: 6, amount: 4.1 },
  { month: "May", processed: 49, pending: 11, amount: 3.6 },
  { month: "Jun", processed: 55, pending: 9, amount: 3.9 }
];

const siteWiseBills = [
  { site: "Site A", processed: 28, pending: 5, totalAmount: 1.8 },
  { site: "Site B", processed: 35, pending: 3, totalAmount: 2.4 },
  { site: "Site C", processed: 22, pending: 8, totalAmount: 1.5 },
  { site: "Site D", processed: 41, pending: 2, totalAmount: 3.1 },
  { site: "Site E", processed: 19, pending: 6, totalAmount: 1.3 }
];

const vendorPayments = [
  { vendor: "ABC Suppliers", amount: 850000, bills: 12, status: "On Time" },
  { vendor: "XYZ Materials", amount: 620000, bills: 8, status: "Delayed" },
  { vendor: "Construction Co", amount: 1200000, bills: 15, status: "On Time" },
  { vendor: "Steel Works", amount: 480000, bills: 6, status: "Pending" },
  { vendor: "Cement Ltd", amount: 750000, bills: 9, status: "On Time" }
];

const billStatusData = [
  { name: "Approved", value: 65, color: "#10B981" },
  { name: "Pending", value: 20, color: "#F59E0B" },
  { name: "Rejected", value: 10, color: "#EF4444" },
  { name: "Under Review", value: 5, color: "#6B7280" }
];

const paymentTrend = [
  { month: "Jan", payments: 2.1, outstanding: 0.8 },
  { month: "Feb", payments: 2.8, outstanding: 0.6 },
  { month: "Mar", payments: 2.3, outstanding: 1.2 },
  { month: "Apr", payments: 3.5, outstanding: 0.9 },
  { month: "May", payments: 3.1, outstanding: 0.7 },
  { month: "Jun", payments: 3.8, outstanding: 0.5 }
];

export default function BillPosting() {
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
                  Bill Posting
                </h1>
                <p className="text-slate-600 dark:text-slate-300">
                  Process invoices and payment tracking
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
              <FileText className="h-5 w-5" />
              <span>Bill Analytics</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="charts" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="charts">Bill Analytics</TabsTrigger>
                <TabsTrigger value="data">Bill Entries</TabsTrigger>
              </TabsList>
              
              <TabsContent value="charts" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Monthly Bill Processing */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Monthly Bill Processing</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={monthlyBillData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis label={{ value: 'Bills Count', angle: -90, position: 'insideLeft' }} />
                          <Tooltip />
                          <Bar dataKey="processed" fill="#10b981" name="Processed" />
                          <Bar dataKey="pending" fill="#f59e0b" name="Pending" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Site-wise Bill Distribution */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Site-wise Bill Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={siteWiseBills}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="site" />
                          <YAxis label={{ value: 'Bills Count', angle: -90, position: 'insideLeft' }} />
                          <Tooltip />
                          <Bar dataKey="processed" fill="#3b82f6" name="Processed" />
                          <Bar dataKey="pending" fill="#ef4444" name="Pending" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Payment Trend */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Payment Trend (₹ Crores)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={paymentTrend}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis label={{ value: 'Amount (₹ Cr)', angle: -90, position: 'insideLeft' }} />
                          <Tooltip />
                          <Area type="monotone" dataKey="payments" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" name="Payments Made" />
                          <Area type="monotone" dataKey="outstanding" stackId="1" stroke="#f59e0b" fill="#f59e0b" name="Outstanding" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Bill Status Distribution */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Bill Status Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={billStatusData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, value }) => `${name}: ${value}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {billStatusData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Monthly Amount Processed */}
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle className="text-lg">Monthly Amount Processed (₹ Crores)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={monthlyBillData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis label={{ value: 'Amount (₹ Cr)', angle: -90, position: 'insideLeft' }} />
                          <Tooltip />
                          <Line type="monotone" dataKey="amount" stroke="#8b5cf6" strokeWidth={3} name="Amount Processed" />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="data" className="mt-6">
                <div className="text-center py-12">
                  <FileText className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                    Bill Data Table
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4">
                    This section will contain bill entries with fields like Bill No., Vendor, Site, Amount, and Status.
                  </p>
                  <p className="text-sm text-slate-500">
                    Continue prompting to have this page fully implemented with bill posting functionality.
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
