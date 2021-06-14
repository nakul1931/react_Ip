import { CSSProperties } from "react";
import { Link } from "react-router-dom";
import boxImg from "../assets/box.png";
import styles from "../styles/components/Product.module.css";

interface IProduct {
  img: string;
  name: string;
  quantity: number;
  id: string;
  delay: string;
}

const Product = ({ img, name, quantity, id, delay }: IProduct) => {
  return (
    <div
      className={styles.outer_div}
      style={{ "--delay": delay } as CSSProperties}
    >
      <Link to={`/products/${id}`}>
        <div className={styles.box}>
          <img className={styles.img} src={img ? img : boxImg} alt="alt" />
          <div className={styles.title}>{name}</div>
          <div className={styles.price}>
            <span className={styles.price_span}>{quantity}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Product;
