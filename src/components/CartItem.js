import React from 'react';
import Product from './Product';
import arrowR from '../images/arrowR.png';
import arrowL from '../images/arrowL.png';

const CartItem = (props) => {
  const [imgIndex, setImgIndex] = React.useState(0);
  let product = props.info.prod;
  let attribute = props.info.attr;

  /* Start Currency */
  let amount = product.prices.filter((item) => {
    return item.currency.symbol === props.activeCurrency;
  })[0].amount;
  let symbol = product.prices.filter((item) => {
    return item.currency.symbol === props.activeCurrency;
  })[0].currency.symbol;
  /* End Currency */
  return (
    <article className='cart-item'>
      {/* Start info */}
      <div className='info'>
        <p className='brand'>{product.brand}</p>
        <p className='name'>{product.name}</p>
        <p className='price'>
          {symbol}
          {amount}
        </p>
        <div className='attributes'>
          {attribute.map((item) => {
            if (item.type === 'text') {
              return (
                <div className='attr' key={item.id}>
                  <p>{item.name}</p>
                  <ul className='text'>
                    {item.items.map((miniItem, miniIndex) => {
                      return (
                        <li
                          key={miniItem.id}
                          className={`${miniIndex === item.activeIndex &&
                            'active'}`}
                          onClick={() =>
                            props.changeAttr(item.id, miniIndex, product.id)
                          }
                        >
                          {miniItem.displayValue}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            } else {
              return (
                <div className='attr' key={item.id}>
                  <p>{item.name}</p>
                  <ul className='color'>
                    {item.items.map((miniItem, miniIndex) => {
                      return (
                        <li
                          key={miniItem.id}
                          className={`${miniIndex === item.activeIndex &&
                            'active'}`}
                          style={{ backgroundColor: miniItem.value }}
                          onClick={() =>
                            props.changeAttr(item.id, miniIndex, product.id)
                          }
                        ></li>
                      );
                    })}
                  </ul>
                </div>
              );
            }
          })}
        </div>
      </div>
      {/* End info */}
      {/* Start view */}
      <div className='view'>
        <div className='num-control'>
          <button onClick={() => props.addOne(product.id)}>+</button>
          <p>{props.info.num}</p>
          <button onClick={() => props.removeOne(product.id)}>-</button>
        </div>
        <div className='img'>
          <img src={product.gallery[imgIndex]} alt='Product Img' />
          <button
            className='right'
            onClick={() => {
              setImgIndex((prevState) => {
                return prevState < product.gallery.length - 1
                  ? prevState + 1
                  : prevState;
              });
            }}
          >
            <img src={arrowR} alt='go right' />
          </button>
          <button
            className='left'
            onClick={() => {
              setImgIndex((prevState) => {
                return prevState > 0 ? prevState - 1 : prevState;
              });
            }}
          >
            <img src={arrowL} alt='go left' />
          </button>
        </div>
      </div>
      {/* End view */}
    </article>
  );
};

export default CartItem;
