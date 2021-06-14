import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { endpoints } from "../constants/apiEndpoints";
import { apiService } from "../services/apiService";
import Loading from "../ui/Loading";
import boxImg from "../assets/box.png";
import styles from "../styles/pages/ProductId.module.css";
import Button from "../ui/Button";
import { showToast } from "../utils/showToast";
import { IExtendedProduct } from "../interfaces/product";

const ProductId = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<IExtendedProduct>({} as IExtendedProduct);

  useEffect(() => {
    const getData = async () => {
      const r = await apiService<IExtendedProduct>(endpoints.productId, {}, id);

      if (r) setData(r);
      setIsLoading(false);
    };
    getData();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure?")) {
      const r = await apiService(endpoints.deleteProduct, {}, id);
      if (r) {
        showToast(r.message, "success");
        history.push("/products");
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
            <Link to={`/products/${id}/update`}>Edit</Link>
          </Button>
          <Button onClick={() => handleDelete()}>Delete</Button>
        </div>
      </div>
      <div className={styles.container}>
        <img
          className={styles.img}
          src={data.product.img || boxImg}
          alt="product"
        />

        <table className={styles.table}>
          <tbody>
            <tr>
              <th>Product name</th>
              <td>{data.product.productName}</td>
            </tr>
            <tr>
              <th>Category</th>
              <td>{data.product.category.categoryName}</td>
            </tr>
            <tr>
              <th>Quantity</th>
              <td>{data.product.quantity}</td>
            </tr>
            <tr>
              <th>Created At</th>
              <td>{new Date(data.product.createdAt).toLocaleString()}</td>
            </tr>
            <tr>
              <th>Updated At</th>
              <td>{new Date(data.product.updatedAt).toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductId;
