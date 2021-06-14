import cn from "classnames";
import { typeInv } from "../interfaces";
import styles from "../styles/components/FilterItem.module.css";

interface FilterProps {
  value: typeInv;
  selected: boolean;
  onClick: () => void;
}

export const getFilterClassName = (value: typeInv | undefined) => {
  switch (value) {
    case "Manufacture":
      return styles.manufacture;
    case "Purchase":
      return styles.purchase;
    case "Self":
      return styles.self;
    case "Sell":
      return styles.sell;
    default:
      return styles.default;
  }
};

const FilterItem = ({ value, selected, onClick }: FilterProps) => {
  return (
    <button
      className={cn(styles.button, getFilterClassName(value), {
        [styles.selected]: selected,
      })}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default FilterItem;
