import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { endpoints } from "../constants/apiEndpoints";
import { apiService } from "../services/apiService";
import Loading from "../ui/Loading";
import styles from "../styles/pages/ProductId.module.css";
import Input from "../ui/Input";
import { showToast } from "../utils/showToast";
import Button from "../ui/Button";
import { IExtendedProduct } from "../interfaces/product";
import { IGetAllCategories } from "../interfaces/category";
import Dropdown, { IOption } from "../ui/Dropdown";
import { capitalize } from "../utils/capitalize";

const UpdateProductId = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const [isLoading, setIsLoading] = useState(true);

  const [categories, setCategories] = useState<IOption[]>([]);

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [img, setImg] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const getData = async () => {
      const r = await apiService<IExtendedProduct>(endpoints.productId, {}, id);

      if (r) {
        setSelectedCategory(r.product.category._id);
        setName(r.product.productName);
        setQuantity(r.product.quantity);
        setImg(r.product.img);
      }
    };
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
    };

    const getAll = async () => {
      await getCategories();
      await getData();
      setIsLoading(false);
    };

    getAll();
  }, [id, history]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    const r = await apiService(
      endpoints.updateProduct,
      {
        categoryId: selectedCategory,
        productName: name.trim(),
        quantity: quantity,
        img: img,
      },
      id
    );

    if (r) {
      showToast(r.message, "success");
      history.push(`/products/${id}`);
    }
    setIsLoading(false);
  };

  if (isLoading) return <Loading />;
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.heading}>Update Product</h2>
        <Dropdown
          label="Category"
          options={categories}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
          }}
          value={selectedCategory}
          placeholder="Select a category"
        />
        <Input
          type="text"
          label="Product Name"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(capitalize(e.target.value))}
        />
        <Input
          type="number"
          label="Quantity"
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
        <Button style={{ marginTop: "2em" }}>Update</Button>
      </form>
    </div>
  );
};

export default UpdateProductId;
