import React from 'react';
import { Link } from 'react-router-dom';
import currArrow from '../../images/curr-arrow.png';
import cart from '../../images/cart.png';

import MiniCartContainer from './MiniCartContainer';

const NavActions = (props) => {
  return (
    <div className='actions'>
      <div className='currency' onClick={props.changeCurrState}>
        {props.activeCurrency}
        <img src={currArrow} alt='arrow' />
        <ul className={`curr-options ${props.currState && 'active'}`}>
          {props.currencies.map((item, index) => {
            return (
              <li key={index} onClick={() => props.changeCurrency(item.symbol)}>
                <span>{item.symbol}</span>
                <span>{item.label}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <div className='cart'>
        <div className='cart-btn' onClick={() => props.changeCartState()}>
          {props.cartData.length > 0 && <span>{props.cartData.length}</span>}
          <img src={cart} alt='cart img' />
        </div>
        <div className={`mini-cart ${props.cartState && 'active'}`}>
          <header>
            <p>
              My Bag. <span>{props.cartData.length} Item/s</span>{' '}
            </p>
          </header>
          <div className='content'>
            <MiniCartContainer
              cartData={props.cartData}
              activeCurrency={props.activeCurrency}
              changeAttr={props.changeAttr}
              addOne={props.addOne}
              removeOne={props.removeOne}
              closeCartState={props.closeCartState}
            />
          </div>
          <div className='links'>
            <Link
              to='/cart'
              className='bag'
              onClick={() => props.closeCartState()}
            >
              view bag
            </Link>
            <Link
              to='/'
              className='check-out'
              onClick={() => props.closeCartState()}
            >
              check out
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
// closeCartState={props.closeCartState}
export default NavActions;
