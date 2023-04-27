import { TYPES, removeAllProducts, removeOneProduct } from "../../actions/shoppingActions";
import { useReducer } from "react";
import { shoppingInitialState, shoppingReducer } from "../../reducer/shoppingReducer";
import Product from "./producto";
import CartItem from "./cartItem";

const ShoppingCart = () => {

  const [state, dispatch] = useReducer(shoppingReducer, shoppingInitialState);
  const { products, cart } = state;

  const addToCart = (id) => dispatch({ type: TYPES.ADD_TO_CART, payload: id });
  const deleteFromCart = (id, all = false) => {
    if (all) {
      dispatch(removeAllProducts(id));
    } else {
      dispatch(removeOneProduct(id));
    }
  }
  const clearCart = (id) => dispatch({ type: TYPES.CLEAR_CART });
  const total = state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);


  return (
    <>
      <h2>Carrito de Compras</h2>
      <h3>Productos</h3>
      <div className="box grid-responsive">
        {products.map((product) => <Product key={product.id} data={product} addToCart={addToCart} />)}
      </div>
      <h3>Carrito</h3>
      <div className="box">
        {cart.map((item, index) => <CartItem key={index} data={item} deleteFromCart={deleteFromCart} />)}
      </div>
      <div> $ {total.toFixed(2)} </div>
      <div className="clear">
      <button onClick={clearCart}>Limpiar Carrito</button>
      </div>
      
    </>
  );
};

export default ShoppingCart;