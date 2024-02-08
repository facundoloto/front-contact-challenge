import AppRoutes from './routes/AppRoutes';
import { DataProvider } from './provider/DataProvider';
import './index.css';

function App() {

  return (
    <>
      <DataProvider>
        <AppRoutes />
      </DataProvider>
    </>

  );
}

export default App;
