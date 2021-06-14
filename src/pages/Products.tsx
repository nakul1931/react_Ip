import { useEffect, useState } from "react";
import Product from "../components/Product";
import { endpoints } from "../constants/apiEndpoints";
import { apiService } from "../services/apiService";
import Loading from "../ui/Loading";
import styles from "../styles/pages/Categories.module.css";
import { IGetAllProducts } from "../interfaces/product";

const Products = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<IGetAllProducts>({} as IGetAllProducts);

  useEffect(() => {
    const getProducts = async () => {
      const r = await apiService<IGetAllProducts>(endpoints.getProducts);

      if (r) setData(r);
      setIsLoading(false);
    };

    getProducts();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Products</h2>
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
          <div className="info">No products added</div>
        )}
      </div>
    </div>
  );
};

export default Products;
