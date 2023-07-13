import Home from 'pages/Home/Home';
import Results from 'pages/Results/Results';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  {
    path: '/results',
    element: <Results />,
    loader: async ({ request }) => {
      let url = new URL(request.url);
      let searchParamsEntries = url.searchParams.entries();
      const result = Object.fromEntries(searchParamsEntries);
      console.log('result: ', result);
      return result;
    },
  },
]);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
