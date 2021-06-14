import styles from "../styles/components/PageNotFound.module.css";
import image from "../assets/not_found.svg";
import { Link } from "react-router-dom";
import Button from "../ui/Button";

const PageNotFound = () => {
  return (
    <div className={styles.container}>
      <img className={styles.img} src={image} alt="Not Found" />
      <div className={styles.title}>Page Not found</div>
      <Button>
        <Link to="/">Home</Link>
      </Button>
    </div>
  );
};

export default PageNotFound;
