const capitalize = (s: string) => {
  return s
    .toLowerCase()
    .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
};

export { capitalize };
