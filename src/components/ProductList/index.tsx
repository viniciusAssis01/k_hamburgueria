import { useContext, useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { StyledProductList } from "./style";
import { UserContext } from "../../providers/UserContext";

const ProductList = () => {
  const { getProductList, newProductList } = useContext(UserContext);

  useEffect(() => {
    getProductList();
  }, []);
  return (
    <StyledProductList>
      {newProductList.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
      {newProductList.length === 0 ? (
        <li>
          <h1>Produto nao encontrado</h1>
        </li>
      ) : null}
    </StyledProductList>
  );
};

export default ProductList;
