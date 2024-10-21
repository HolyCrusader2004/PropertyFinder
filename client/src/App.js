import './App.css';
import {Provider} from 'react-redux'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RegisterProperty from './pages/RegisterProperty'
import {QueryClientProvider} from '@tanstack/react-query'
import { queryClient } from './util/queries';
import MainNavigation from './components/MainNavigation';
import store from './redux/store';
import PropertyDetails from './pages/PropertyDetails';
import TripListPage from './pages/TripListPage';
import ReservationList from './pages/ReservationList';
import PropertyList from './pages/PropertyList'
import WishListPage from './pages/WishList';
import SearchPage from './pages/SearchPage';
import EditProperty from './pages/EditProperty';
import ErrorPage from './pages/ErrorPage';
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainNavigation/>,
    errorElement: <ErrorPage />,
    children:[{
      index:true,
      element:<HomePage/>,
    },{
      path:'create-property',
      element:<RegisterProperty />
    },{
      path:'properties/:propertyId',
      element:<PropertyDetails />
    },{
      path:'tripList/:userId',
      element:<TripListPage />
    },{
      path:'reservationList/:userId',
      element:<ReservationList />
    },{
      path:'propertyList/:userEmail',
      element:<PropertyList />
    },{
      path:'wishList/:userEmail',
      element:<WishListPage />
    },{
      path:'properties/search/:searchParam',
      element:<SearchPage />
    },{
      path:'properties/edit/:propertyId',
      element:<EditProperty />
    }]
  },{
    path:'login',
    element: <LoginPage />
  },{
    path: 'register',
    element: <RegisterPage />
  }
])


function App({children}) {
  return (
    <Provider store={store}>
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={router}>
      {children}
    </RouterProvider>
    </QueryClientProvider>
    </Provider>
  );
}

export default App;
