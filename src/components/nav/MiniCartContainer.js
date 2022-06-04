import React from 'react';
import MiniCartItem from './MiniCartItem';
import { Link } from 'react-router-dom';

const MiniCartContainer = (props) => {
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
  return (
    <div className='wrapper'>
      {props.cartData.map((item, index) => {
        if (index < 2) {
          return (
            <MiniCartItem
              key={item.prod.id}
              info={item}
              activeCurrency={props.activeCurrency}
              changeAttr={props.changeAttr}
              addOne={props.addOne}
              removeOne={props.removeOne}
            />
          );
        }
      })}
      {props.cartData.length > 2 && (
        <Link
          to='/cart'
          className='see-more'
          onClick={() => props.closeCartState()}
        >
          see {props.cartData.length - 2} item/s more..
        </Link>
      )}
      <div className='total'>
        <p>Total</p>
        <p>
          {props.activeCurrency}
          {totalCost}
        </p>
      </div>
    </div>
  );
};

export default MiniCartContainer;
