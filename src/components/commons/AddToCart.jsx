import { Button } from "neetoui";
import { without } from "ramda";
import { shallow } from "zustand/shallow";

import useCartItemsStore from "stores/useCartItemsStore";

const AddToCart = ({slug}) =>{
    const { isInCart, toggleIsInCart } = useCartItemsStore(store => ({
        isInCart: store.cartItems.includes(slug),
        toggleIsInCart: store.toggleIsInCart,
      }),
      shallow
    );
    
    const handleClick = e =>{
        e.stopPropagation();
        e.preventDefault();
        toggleIsInCart(slug);
    };

    return(
        <Button
            label = {isInCart ? "Remove from cart" : "Add to cart"}
            size="large"
            onClick={handleClick} 
        />
    );
};

export default AddToCart;