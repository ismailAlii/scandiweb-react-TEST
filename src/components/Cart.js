import React from 'react';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';

const Cart = (props) => {
  /* Start Get Total Cost */
  let totalCost = props.cartData
    .map((item) => {
      return (
        item.prod.prices.filter((i) => {
          return i.currency.symbol === props.activeCurrency;
        })[0].amount * item.num
      );
    })
    .reduce((partialSum, a) => partialSum + a, 0)
    .toFixed(2);
  /* End Get Total Cost */
  /* Start Quantity */
  let quantity = () => {
    let result = 0;
    for (let i = 0; i < props.cartData.length; i++) {
      result = result + props.cartData[i].num;
    }
    return result;
  };
  /* End Quantity */
  /* Start Get Taxt */
  let tax = (totalCost * (21 / 100)).toFixed(2);
  /* End Get Taxt */
  return (
    <div className='cart'>
      <div className='header'>
        <h1>Cart</h1>
      </div>
      <div className='wrapper'>
        {props.cartData.map((item) => {
          return (
            <CartItem
              key={item.prod.id}
              info={item}
              activeCurrency={props.activeCurrency}
              changeAttr={props.changeAttr}
              addOne={props.addOne}
              removeOne={props.removeOne}
            />
          );
        })}
      </div>
      <div className='info'>
        <p className='text'>
          Tax 21%:{' '}
          <span>
            {props.activeCurrency}
            {tax}
          </span>
        </p>
        <p className='quantity'>
          Quantity: <span>{quantity()}</span>
        </p>
        <p className='total'>
          Total:{' '}
          <span>
            {props.activeCurrency}
            {totalCost}
          </span>
        </p>
        <Link to='/' className='order'>
          order
        </Link>
      </div>
    </div>
  );
};

export default Cart;
