import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { endpoints } from "../constants/apiEndpoints";
import { apiService } from "../services/apiService";
import Loading from "../ui/Loading";
import styles from "../styles/pages/CategoryId.module.css";
import Product from "../components/Product";
import Button from "../ui/Button";
import { showToast } from "../utils/showToast";
import boxImg from "../assets/box.png";
import { IGetCategoryId } from "../interfaces/category";

const CategoryId = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<IGetCategoryId>({} as IGetCategoryId);

  useEffect(() => {
    const getCategoryProducts = async () => {
      const r = await apiService<IGetCategoryId>(endpoints.categoryId, {}, id);

      if (r) setData(r);
      setIsLoading(false);
    };
    getCategoryProducts();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure?")) {
      const r = await apiService(endpoints.deleteCategory, {}, id);
      if (r) {
        showToast(r.message, "success");
        history.push("/inventory");
      }
    }
  };

  if (isLoading) return <Loading />;
  return (
    <>
      <div className={styles.actions_container}>
        <div className={styles.button_container}>
          <Button
            style={{
              backgroundColor: "var(--primary-red)",
            }}
          >
            <Link to={`/categories/${id}/update`}>Edit</Link>
          </Button>
          <Button onClick={() => handleDelete()}>Delete</Button>
        </div>
      </div>

      <div className={styles.category}>{data.category.categoryName}:</div>
      <div className={styles.container}>
        <img
          className={styles.img}
          src={data.category.img || boxImg}
          alt="product"
        />

        <div className={styles.heading}>Products from this category:</div>
        <div className={styles.box_container}>
          {data.products.length ? (
            data.products?.map((item, index) => {
              let delay = "250ms";
              const delayCalc = 250 + 200 * index;

              if (delayCalc > 1000) delay = "1000ms";
              delay = delayCalc + "ms";

              return (
                <Product
                  key={index}
                  img={item.img}
                  name={item.productName}
                  quantity={item.quantity}
                  id={item._id}
                  delay={delay}
                />
              );
            })
          ) : (
            <div className="info" style={{ color: "var(--primary-gray)" }}>
              No products have been added in this category
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CategoryId;
