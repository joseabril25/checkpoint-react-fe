import type { ReactNode } from 'react';
import { Navbar } from '../components/Navbar';
import { StandupModal } from '../components/StandupModal';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { closeStandupModal } from '../store/slices/standupSlice';

interface RootLayoutProps {
  children: ReactNode;
  className?: string;
}

export function RootLayout({ children, className = '' }: RootLayoutProps) {
  const dispatch = useAppDispatch();
  const { isStandupModalOpen } = useAppSelector((state) => state.standup);

  const handleCloseModal = () => {
    dispatch(closeStandupModal());
  };

  return (
    <div className={`min-h-screen bg-white ${className}`}>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
      <StandupModal 
        isOpen={isStandupModalOpen} 
        onClose={handleCloseModal} 
      />
    </div>
  );
}