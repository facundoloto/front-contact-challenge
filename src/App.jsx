import AppRoutes from './routes/AppRoutes';
import { DataProvider } from './provider/DataProvider';
import { useAuthStore } from './store/authStore';

import './index.css';

function App() {
  const userLoggedIn = useAuthStore((state) => state.isAuthenticated);

  return (
    <>
      {userLoggedIn ? (
        <DataProvider>
          <AppRoutes />
        </DataProvider>
      ) : (
        /* Render something else when the user is not logged in */
        <AppRoutes />
      )}

    </>

  );
}

export default App;
