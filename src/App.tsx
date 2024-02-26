import { RouterProvider } from 'react-router-dom';
import router from './routers/rootRouter';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
