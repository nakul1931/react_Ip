import styles from "../styles/ui/Dropdown.module.css";

export interface IOption {
  label: string;
  value: string;
}

interface IDropdown {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: IOption[];
  required?: boolean;
}

const Dropdown = ({
  label,
  placeholder,
  value,
  onChange,
  options,
  required = true,
}: IDropdown) => {
  return (
    <div className={styles.container}>
      <div className={styles.label}>{label}</div>

      <select
        className={styles.dropdown}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      >
        {options.map((item, index) => {
          return (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          );
        })}
      </select>

      <div className={styles.arrow}></div>
    </div>
  );
};

export default Dropdown;
