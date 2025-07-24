import { ReactNode } from 'react';
import { Navbar } from '../components/Navbar';

interface RootLayoutProps {
  children: ReactNode;
  className?: string;
}

export function RootLayout({ children, className = '' }: RootLayoutProps) {
  return (
    <div className={`min-h-screen bg-white ${className}`}>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
    </div>
  );
}