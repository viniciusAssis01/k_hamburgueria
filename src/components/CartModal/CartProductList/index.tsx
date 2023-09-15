import CartProductCard from "./CartProductCard";

import { StyledCartProductList } from "./style";
import { StyledButton } from "../../../styles/button";
import { StyledParagraph } from "../../../styles/typography";
import { CartContext } from "../../../providers/CartContext";
import { useContext } from "react";

const CartProductList = () => {
  const { cartProductList, removeAllFromCart, totalSum } =
    useContext(CartContext);

  return (
    <StyledCartProductList>
      <ul>
        {cartProductList.map((product) => {
          return <CartProductCard key={product.id} product={product} />;
        })}
      </ul>

      {cartProductList.length >= 1 ? (
        <>
          <div className="totalBox">
            <StyledParagraph>
              <strong>Total</strong>
            </StyledParagraph>
            <StyledParagraph className="total">
              {totalSum().toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </StyledParagraph>
          </div>
          <StyledButton
            $buttonSize="default"
            $buttonStyle="gray"
            onClick={() => removeAllFromCart()}
            type="button"
          >
            Remover todos
          </StyledButton>
        </>
      ) : null}
    </StyledCartProductList>
  );
};

export default CartProductList;
