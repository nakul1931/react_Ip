import React, { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import styles from "../styles/pages/AddCategory.module.css";
import { apiService } from "../services/apiService";
import { endpoints } from "../constants/apiEndpoints";
import Loading from "../ui/Loading";
import { showToast } from "../utils/showToast";
import { capitalize } from "../utils/capitalize";

const AddCategory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [img, setImg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    const r = await apiService(endpoints.addCategory, {
      categoryName: name.trim(),
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
        <h2 className={styles.heading}>Create a new Category</h2>
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
        <Button style={{ marginTop: "2em" }}>Create Category</Button>
      </form>
    </>
  );
};

export default AddCategory;
