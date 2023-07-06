import Home from 'pages/Home/Home';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([{ path: '/', element: <Home /> }]);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
