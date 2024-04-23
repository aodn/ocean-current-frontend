import { RouterProvider } from 'react-router-dom';
import router from './routers/rootRouter';
import './configs/dayjs';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
