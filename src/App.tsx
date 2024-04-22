import { RouterProvider } from 'react-router-dom';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import router from './routers/rootRouter';

dayjs.extend(customParseFormat);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
