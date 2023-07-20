import Home from "../pages/Home";
import About from "../pages/About";
import Profile from "../pages/Profile";
import Signup from "../pages/Signup";
import CollectionDetailsPage from "../pages/CollectionDetails";
import AdminPage from "../pages/Admin";
import NotFound from "../pages/PageNotFound";
import Item from "../pages/ItemPage";
import Login from "../pages/LoginPage";

export const publicRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/collections/:id/collection-items",
    element: <CollectionDetailsPage />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/collections/:collectionId/collection-items/:id",
    element: <Item />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
