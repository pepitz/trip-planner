import Home from 'pages/Home/Home';
import Results from 'pages/Results/Results';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/results',
    id: 'results',
    element: <Results />,
    loader: async ({ request }) => {
      let url = new URL(request.url);
      let searchParamsEntries = url.searchParams.entries();
      return Object.fromEntries(searchParamsEntries);
    },
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
