import { CSSProperties, ReactNode } from "react";
import styles from "../styles/ui/Button.module.css";
import cn from "classnames";

interface IButton {
  children: ReactNode;
  style?: CSSProperties;
  round?: boolean;
  onClick?: () => void;
  className?: string;
}

const Button = ({
  children,
  style,
  round = false,
  onClick = undefined,
  className,
}: IButton) => {
  return (
    <button
      style={style}
      className={cn(styles.btn, className, {
        [styles.round]: round,
      })}
      onClick={onClick ? onClick : () => {}}
    >
      {children}
    </button>
  );
};

export default Button;
