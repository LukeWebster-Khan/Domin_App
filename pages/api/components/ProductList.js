import Link from "next/link";

import Product from "./Product";

export default function ProductList({ products }) {
  if (!products) return null;
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Product {...product} />
        </li>
      ))}
    </ul>
  );
}
