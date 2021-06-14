import styles from "../styles/ui/Loading.module.css";
import cn from "classnames";

interface ILoading {
  background?: boolean;
}

const Loading = ({ background = false }: ILoading) => {
  return (
    <div
      className={cn(styles.container, {
        [styles.background]: background,
      })}
    >
      <div className={styles.reverseSpinner}></div>
    </div>
  );
};

export default Loading;
