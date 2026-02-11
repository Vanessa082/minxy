"use client";
import { useState, useEffect, use } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from "recharts";
import {
  Download, Globe, MousePointer2, ShieldAlert,
  Activity, Monitor, Smartphone, Cpu
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Fetcher } from "@/lib/fetch";
import Loading from "@/app/loading";
import { AnalyticsData, DataTableProps, MetricCardProps } from "@/core/type";

export default function FullAnalyticsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const res = await Fetcher<AnalyticsData>(`/${id}/analytics`);
        if (res.data) setData(res.data);
      } catch (err) {
        console.error("Failed to fetch decision data", err);
      } finally {
        setLoading(false);
      }
    };
    loadAnalytics();
  }, [id]);

  const handleExport = () => {
    if (!data) return;
    const csvRows = [
      ["Metric", "Count"],
      ["Total Clicks", data.summary.totalClicks],
      ["Unique Visitors", data.summary.uniqueClicks],
      ["Conversion Rate", (data.summary.conversionRate * 100).toFixed(2) + "%"]
    ];
    const csvContent = "data:text/csv;charset=utf-8," + csvRows.map(e => e.join(",")).join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = `analytics_${id}.csv`;
    link.click();
  };

  if (loading) return <Loading />;

  if (!data || data.summary.totalClicks === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
        <div className="bg-muted p-6 rounded-full mb-4">
          <Activity className="h-12 w-12 text-muted-foreground animate-pulse" />
        </div>
        <h3 className="text-xl font-bold">Waiting for interaction</h3>
        <p className="text-muted-foreground max-w-xs mx-auto">
          Once your link is clicked, the decision system will populate with real-time data.
        </p>
      </div>
    );
  }

  const techData = data.tech?.[0] || { browsers: [], os: [], devices: [] };
  const sourceData = data.sources?.[0] || { utm_sources: [] };

  return (
    // Max-w-6xl matches your NavBar for a clean vertical alignment
    <main className="max-w-6xl mx-auto p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Intelligence Suite</h1>
          <p className="text-muted-foreground">
            Analyzing ID: <span className="font-mono text-app-blue-500 font-semibold">{id}</span>
          </p>
        </div>
        <button
          onClick={handleExport}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground hover:bg-primary/90 transition-all rounded-xl text-sm font-bold shadow-lg shadow-primary/20"
        >
          <Download size={18} /> Export CSV
        </button>
      </div>

      {/* High-Level Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Total Volume" value={data.summary.totalClicks} subtitle="Gross usage" icon={<Activity size={14} />} />
        <MetricCard title="Identity Layer" value={data.summary.uniqueClicks} subtitle="Unique reach" icon={<Globe size={14} />} />
        <MetricCard title="Performance" value={`${(data.summary.conversionRate * 100).toFixed(1)}%`} subtitle="Conversion efficiency" icon={<MousePointer2 size={14} />} />
        <MetricCard title="Velocity" value={(data.summary.totalClicks / (data.timeSeries?.length || 1)).toFixed(1)} subtitle="Avg clicks / day" icon={<Cpu size={14} />} />
      </div>

      {/* Main Chart */}
      <Card className="overflow-hidden border-none shadow-md bg-card/50 backdrop-blur">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <Activity size={20} className="text-app-blue-500" />
            Traffic Timeline
          </CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] sm:h-[400px] pl-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.timeSeries || []}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis
                dataKey="_id"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                dy={10}
                stroke="hsl(var(--muted-foreground))"
              />
              <YAxis
                fontSize={12}
                tickLine={false}
                axisLine={false}
                stroke="hsl(var(--muted-foreground))"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  borderRadius: '12px',
                  border: '1px solid hsl(var(--border))',
                  boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
                }}
              />
              <Line
                type="monotone"
                dataKey="clicks"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Data Breakdowns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DataTable title="Top Countries" icon={<Globe size={18} className="text-emerald-500" />} rows={data.geo || []} />
        <DataTable title="Browsers" icon={<Monitor size={18} className="text-indigo-500" />} rows={techData.browsers} />
        <DataTable title="UTM Sources" icon={<MousePointer2 size={18} className="text-orange-500" />} rows={sourceData.utm_sources} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DataTable title="Operating Systems" icon={<Cpu size={18} className="text-rose-500" />} rows={techData.os} />
        <DataTable title="Devices" icon={<Smartphone size={18} className="text-blue-500" />} rows={techData.devices} />
      </div>

      {/* Alerts */}
      {data.summary.totalClicks > 500 && (
        <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center gap-4 text-amber-600 dark:text-amber-400">
          <div className="p-2 bg-amber-500/20 rounded-full shrink-0">
            <ShieldAlert size={20} />
          </div>
          <div>
            <p className="font-bold text-sm">Security Advisory</p>
            <p className="text-xs opacity-90">High traffic volume detected. Ensure your rate limits are configured for this endpoint.</p>
          </div>
        </div>
      )}
    </main>
  );
}

function MetricCard({ title, value, subtitle, icon }: MetricCardProps & { icon?: React.ReactNode }) {
  return (
    <Card className="relative overflow-hidden border-none shadow-sm hover:shadow-md transition-all">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{title}</p>
          <div className="text-muted-foreground opacity-50">{icon}</div>
        </div>
        <h3 className="text-3xl font-extrabold mt-2 tabular-nums">{value}</h3>
        <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 bg-app-blue-500 rounded-full animate-pulse" /> {subtitle}
        </p>
      </CardContent>
    </Card>
  );
}

function DataTable({ title, icon, rows }: DataTableProps & { icon?: React.ReactNode }) {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="flex flex-row items-center gap-3 border-b border-border/50 bg-muted/5 pb-4">
        {icon}
        <CardTitle className="text-sm font-bold uppercase tracking-wider">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-4 px-0">
        <div className="px-6 space-y-1">
          {rows.length > 0 ? rows.map((r, i) => (
            <div key={i} className="flex justify-between items-center py-2 group border-b border-border/40 last:border-0">
              <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                {r._id || "Direct / Unknown"}
              </span>
              <span className="text-xs font-bold bg-secondary text-secondary-foreground px-2.5 py-1 rounded-lg">
                {r.count.toLocaleString()}
              </span>
            </div>
          )) : (
            <div className="text-center py-8">
              <p className="text-xs text-muted-foreground italic">No data available</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}