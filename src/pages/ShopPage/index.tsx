import { StyledShopPage } from "./style";
import CartModal from "../../components/CartModal";
import Header from "../../components/Header";
import ProductList from "../../components/ProductList";

import { StyledContainer } from "../../styles/grid";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../providers/UserContext";
import { CartContext } from "../../providers/CartContext";

const ShopPage = () => {
  const { getProductList } = useContext(UserContext);
  const { isOpenModal } = useContext(CartContext);

  return (
    <StyledShopPage>
      {isOpenModal ? <CartModal /> : null}
      <Header />
      <main>
        <StyledContainer containerWidth={1300}>
          <ProductList />
        </StyledContainer>
      </main>
    </StyledShopPage>
  );
};

export default ShopPage;
