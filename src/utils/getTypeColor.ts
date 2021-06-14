import { typeInv } from "../interfaces";

const getTypeColor = (type: typeInv) => {
  if (type === "Manufacture") return "var(--primary-green)";
  if (type === "Purchase") return "var(--primary-red)";
  if (type === "Self") return "var(--primary-color)";
  if (type === "Sell") return "var(--primary-orange)";
  else return "#aaa";
};

export { getTypeColor };
