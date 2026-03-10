/**
 * Layout Component
 * Created by: Tiko Abousteit
 * Date: 22 February 2026
 */

import { Outlet } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Header from './Header';
import Footer from './Footer';
import TableOfContents from '@/features/catalog/TableOfContents';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <TableOfContents />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Analytics />
    </div>
  );
}
