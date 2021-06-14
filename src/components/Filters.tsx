import React, { CSSProperties } from "react";
import { invTypes } from "../constants";
import { typeInv } from "../interfaces";
import styles from "../styles/components/Filters.module.css";
import FilterItem from "./FilterItem";

interface FiltersProps {
  selectedFilters: typeInv[];
  setSelectedFilters: React.Dispatch<React.SetStateAction<typeInv[]>>;
  style?: CSSProperties;
}

const getFilters = (
  values: typeInv[],
  selectedFilters: typeInv[],
  setSelectedFilters: React.Dispatch<React.SetStateAction<typeInv[]>>
) => {
  return values.map((value, index) => {
    const isSelected = selectedFilters.includes(value);

    return (
      <FilterItem
        key={index}
        value={value}
        selected={isSelected}
        onClick={() =>
          setSelectedFilters((prev) => {
            if (isSelected) return prev.filter((item) => item !== value);
            else return [...prev, value];
          })
        }
      />
    );
  });
};

const Filters = ({
  selectedFilters,
  setSelectedFilters,
  style,
}: FiltersProps) => {
  return (
    <div style={style}>
      <div className={styles.filters_container}>
        {getFilters(invTypes, selectedFilters, setSelectedFilters)}
      </div>
    </div>
  );
};

export default Filters;
