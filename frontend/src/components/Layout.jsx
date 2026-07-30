// ============================================================
// Layout.jsx – Shared page chrome (navbar + outlet)
// ============================================================

import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

function Layout() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <Outlet />
      </main>
      <footer className="border-t border-ink-200/50 py-6 text-center text-xs text-ink-700/50 dark:border-ink-700/40 dark:text-ink-200/40">
        Vitto MSME Lending Decision System
      </footer>
    </div>
  );
}

export default Layout;
