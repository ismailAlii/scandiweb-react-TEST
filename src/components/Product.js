import React from 'react';
import { Link } from 'react-router-dom';
import cartImg from '../images/productCart.png';

const Product = (props) => {
  return (
    <article className={`product ${!props.product.inStock && 'not-available'}`}>
      <div className='img'>
        <img src={props.product.gallery[0]} alt='Product Image' />
        {/* Make Sure It in The Stock !! */}
        {props.product.inStock && (
          <Link to={`/${props.product.id}`}>
            <img src={cartImg} alt='Link Icon' />
          </Link>
        )}
      </div>
      <div className='info'>
        <p className='name'>{props.product.name}</p>
        {props.product.prices.map((item, index) => {
          return item.currency.symbol === props.activeCurrency ? (
            <p className='price' key={index}>
              {item.currency.symbol}
              {item.amount}
            </p>
          ) : (
            ''
          );
        })}
      </div>
    </article>
  );
};

export default Product;
