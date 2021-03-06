import PRODUCTS from '../../data/dummy-data';
import { DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT } from '../actions/productsAction';
import Product from '../../models/product';

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(product => product.ownerId === 'u1')
}

const productsReducer = (state = initialState, action) => {
  switch (action.type) {

    case DELETE_PRODUCT:
      return {
        ...state,
        availableProducts: state.availableProducts.filter(product => product.id !== action.productId),
        userProducts: state.userProducts.filter(product => product.id !== action.productId)
      }

    case CREATE_PRODUCT:
      const productData = action.productData;
      const newProduct = new Product(new Date().toString(), 'u1', productData.title,
                              productData.imageUrl, productData.description, productData.price);
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct)
      }

    case UPDATE_PRODUCT:
      const userProductIndex = state.userProducts.findIndex(product => product.id === action.productId);

      const updatedUserProduct = new Product(action.productId, state.userProducts[userProductIndex].ownerId, action.productData.title,
                                action.productData.imageUrl, action.productData.description, state.userProducts[userProductIndex].price);

      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[userProductIndex] = updatedUserProduct;

      const availableProductIndex = state.availableProducts.findIndex(product => product.id === action.productId);

      const updatedAvailableProduct = new Product(action.productId, state.availableProducts[availableProductIndex].ownerId, action.productData.title,
                                action.productData.imageUrl, action.productData.description, state.availableProducts[availableProductIndex].price);

      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[availableProductIndex] = updatedAvailableProduct;

      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts
      }

  }

  return state;
}

export default productsReducer;
