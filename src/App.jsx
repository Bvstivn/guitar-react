//React
import { useState, useEffect } from "react";
//Componets
import Header from "./components/Header.jsx";
import Guitar from "./components/Guitar.jsx";
//Db
import { db } from "./data/db.js";

function App() {

  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart');
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  }

  //State
  const [data] = useState(db);
  const [cart , setCart] = useState(initialCart);

  const MAX_QUANTITY = 5;

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  //Functions
  function addToCart(item){
    const itemExist = cart.findIndex(guitar => guitar.id === item.id);
    if(itemExist >= 0){ //Existe
      if(cart[itemExist].quantity >= MAX_QUANTITY) return;
      const updatedCart = [...cart];
      updatedCart[itemExist].quantity++;
      setCart(updatedCart);
    }else{ //No existe
      item.quantity = 1;
      setCart([...cart, item]);
    }
  } 

  function removeFromCart(id){
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id));
  }

  function increaseQuantity(id){
    const updatedCart = cart.map(item => {
      if(item.id === id && item.quantity < MAX_QUANTITY){
        return {
          ...item,
          quantity: item.quantity + 1
        };
      };
      return item;
    });
    setCart(updatedCart);
  };

  function decreaseQuantity(id){
    const updatedCart = cart.map(item => {
      if(item.id === id && item.quantity > 1){
        return {
          ...item,
          quantity: item.quantity - 1
        };
      };
      return item;
    });
    setCart(updatedCart);
  };

  function clearCart(){
    setCart([]);
  }

  return (
    <>
      <Header
        cart = {cart}
        removeFromCart = {removeFromCart}
        increaseQuantity = {increaseQuantity}
        decreaseQuantity = {decreaseQuantity}
        clearCart = {clearCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar
              key = {guitar.id}
              guitar = {guitar}
              setCart = {setCart}
              addToCart = {addToCart}
            />
          )
          )}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
