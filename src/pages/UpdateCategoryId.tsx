import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { endpoints } from "../constants/apiEndpoints";
import { apiService } from "../services/apiService";
import Loading from "../ui/Loading";
import styles from "../styles/pages/ProductId.module.css";
import Input from "../ui/Input";
import { showToast } from "../utils/showToast";
import Button from "../ui/Button";
import { IGetCategoryId } from "../interfaces/category";
import { capitalize } from "../utils/capitalize";

const UpdateCategoryId = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const [isLoading, setIsLoading] = useState(true);

  const [name, setName] = useState("");
  const [img, setImg] = useState("");

  useEffect(() => {
    const getData = async () => {
      const r = await apiService<IGetCategoryId>(endpoints.categoryId, {}, id);

      if (r) {
        setName(r.category.categoryName);
        setImg(r.category.img);
      }
      setIsLoading(false);
    };

    getData();
  }, [id, history]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    const r = await apiService(
      endpoints.updateCategory,
      {
        categoryName: name.trim(),
        img: img,
      },
      id
    );

    if (r) {
      showToast(r.message, "success");
      history.push(`/categories/${id}`);
    }
    setIsLoading(false);
  };

  if (isLoading) return <Loading />;
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.heading}>Update Category</h2>
        <Input
          type="text"
          label="Category Name"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(capitalize(e.target.value))}
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

export default UpdateCategoryId;
