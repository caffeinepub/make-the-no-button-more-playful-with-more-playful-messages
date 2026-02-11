import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ValentinePage from './pages/ValentinePage';
import { isValidValentinePath } from './lib/shareSlug';
import './index.css';

const queryClient = new QueryClient();

function App() {
  // Ensure valid paths render the Valentine page; invalid paths could show a 404 in the future
  useEffect(() => {
    const currentPath = window.location.pathname;
    if (!isValidValentinePath(currentPath)) {
      // For now, we'll still render ValentinePage even for unknown paths
      // In a production app, you might redirect or show a 404
      console.warn('Unknown path:', currentPath);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ValentinePage />
    </QueryClientProvider>
  );
}

export default App;
