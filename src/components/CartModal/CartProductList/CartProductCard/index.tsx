import { MdDelete } from "react-icons/md";

import { StyledCartProductCard } from "./style";
import { StyledTitle } from "../../../../styles/typography";
import { useContext } from "react";
import { CartContext } from "../../../../providers/CartContext";
import { IProductResponse } from "../../../../providers/UserContext";

interface IProductCartProps {
  product: IProductResponse;
}

const CartProductCard = ({ product }: IProductCartProps) => {
  const { removeProductFromCart } = useContext(CartContext);

  return (
    <StyledCartProductCard>
      <div className="imageBox">
        <img src={product.img} alt={product.name} />
      </div>
      <div className="contentBox">
        <StyledTitle tag="h3" $fontSize="three">
          {product.name}
        </StyledTitle>
        <button
          type="button"
          aria-label="Remover"
          onClick={() => removeProductFromCart(product.id)}
        >
          <MdDelete size={24} />
        </button>
      </div>
    </StyledCartProductCard>
  );
};

export default CartProductCard;
