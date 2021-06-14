import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Input from "../ui/Input";
import Button from "../ui/Button";
import styles from "../styles/pages/AddCategory.module.css";
import { apiService } from "../services/apiService";
import { endpoints } from "../constants/apiEndpoints";
import Loading from "../ui/Loading";
import { showToast } from "../utils/showToast";
import { IGetAllCategories } from "../interfaces/category";
import Dropdown, { IOption } from "../ui/Dropdown";
import { invTypes } from "../constants";
import { IGetAllProducts } from "../interfaces/product";
import { typeInv } from "../interfaces";
import { capitalize } from "../utils/capitalize";
import { IGetInventoryId } from "../interfaces/inventory";

const UpdateInventory = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);

  const [categories, setCategories] = useState<IOption[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [products, setProducts] = useState<IOption[]>([]);
  const [selectedProduct, setSelectedProduct] = useState("");

  const [selectedType, setSelectedType] = useState<typeInv>("Manufacture");

  const typeOptions: IOption[] = invTypes.map((item) => {
    return { label: item, value: item };
  });

  useEffect(() => {
    const getInfo = async () => {
      const r = await apiService<IGetInventoryId>(
        endpoints.inventoryId,
        {},
        id
      );

      if (r) {
        setName(r.inventory.customer);
        setQuantity(r.inventory.quantity);
        setSelectedCategory(r.inventory.category._id);
        setSelectedType(r.inventory.type);
        setSelectedProduct(r.inventory.product._id);
      }
    };
    const getCategories = async () => {
      await getInfo();
      const r = await apiService<IGetAllCategories>(endpoints.getCategories);

      if (r && r.categories.length) {
        let temp: IOption[] = [];
        r.categories.forEach((item) => {
          temp.push({
            label: item.categoryName,
            value: item._id,
          });
        });

        setCategories(temp);
      } else {
        showToast("You must add a category before adding a new stock", "error");
        history.push("/categories/add");
      }

      setIsLoading(false);
    };

    getCategories();
  }, [history, id]);

  useEffect(() => {
    const getProducts = async () => {
      const r = await apiService<IGetAllProducts>(
        endpoints.categoryId,
        {},
        selectedCategory
      );

      if (r) {
        if (r.products.length) {
          let temp: IOption[] = [];
          r.products.forEach((item) => {
            temp.push({
              label: item.productName,
              value: item._id,
            });
          });

          setSelectedProduct(temp[0].value);
          setProducts(temp);
        } else {
          setProducts([]);
          setSelectedProduct("");
          showToast("This category does not contain any product", "error");
        }
      }

      setIsLoading(false);
    };

    if (selectedCategory !== "") {
      getProducts();
    }
  }, [selectedCategory]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    const r = await apiService(
      endpoints.updateInventory,
      {
        category: selectedCategory,
        product: selectedProduct,
        type: selectedType,
        customer: name.trim(),
        quantity: quantity,
      },
      id
    );

    if (r) {
      history.push("/inventory");
      showToast(r.message, "success");
    }
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <Loading />}
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.heading}>Update Stock</h2>
        <Dropdown
          options={categories}
          label="Category"
          placeholder="Please select a category"
          onChange={(e) => {
            setSelectedCategory(e.target.value);
          }}
          value={selectedCategory}
        />
        <Dropdown
          options={products}
          label="Products"
          placeholder="Please select a product"
          onChange={(e) => {
            setSelectedProduct(e.target.value);
          }}
          value={selectedProduct}
        />
        <Dropdown
          options={typeOptions}
          label="Type"
          placeholder="Please select a type"
          onChange={(e) => {
            setSelectedType(e.target.value as typeInv);
          }}
          value={selectedType}
        />
        <Input
          type="text"
          label="Customer Name"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(capitalize(e.target.value))}
        />
        <Input
          type="text"
          label="Quantity"
          placeholder="Enter quantity"
          value={quantity}
          onChange={(e) => setQuantity(+e.target.value)}
        />
        <Button style={{ marginTop: "2em" }}>Save</Button>
      </form>
    </>
  );
};

export default UpdateInventory;
