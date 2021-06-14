import { ReactNode } from "react";
import { Redirect, Route } from "react-router";
import Layout from "./Layout";

interface IPrivateRoute {
  authed: boolean;
  setAuthed: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
}

const PrivateRoute = ({ authed, setAuthed, children }: IPrivateRoute) => {
  return (
    <Route>
      <Layout authed={authed} setAuthed={setAuthed}>
        {authed ? children : <Redirect to="/login" />}
      </Layout>
    </Route>
  );
};

export default PrivateRoute;
