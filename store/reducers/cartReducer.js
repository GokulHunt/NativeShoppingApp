import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cartAction';
import CartItem from '../../models/cart-item';

const initialState = {
  items: {},
  totalAmount: 0
};

const cartReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;

      if (state.items[addedProduct.id]) {
        const updatedCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          addedProduct.price, addedProduct.title,
          state.items[addedProduct.id].sum + addedProduct.price);

        return {
          ...state,
          items: {
            ...state.items,
            [addedProduct.id]: updatedCartItem
          },
          totalAmount: state.totalAmount + addedProduct.price
        }

      }
      else {
        const newCartItem = new CartItem(1, addedProduct.price, addedProduct.title, addedProduct.price);
        return {
          ...state,
          items: {
            ...state.items,
            [addedProduct.id]: newCartItem
          },
          totalAmount: state.totalAmount + addedProduct.price
        }
      }

    case REMOVE_FROM_CART:
      const productId = action.productId;
      const currentCartItem = state.items[productId]
      const currentQty = currentCartItem.quantity;

      let updatedCartItems;

      if (currentQty > 1) {
        const updatedCartItem = new CartItem(currentQty - 1, currentCartItem.productPrice, currentCartItem.productTitle, currentCartItem.sum - currentCartItem.productPrice);
        updatedCartItems = { ...state.items, [productId]: updatedCartItem };
        return { ...state,
          items: updatedCartItems,
          totalAmount: state.totalAmount - currentCartItem.productPrice };
      }
      else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[productId];
        return { ...state,
          items: updatedCartItems,
          totalAmount: state.totalAmount - currentCartItem.productPrice };
      }

    default:
      return state
  }
  return state
}

export default cartReducer;
