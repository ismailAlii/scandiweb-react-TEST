import React from 'react';
const MiniCartItem = (props) => {
  /* Start Currency */
  let amount = props.info.prod.prices.filter((item) => {
    return item.currency.symbol === props.activeCurrency;
  })[0].amount;
  let symbol = props.info.prod.prices.filter((item) => {
    return item.currency.symbol === props.activeCurrency;
  })[0].currency.symbol;
  /* End Currency */
  return (
    <article className='bag-product'>
      <div className='info'>
        <p className='brand'>{props.info.prod.brand}</p>
        <p className='name'>{props.info.prod.name}</p>
        <p className='price'>
          {symbol}
          {amount * props.info.num}
        </p>
        <div className='attributes'>
          {props.info.attr.map((item, index) => {
            if (item.type === 'text') {
              return (
                <div key={item.id}>
                  <p>{item.name}:</p>
                  <ul className='text'>
                    {item.items.map((miniItem, miniIndex) => {
                      return (
                        <li
                          key={miniItem.id}
                          className={`${miniIndex === item.activeIndex &&
                            'active'}`}
                          onClick={() =>
                            props.changeAttr(
                              item.id,
                              miniIndex,
                              props.info.prod.id
                            )
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
                <>
                  <p>{item.name}:</p>
                  <ul className='color'>
                    {item.items.map((miniItem, miniIndex) => {
                      return (
                        <li
                          key={miniItem.id}
                          className={`${miniIndex === item.activeIndex &&
                            'active'}`}
                          style={{ backgroundColor: miniItem.value }}
                          onClick={() =>
                            props.changeAttr(
                              item.id,
                              miniIndex,
                              props.info.prod.id
                            )
                          }
                        ></li>
                      );
                    })}
                  </ul>
                </>
              );
            }
          })}
        </div>
      </div>
      <div className='num-control'>
        <button onClick={() => props.addOne(props.info.prod.id)}>+</button>
        <div className='number'>{props.info.num}</div>
        <button onClick={() => props.removeOne(props.info.prod.id)}>-</button>
      </div>
      <div className='img'>
        <img src={props.info.prod.gallery[0]} alt='cart product img' />
      </div>
    </article>
  );
};
// removeOne={props.removeOne}
export default MiniCartItem;
