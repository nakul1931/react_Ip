import React, { ReactNode, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import styles from "../styles/components/Layout.module.css";
import { Redirect } from "react-router";
import cn from "classnames";

interface ILayout {
  authed: boolean;
  setAuthed: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
}

const Layout = ({ authed, children, setAuthed }: ILayout) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const intitialWidthListenerFunc = () => {
    const size = window.innerWidth;

    if (size < 600) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    intitialWidthListenerFunc();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  if (!authed) return <Redirect to="/login" />;
  return (
    <div className={styles.container}>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        setAuthed={setAuthed}
      />
      <main className={styles.main}>
        <button className={cn(styles.icon, "hover")} onClick={toggleSidebar}>
          <span className="material-icons">menu</span>
        </button>
        {children}
      </main>
    </div>
  );
};

export default Layout;
