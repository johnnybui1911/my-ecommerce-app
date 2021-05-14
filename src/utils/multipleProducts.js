function multipleProducts(products) {
  let newProducts = [];
  for (let i = 0; i < 10; i++) {
    newProducts = [...newProducts, ...products];
  }
  return newProducts;
}

export default multipleProducts;
