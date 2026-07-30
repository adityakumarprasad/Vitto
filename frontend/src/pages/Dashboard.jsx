// ============================================================
// Dashboard.jsx – Summary cards + Recharts visualizations
// ============================================================

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Card from '../components/ui/Card';
import Loader from '../components/ui/Loader';
import ApprovalPieChart from '../components/charts/ApprovalPieChart';
import CreditScoreHistogram from '../components/charts/CreditScoreHistogram';
import MonthlyApplicationsChart from '../components/charts/MonthlyApplicationsChart';
import { getDashboard } from '../services/api';

function StatCard({ label, value, suffix = '' }) {
  return (
    <div className="rounded-2xl border border-ink-200/70 bg-white/75 p-5 shadow-soft dark:border-ink-700/60 dark:bg-ink-900/60 animate-fadeUp">
      <p className="text-xs uppercase tracking-wider text-ink-700/50 dark:text-ink-200/40">
        {label}
      </p>
      <p className="mt-2 font-display text-3xl font-bold text-ink-900 dark:text-ink-50">
        {value}
        {suffix && <span className="ml-1 text-lg font-semibold opacity-60">{suffix}</span>}
      </p>
    </div>
  );
}

function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const result = await getDashboard();
        if (!cancelled) setData(result);
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to load dashboard');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return <Loader fullPage label="Loading dashboard…" />;
  if (!data) return <p className="text-center text-sm">Unable to load dashboard.</p>;

  const { summary, charts } = data;

  return (
    <div className="space-y-8">
      <header className="animate-fadeUp">
        <h1 className="font-display text-3xl font-bold text-ink-900 dark:text-ink-50">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-ink-700/70 dark:text-ink-200/60">
          Portfolio snapshot of MSME lending decisions.
        </p>
      </header>

      {/* Summary metric cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard label="Total Applications" value={summary.totalApplications} />
        <StatCard label="Approved" value={summary.approved} />
        <StatCard label="Rejected" value={summary.rejected} />
        <StatCard label="Approval Rate" value={summary.approvalRate} suffix="%" />
        <StatCard label="Avg Credit Score" value={summary.averageCreditScore} />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Approval Mix" subtitle="Approved vs rejected">
          <ApprovalPieChart data={charts.approvalBreakdown} />
        </Card>

        <Card title="Credit Score Distribution" subtitle="Histogram of scores">
          <CreditScoreHistogram data={charts.creditScoreHistogram} />
        </Card>

        <Card
          title="Monthly Applications"
          subtitle="Last 6 months"
          className="lg:col-span-2"
        >
          <MonthlyApplicationsChart data={charts.monthlyApplications} />
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
