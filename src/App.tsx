import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
  withRouter,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  Login,
  SignUp,
  Categories,
  AddCategory,
  Products,
  AddProduct,
  CategoryId,
  ProductId,
  UpdateProductId,
  UpdateCategoryId,
  Inventory,
  AddInventory,
  UpdateInventory,
} from "./pages";
import Loading from "./ui/Loading";
import { requestRefresh } from "./services/authService";
import PrivateRoute from "./components/PrivateRoute";

import "react-toastify/dist/ReactToastify.css";
import PageNotFound from "./components/PageNotFound";

const App = () => {
  const history = useHistory();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const handleTokenRefresh = async () => {
      const r = await requestRefresh();

      if (r) {
        setIsAuthenticated(true);

        if (location.pathname === "/login" || location.pathname === "/signup")
          history.push("/inventory");
      }
      setIsLoading(false);
    };
    handleTokenRefresh();
  }, [history, location.pathname]);

  if (isLoading) {
    return <Loading background />;
  }
  return (
    <Router>
      <Switch>
        <Redirect from="/" to="/login" exact />
        <Route path="/login">
          {isAuthenticated ? (
            <Redirect from="/login" to="/categories" />
          ) : (
            <Login setAuth={setIsAuthenticated} />
          )}
        </Route>
        <Route path="/signup">
          {isAuthenticated ? (
            <Redirect from="/signup" to="/categories" />
          ) : (
            <SignUp />
          )}
        </Route>
        <Route path="/categories/add" exact>
          <PrivateRoute authed={isAuthenticated} setAuthed={setIsAuthenticated}>
            <AddCategory />
          </PrivateRoute>
        </Route>
        <Route path="/categories/:id/update">
          <PrivateRoute authed={isAuthenticated} setAuthed={setIsAuthenticated}>
            <UpdateCategoryId />
          </PrivateRoute>
        </Route>
        <Route path="/categories/:id">
          <PrivateRoute authed={isAuthenticated} setAuthed={setIsAuthenticated}>
            <CategoryId />
          </PrivateRoute>
        </Route>
        <Route path="/categories">
          <PrivateRoute authed={isAuthenticated} setAuthed={setIsAuthenticated}>
            <Categories />
          </PrivateRoute>
        </Route>
        <Route path="/products/add" exact>
          <PrivateRoute authed={isAuthenticated} setAuthed={setIsAuthenticated}>
            <AddProduct />
          </PrivateRoute>
        </Route>
        <Route path="/products/:id/update">
          <PrivateRoute authed={isAuthenticated} setAuthed={setIsAuthenticated}>
            <UpdateProductId />
          </PrivateRoute>
        </Route>
        <Route path="/products/:id">
          <PrivateRoute authed={isAuthenticated} setAuthed={setIsAuthenticated}>
            <ProductId />
          </PrivateRoute>
        </Route>
        <Route path="/products">
          <PrivateRoute authed={isAuthenticated} setAuthed={setIsAuthenticated}>
            <Products />
          </PrivateRoute>
        </Route>
        <Route path="/inventory/add">
          <PrivateRoute authed={isAuthenticated} setAuthed={setIsAuthenticated}>
            <AddInventory />
          </PrivateRoute>
        </Route>
        <Route path="/inventory/:id/update">
          <PrivateRoute authed={isAuthenticated} setAuthed={setIsAuthenticated}>
            <UpdateInventory />
          </PrivateRoute>
        </Route>
        <Route path="/inventory">
          <PrivateRoute authed={isAuthenticated} setAuthed={setIsAuthenticated}>
            <Inventory />
          </PrivateRoute>
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
};

export default withRouter(App);
