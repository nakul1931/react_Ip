import { Link, useHistory } from "react-router-dom";
import styles from "../styles/components/Sidebar.module.css";
import cn from "classnames";
import logo from "../assets/logo.svg";
import { apiService } from "../services/apiService";
import { endpoints } from "../constants/apiEndpoints";
import { showToast } from "../utils/showToast";

interface ISidebar {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAuthed: React.Dispatch<React.SetStateAction<boolean>>;
}

const getList = (path: string) => {
  return (
    <ul className={styles.list}>
      <li
        className={cn({
          [styles.active]:
            path.includes("/inventory") && path !== "/inventory/add",
        })}
      >
        <Link to="/inventory">
          <span className="material-icons">shopping_cart</span>
          Inventory
        </Link>
        <span className={styles.buldge}></span>
      </li>
      <li
        className={cn({
          [styles.active]: path === "/inventory/add",
        })}
      >
        <Link to="/inventory/add">
          <span className="material-icons">point_of_sale</span>
          New Stock
        </Link>
        <span className={styles.buldge}></span>
      </li>

      <li
        className={cn({
          [styles.active]: path === "/categories/add",
        })}
      >
        <Link to="/categories/add">
          <span className="material-icons">note_add</span>
          Add Category
        </Link>
        <span className={styles.buldge}></span>
      </li>
      <li
        className={cn({
          [styles.active]:
            path.includes("/categories") && path !== "/categories/add",
        })}
      >
        <Link to="/categories">
          <span className="material-icons">category</span>
          Categories
        </Link>
        <span className={styles.buldge}></span>
      </li>
      <li
        className={cn({
          [styles.active]: path === "/products/add",
        })}
      >
        <Link to="/products/add">
          <span className="material-icons">create</span>
          Add Product
        </Link>
        <span className={styles.buldge}></span>
      </li>
      <li
        className={cn({
          [styles.active]:
            path.includes("/products") && path !== "/products/add",
        })}
      >
        <Link to="/products">
          <span className="material-icons">label</span>
          Products
        </Link>
        <span className={styles.buldge}></span>
      </li>
    </ul>
  );
};

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, setAuthed }: ISidebar) => {
  const history = useHistory();
  const path = history.location.pathname;

  const handleLogout = async () => {
    const r = await apiService(endpoints.logout);

    if (r) {
      showToast(r.message, "success");
      setAuthed(false);
      history.push("/login");
    }
  };

  return (
    <>
      <div
        className={cn(styles.outer_container, {
          [styles.hide]: !isSidebarOpen,
        })}
      >
        <div className={styles.container}>
          <div className={styles.logo_container}>
            <img className={styles.logo} src={logo} alt="logo" />
            <div className={styles.title}>StockMan</div>
          </div>

          {getList(path)}

          <button className={styles.btn} onClick={() => handleLogout()}>
            Logout
          </button>
        </div>
      </div>
      {isSidebarOpen && (
        <div
          className={styles.backdrop}
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
