import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Input from "../ui/Input";
import Button from "../ui/Button";
import styles from "../styles/pages/AddCategory.module.css";
import { apiService } from "../services/apiService";
import { endpoints } from "../constants/apiEndpoints";
import Loading from "../ui/Loading";
import { showToast } from "../utils/showToast";
import { IGetAllCategories } from "../interfaces/category";
import Dropdown, { IOption } from "../ui/Dropdown";
import { capitalize } from "../utils/capitalize";

const AddProduct = () => {
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [img, setImg] = useState("");
  const [categories, setCategories] = useState<IOption[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const getCategories = async () => {
      const r = await apiService<IGetAllCategories>(endpoints.getCategories);

      if (r && r.categories.length) {
        let temp: IOption[] = [];
        r.categories.forEach((item) => {
          temp.push({
            label: item.categoryName,
            value: item._id,
          });
        });

        setSelectedCategory(temp[0].value);
        setCategories(temp);
      } else {
        showToast("You must add a category before creating a product", "error");
        history.push("/categories/add");
      }

      setIsLoading(false);
    };

    getCategories();
  }, [history]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    const r = await apiService(endpoints.addProduct, {
      categoryId: selectedCategory,
      productName: name.trim(),
      quantity: quantity,
      img: img,
    });

    if (r) {
      showToast(r.message, "success");
      setName("");
      setImg("");
    }
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <Loading />}
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.heading}>Create a new Product</h2>
        <Dropdown
          options={categories}
          label="Category"
          placeholder="Please select a category"
          onChange={(e) => {
            setSelectedCategory(e.target.value);
          }}
          value={selectedCategory}
        />
        <Input
          type="text"
          label="Product Name"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(capitalize(e.target.value))}
        />
        <Input
          type="text"
          label="Initial Quantity"
          placeholder="Enter quantity"
          value={quantity}
          onChange={(e) => setQuantity(+e.target.value)}
        />
        <Input
          type="text"
          label="Image url (optional)"
          placeholder="Enter url"
          value={img}
          onChange={(e) => setImg(e.target.value)}
        />
        <Button style={{ marginTop: "2em" }}>Create Product</Button>
      </form>
    </>
  );
};

export default AddProduct;
