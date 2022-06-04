import React from 'react';
import Product from './Product';

const Content = (props) => {
  return (
    <div className='content'>
      {props.products.map((item) => {
        return (
          <Product
            product={item}
            key={item.id}
            activeCurrency={props.activeCurrency}
          />
        );
      })}
    </div>
  );
};

export default Content;
