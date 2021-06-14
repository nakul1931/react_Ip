import { useEffect, useState } from "react";
import Category from "../components/Category";
import { endpoints } from "../constants/apiEndpoints";
import { apiService } from "../services/apiService";
import Loading from "../ui/Loading";
import styles from "../styles/pages/Categories.module.css";
import { IGetAllCategories } from "../interfaces/category";

const Categories = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<IGetAllCategories>({
    categories: [],
    message: "",
    success: false,
  });

  useEffect(() => {
    const getCategories = async () => {
      const r = await apiService<IGetAllCategories>(endpoints.getCategories);

      if (r) {
        setData(r);
      }
      setIsLoading(false);
    };

    getCategories();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Categories</h2>
      <div className={styles.box_container}>
        {data.categories.length ? (
          data.categories?.map((item, index) => {
            let delay = "250ms";
            const delayCalc = 250 + 200 * index;

            if (delayCalc > 1000) delay = "1000ms";
            delay = delayCalc + "ms";

            return (
              <Category
                key={index}
                img={item.img}
                name={item.categoryName}
                id={item._id}
                delay={delay}
              />
            );
          })
        ) : (
          <div className="info">No categories have been added</div>
        )}
      </div>
    </div>
  );
};

export default Categories;
