import React, { useEffect, useState } from "react";
import { commerce } from "../lib/commerce";

import { Product } from "./index";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  // fetchCategoriesProducts function.
  async function fetchCategoriesProducts() {
    const { data: products } = await commerce.products.list();
    const { data: categoriesData } = await commerce.categories.list();

    const productsPerCategory = categoriesData.reduce(
      (accumulator, category) => {
        return [
          ...accumulator,
          {
            ...category,
            productsData: products.filter((product) =>
              product.categories.find((cat) => cat.id === category.id)
            ),
          },
        ];
      },
      []
    );
    setCategories(productsPerCategory);
  }

  useEffect(() => {
    fetchCategoriesProducts();
  }, []);

  return (
    <>
      {categories.map((category) => (
        <div className="container" key={category.id}>
          <h4 className="mb-5">{category.name.toUpperCase()}</h4>
          <div className="row">
            {category.productsData.map((productsData) => (
              <div className="col-md-3">
                <Product key={productsData.id} product={productsData} />
              </div>
            ))}
          </div>
          <br />
        </div>
      ))}
    </>
  );
}
