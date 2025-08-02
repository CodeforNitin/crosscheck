import { Link } from "react-router-dom";
import { Calendar, ShoppingCart, FileText, BarChart3, HardHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { AnimatedCounter } from "@/components/AnimatedCounter";

export default function Index() {
  const navigationItems = [
    {
      title: "Site Schedules",
      description: "Manage project timelines and track progress",
      icon: Calendar,
      href: "/schedules",
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      title: "Purchase",
      description: "Handle procurement and vendor management",
      icon: ShoppingCart,
      href: "/purchase",
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      title: "Bill Posting",
      description: "Process invoices and payment tracking",
      icon: FileText,
      href: "/bills",
      color: "bg-orange-500 hover:bg-orange-600"
    },
    {
      title: "Performance",
      description: "Analyze metrics and send reminders",
      icon: BarChart3,
      href: "/performance",
      color: "bg-purple-500 hover:bg-purple-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="text-5xl font-bold text-orange-500 leading-none">
                  CC
                </div>
                <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
              </div>
              <div>
                <h1 className="text-4xl font-extrabold bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 bg-clip-text text-transparent tracking-tight">
                  CrossCheck
                </h1>
                <p className="text-slate-600 dark:text-slate-300 font-medium">
                  Construction Management System
                </p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">
            Welcome to CrossCheck
          </h2>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              Streamline your construction projects with comprehensive management tools
              for scheduling, purchasing, billing, and performance tracking.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Designed specifically for construction managers, site supervisors,
              purchase teams, and project planners. Get real-time insights,
              track progress, and manage your projects efficiently.
            </p>
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link key={item.href} to={item.href} className="group">
                <Card className="h-full transition-all duration-300 hover:shadow-xl hover:scale-105 border-0 shadow-lg">
                  <CardHeader className="text-center p-8">
                    <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl ${item.color} mb-6 mx-auto transition-transform group-hover:scale-110`}>
                      <IconComponent className="h-10 w-10 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                      {item.title}
                    </CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-300 text-lg">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-12">
            Quick Overview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-6xl font-bold text-slate-900 dark:text-white mb-3">
                <AnimatedCounter end={12} duration={1500} />
              </div>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                Active Sites
              </p>
            </div>

            <div className="text-center">
              <div className="text-6xl font-bold text-slate-900 dark:text-white mb-3">
                <AnimatedCounter end={47} duration={1800} />
              </div>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                Purchase Orders This Month
              </p>
            </div>

            <div className="text-center">
              <div className="text-6xl font-bold text-slate-900 dark:text-white mb-3">
                <AnimatedCounter end={23} duration={1600} />
              </div>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                Bills Processed This Month
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
