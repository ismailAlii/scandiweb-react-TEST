import React from 'react';
import { Link } from 'react-router-dom';
import NavActions from './NavActions';
// logo
import logoImg from '../../images/a-logo.png';

const Nav = (props) => {
  return (
    <header>
      <div className='container'>
        {/* Start Links */}
        <ul className='nav'>
          {props.navItem.map((item, index) => {
            return (
              <Link
                to='/'
                key={index}
                className={`${item.name == props.cat && 'active'}`}
                onClick={() => props.changeCat(item.name)}
              >
                {item.name}
              </Link>
            );
          })}
        </ul>
        {/* End Links */}
        {/* Start logo */}
        <img src={logoImg} alt='logo' className='logo' />
        {/* End logo */}
        {/* Start Currency And Cart */}
        <NavActions
          currencies={props.currencies}
          currState={props.currState}
          changeCurrState={props.changeCurrState}
          activeCurrency={props.activeCurrency}
          changeCurrency={props.changeCurrency}
          cartData={props.cartData}
          cartState={props.cartState}
          changeCartState={props.changeCartState}
          changeAttr={props.changeAttr}
          addOne={props.addOne}
          removeOne={props.removeOne}
          closeCartState={props.closeCartState}
        />
        {/* End Currency And Cart */}
      </div>
    </header>
  );
};
export default Nav;
