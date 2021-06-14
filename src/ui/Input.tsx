import { useState } from "react";
import styles from "../styles/ui/Input.module.css";
import cn from "classnames";

interface IInput {
  label: string;
  type: "text" | "password" | "number" | "date" | "datetime";
  className?: string;
  placeholder: string;
  value: string | number | readonly string[] | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  password?: boolean;
}

const Input = ({
  label,
  type,
  className,
  placeholder,
  value,
  onChange,
  password = false,
}: IInput) => {
  const [show, setShow] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.label}>{label}</div>
      <div className={styles.input_container}>
        <input
          type={show ? "text" : type}
          className={cn(styles.inp, className)}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {password && (
          <span
            className={cn("material-icons hover", styles.password)}
            onClick={() => setShow(!show)}
          >
            {show ? "visibility_off" : "visibility"}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
