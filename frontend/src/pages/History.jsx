// ============================================================
// History.jsx – Decision audit trail with search + pagination
// ============================================================

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';
import { getHistory } from '../services/api';

function formatDate(value) {
  return new Date(value).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function History() {
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [pan, setPan] = useState('');
  const [owner, setOwner] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const res = await getHistory({
          page,
          limit: 8,
          pan: pan || undefined,
          owner: owner || undefined,
        });
        if (cancelled) return;
        setItems(res.data || []);
        setPagination(res.pagination || { page: 1, totalPages: 1, total: 0 });
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to load history');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [page, pan, owner]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    // Trigger reload by updating state already bound in form fields
    setPan((p) => p.trim());
    setOwner((o) => o.trim());
  };

  return (
    <div className="space-y-6">
      <header className="animate-fadeUp">
        <h1 className="font-display text-3xl font-bold text-ink-900 dark:text-ink-50">
          Decision History
        </h1>
        <p className="mt-1 text-sm text-ink-700/70 dark:text-ink-200/60">
          Browse past lending decisions. Search by PAN or owner name.
        </p>
      </header>

      <Card>
        <form onSubmit={handleSearch} className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
          <Input
            label="Search by PAN"
            name="panSearch"
            placeholder="ABCDE1234F"
            value={pan}
            onChange={(e) => setPan(e.target.value.toUpperCase())}
          />
          <Input
            label="Search by Owner"
            name="ownerSearch"
            placeholder="Owner name"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
          />
          <div className="flex items-end">
            <Button type="submit" className="w-full sm:w-auto">
              Search
            </Button>
          </div>
        </form>
      </Card>

      {loading ? (
        <Loader label="Loading history…" />
      ) : items.length === 0 ? (
        <p className="text-center text-sm text-ink-700/60 dark:text-ink-200/50">
          No decisions found.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-ink-200/70 bg-white/75 dark:border-ink-700/60 dark:bg-ink-900/60">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-ink-200/70 text-xs uppercase tracking-wider text-ink-700/50 dark:border-ink-700/50 dark:text-ink-200/40">
              <tr>
                <th className="px-4 py-3">Owner</th>
                <th className="px-4 py-3">PAN</th>
                <th className="px-4 py-3">Score</th>
                <th className="px-4 py-3">Decision</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {items.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-ink-100 last:border-0 dark:border-ink-800"
                >
                  <td className="px-4 py-3 font-medium">{row.ownerName}</td>
                  <td className="px-4 py-3 font-mono text-xs">{row.pan}</td>
                  <td className="px-4 py-3">{row.creditScore}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-md px-2 py-0.5 text-xs font-semibold ${
                        row.approved
                          ? 'bg-brand-100 text-brand-800 dark:bg-brand-900/40 dark:text-brand-200'
                          : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-200'
                      }`}
                    >
                      {row.decision}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-ink-700/70 dark:text-ink-200/60">
                    {formatDate(row.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination controls */}
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-ink-700/50 dark:text-ink-200/40">
          Page {pagination.page} of {pagination.totalPages} · {pagination.total} total
        </p>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </Button>
          <Button
            variant="secondary"
            disabled={page >= pagination.totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default History;
