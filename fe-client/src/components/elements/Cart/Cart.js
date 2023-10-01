import React, { useState } from 'react';
import styles from './index.module.css'
import { useCart, useCartDispatch } from '@/context/CartContext';
import Image from 'next/image';
import api from '@/api';

const Cart = () => {
  const [payAmount, setPayAmount] = useState();

  const carts = useCart();
  const dispatch = useCartDispatch();
  
  const handleAddToCart = (cart) => {
    dispatch({
      type: 'add',
      payload: cart
    })
  }

  const handleDecreaseCart = (cart) => {
    dispatch({
      type: 'decrease',
      payload: cart
    })
  }

  const getTotalPrice = () => {
    let totalPrice = 0;
    for (let i = 0; i < carts.length; i++) {
      totalPrice += carts[i].price * carts[i].quantity
    }

    return totalPrice;
  }

  const handleChangePay = (event) => {
    const { target } = event;
    const { value } = target;

    setPayAmount(value)
  }

  const handleCheckout = async () => {
    const products = carts.map((item) => {
      return {
        id: item.id,
        quantity: item.quantity
      }
    });

    try {
      const payload = {
        total_price: +getTotalPrice(),
        paid_amount: +payAmount,
        products
      }
      await api.post('/transactions', payload);
      setPayAmount('');
      dispatch({type: 'clear'})
    } catch {
      throw Error('error')
    }
  }

  const isDisableButton = () => {
    return !payAmount || +payAmount < +getTotalPrice() || carts.length === 0;
  }

  return (
    <div className={styles.cart}>
      <h3>Cart</h3>
      <div className={styles['cart__cart-list']}>
        {carts.map((cart, index) => {
          return (
            <div key={index} className={styles['cart-item']}>
              <div className={styles['cart-item__image']}>
                <Image 
                  src={cart.img_product}
                  alt={cart.name}
                  fill
                  style={{objectFit: 'contain'}}
                />
              </div>
              <div className={styles['cart-item__desc']}>
                <p>{cart.name}</p>
                <p>{cart.price}</p>
              </div>
              <div className={styles['cart-item__action']}>
                <button onClick={() => handleDecreaseCart(cart)}>-</button>
                <p>{cart.quantity}</p>
                <button onClick={() => handleAddToCart(cart)}>+</button>
              </div>
            </div>
          )
        })}
      </div>
      <div className={styles['cart__checkout']}>
        <div className={styles['cart__total-price']}>
          <p>Total Harga</p>
          <p>{getTotalPrice()}</p>
        </div>
        <div className={styles['cart__pay']}>
          <label>Bayar</label>
          <input placeholder="-" onChange={handleChangePay} type="number" value={payAmount} />
        </div>
        <button onClick={handleCheckout} disabled={isDisableButton()}>Checkout</button>
      </div>
    </div>
  )
}

export default Cart;