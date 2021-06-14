import { CSSProperties, useEffect, useState } from "react";
import { endpoints } from "../constants/apiEndpoints";
import { IGetAllInventory, IExtendedInventory } from "../interfaces/inventory";
import { apiService } from "../services/apiService";
import Loading from "../ui/Loading";
import styles from "../styles/pages/Inventory.module.css";
import { Link } from "react-router-dom";
import { getTypeColor } from "../utils/getTypeColor";
import cn from "classnames";
import Filters from "../components/Filters";
import { typeInv } from "../interfaces";
import Button from "../ui/Button";
import { showToast } from "../utils/showToast";

interface IHeadList {
  name: string;
  accessor: keyof IExtendedInventory;
}

const mySortFn = (
  heading: IHeadList,
  whatSort: string,
  setWhatSort: React.Dispatch<React.SetStateAction<string>>,
  inventory: IExtendedInventory[],
  setInventory: React.Dispatch<React.SetStateAction<IExtendedInventory[]>>
) => {
  const [head, order] = whatSort.split(" ");
  let doDesc = false;

  if (heading.accessor === "category") {
    if (head === heading.name && order === "asc") doDesc = true;

    let temp = inventory;
    temp.sort((a, b) => {
      if (a.category.categoryName === b.category.categoryName) return 0;

      if (doDesc)
        return a.category.categoryName < b.category.categoryName ? 1 : -1;
      return a.category.categoryName > b.category.categoryName ? 1 : -1;
    });

    setInventory(temp);
  } else if (heading.accessor === "product") {
    if (head === heading.name && order === "asc") doDesc = true;

    let temp = inventory;
    temp.sort((a, b) => {
      if (a.category.categoryName === b.category.categoryName) return 0;

      if (doDesc)
        return a.category.categoryName < b.category.categoryName ? 1 : -1;
      return a.category.categoryName > b.category.categoryName ? 1 : -1;
    });

    setInventory(temp);
  } else {
    if (heading.name === "Actions") return;
    if (head === heading.name && order === "asc") doDesc = true;

    let temp = inventory;
    temp.sort((a, b) => {
      if (a[heading.accessor] === b[heading.accessor]) return 0;

      if (doDesc) return a[heading.accessor] < b[heading.accessor] ? 1 : -1;
      return a[heading.accessor] > b[heading.accessor] ? 1 : -1;
    });

    setInventory(temp);
  }

  const nextOrder = doDesc ? "desc" : "asc";
  setWhatSort(heading.name + " " + nextOrder);
};

const getHead = (
  whatSort: string,
  setWhatSort: React.Dispatch<React.SetStateAction<string>>,
  inventory: IExtendedInventory[],
  setInventory: React.Dispatch<React.SetStateAction<IExtendedInventory[]>>
) => {
  const headList: IHeadList[] = [
    {
      name: "Category",
      accessor: "category",
    },
    {
      name: "Product",
      accessor: "product",
    },
    {
      name: "Type",
      accessor: "type",
    },
    {
      name: "Customer",
      accessor: "customer",
    },
    {
      name: "Quantity",
      accessor: "quantity",
    },
    {
      name: "Date",
      accessor: "date",
    },
    {
      name: "Actions",
      accessor: "date",
    },
  ];
  const [head, order] = whatSort.split(" ");

  return (
    <tr>
      {headList.map((item, index) => (
        <th
          className={cn({
            [styles.arrow]: item.name === head,
            [styles[order]]: item.name === head,
          })}
          key={index}
          onClick={() =>
            mySortFn(item, whatSort, setWhatSort, inventory, setInventory)
          }
        >
          {item.name}
        </th>
      ))}
    </tr>
  );
};

const Inventory = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [inventory, setInventory] = useState<IExtendedInventory[]>([]);
  const [whatSort, setWhatSort] = useState("Date desc");
  const [selectedFilters, setSelectedFilters] = useState<typeInv[]>([]);

  const getInventory = async () => {
    const r = await apiService<IGetAllInventory>(endpoints.getInventory);

    if (r) setInventory(r.inventory);

    setIsLoading(false);
  };

  useEffect(() => {
    getInventory();
  }, []);

  const handleDelete = async (item: IExtendedInventory) => {
    if (window.confirm("Are you sure?")) {
      setIsLoading(true);
      const r = await apiService(endpoints.deleteInventory, {}, item._id);

      if (r) {
        showToast(r.message, "success");
      }

      await getInventory();
    }
  };

  const getRows = (
    inventory: IExtendedInventory[],
    selectedFilters: typeInv[]
  ) => {
    return inventory.map((item, index) => {
      if (selectedFilters.includes(item.type) || selectedFilters.length === 0)
        return (
          <tr key={index}>
            <td>
              <Link to={`/categories/${item.category._id}`}>
                {item.category.categoryName}
              </Link>
            </td>
            <td>
              <Link to={`/products/${item.product._id}`}>
                {item.product.productName}
              </Link>
            </td>
            <td className={styles.type_container}>
              <span
                style={
                  {
                    "--type-color": getTypeColor(item.type),
                  } as CSSProperties
                }
                className={styles.type}
              ></span>
              {item.type}
            </td>
            <td>{item.customer}</td>
            <td>{item.quantity}</td>
            <td>
              {new Date(item.date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "2-digit",
              })}
              <span className={styles.time}>
                {new Date(item.date).toLocaleTimeString("en-IN", {
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </span>
            </td>
            <td className={styles.action_container}>
              <Link to={`/inventory/${item._id}/update`}>
                <button
                  className={cn(styles.action_button, "hover")}
                  style={{ color: "var(--primary-color)" }}
                >
                  <span className="material-icons">edit</span>
                </button>
              </Link>
              <button
                onClick={() => handleDelete(item)}
                className={cn(styles.action_button, "hover")}
                style={{ color: "var(--primary-red)" }}
              >
                <span className="material-icons">delete</span>
              </button>
            </td>
          </tr>
        );
      else return null;
    });
  };

  if (isLoading) return <Loading />;
  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>Inventory</div>
        <div className={styles.inner_container}>
          <Link to="/inventory/add">
            <Button
              className={cn(styles.new, {
                [styles.new_center]: inventory.length === 0,
              })}
            >
              <span className="material-icons">add</span>
              New
            </Button>
          </Link>
          {inventory.length ? (
            <>
              <div>
                <span>Filter types: </span>
                <Filters
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                  style={{ marginBottom: "3em" }}
                />
              </div>

              <div className={styles.table_container}>
                <table className={styles.table}>
                  <thead>
                    {getHead(whatSort, setWhatSort, inventory, setInventory)}
                  </thead>
                  <tbody>{getRows(inventory, selectedFilters)}</tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="info" style={{ marginTop: "3em" }}>
              No stock has been added
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Inventory;
