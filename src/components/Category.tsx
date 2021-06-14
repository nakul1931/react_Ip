import { CSSProperties } from "react";
import { Link } from "react-router-dom";
import boxImg from "../assets/box.png";
import styles from "../styles/components/Category.module.css";

interface ICategory {
  img: string;
  name: string;
  id: number | string;
  delay: string;
}

const Category = ({ img, name, id, delay }: ICategory) => {
  return (
    <Link to={`/categories/${id}`}>
      <div className={styles.box} style={{ "--delay": delay } as CSSProperties}>
        <img className={styles.img} src={img ? img : boxImg} alt="alt" />
        <div className={styles.title}>{name}</div>
      </div>
    </Link>
  );
};

export default Category;
