import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

function App() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App
