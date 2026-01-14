"use client";
import { useState, useEffect, use } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Download, Globe, MousePointer2, Smartphone, ShieldAlert, Activity, Monitor } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Fetcher } from "@/lib/fetch";
import Loading from "@/app/loading";

export default function FullAnalyticsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const res = await Fetcher(`/${id}/analytics`);
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
      ["Total Clicks", data.summary?.totalClicks ?? 0],
      ["Unique Visitors", data.summary?.uniqueClicks ?? 0],
      ["Conversion Rate", ((data.summary?.conversionRate ?? 0) * 100).toFixed(2) + "%"]
    ];
    const csvContent = "data:text/csv;charset=utf-8," + csvRows.map(e => e.join(",")).join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = `analytics_${id}.csv`;
    link.click();
  };

  if (loading) return <Loading />
  if (!data || data.summary?.totalClicks === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <Activity className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-xl font-bold">Waiting for interaction</h3>
        <p className="text-muted-foreground">Once your link is clicked, the decision system will populate.</p>
      </div>
    );
  }

  const techData = data.tech?.[0] || {};
  const sourceData = data.sources?.[0] || {};

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Decision Suite</h1>
          <p className="text-muted-foreground">URL ID: <span className="font-mono text-primary">{id}</span></p>
        </div>
        <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground hover:opacity-90 transition-all rounded-lg text-sm font-semibold shadow-sm">
          <Download size={16} /> Export Intelligence
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard title="Total Volume" value={data.summary?.totalClicks ?? 0} subtitle="Gross usage" />
        <MetricCard title="Identity Layer" value={data.summary?.uniqueClicks ?? 0} subtitle="Unique reach" />
        <MetricCard title="Performance" value={`${((data.summary?.conversionRate ?? 0) * 100).toFixed(1)}%`} subtitle="Conversion efficiency" />
        <MetricCard title="Velocity" value={(data.summary?.totalClicks / (data.timeSeries?.length || 1)).toFixed(1)} subtitle="Avg clicks / day" />
      </div>

      <Card>
        <CardHeader><CardTitle className="text-md font-bold flex items-center gap-2"><Activity size={18} className="text-blue-500" /> Hourly & Daily Velocity</CardTitle></CardHeader>
        <CardContent className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.timeSeries || []}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="_id" fontSize={11} tickLine={false} axisLine={false} dy={10} />
              <YAxis fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
              <Line type="stepAfter" dataKey="clicks" stroke="#2563eb" strokeWidth={3} dot={{ r: 4, fill: '#2563eb' }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DataTable title="Top Countries" icon={<Globe size={16} className="text-green-500" />} rows={data.geo || []} />

        <DataTable title="Primary Browsers" icon={<Monitor size={16} className="text-purple-500" />} rows={techData.browsers || []} />

        <DataTable title="UTM Campaigns" icon={<MousePointer2 size={16} className="text-orange-500" />} rows={sourceData.utm_sources || []} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DataTable title="Operating Systems" rows={techData.os || []} />
        <DataTable title="Device Classification" rows={techData.devices || []} />
      </div>

      {data.summary?.totalClicks > 500 && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-4 text-amber-900 shadow-sm">
          <div className="p-2 bg-amber-200 rounded-full"><ShieldAlert size={20} /></div>
          <div>
            <p className="font-bold text-sm">Security Advisory</p>
            <p className="text-xs opacity-80">Unusual traffic volume detected. Ensure rate limits are active.</p>
          </div>
        </div>
      )}
    </div>
  );
}

function MetricCard({ title, value, subtitle }: any) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{title}</p>
        <h3 className="text-3xl font-extrabold mt-1">{value}</h3>
        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
          <span className="h-1 w-1 bg-primary rounded-full" /> {subtitle}
        </p>
      </CardContent>
    </Card>
  );
}

function DataTable({ title, icon, rows }: any) {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center gap-2 border-b bg-muted/20 pb-4">
        {icon} <CardTitle className="text-sm font-bold uppercase tracking-tight">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-3">
          {rows.length > 0 ? rows.map((r: any) => (
            <div key={r._id} className="flex justify-between items-center group">
              <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">{r._id || "Direct Entry"}</span>
              <span className="text-sm font-bold bg-secondary px-2 py-0.5 rounded">{r.count}</span>
            </div>
          )) : <p className="text-xs text-muted-foreground italic text-center py-4">Insufficient data for this segment</p>}
        </div>
      </CardContent>
    </Card>
  );
}