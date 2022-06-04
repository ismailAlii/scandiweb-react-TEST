import React from 'react';
import { Link, useParams } from 'react-router-dom';
import parse from 'html-react-parser';

const ProductDescription = (props) => {
  let [imgIndex, setImgIndex] = React.useState(0);
  /* Start access product */
  let id = useParams().id;
  let thisProduct = props.products
    .filter((item) => item.name === props.cat)[0]
    .products.filter((item) => item.id === id)[0];
  /* End access product */

  /* Start Currency */
  let nowCurrency = thisProduct.prices.filter((item) => {
    return item.currency.symbol === props.activeCurrency;
  })[0];
  /* End Currency */

  // test.map((i) => 0)

  let test = [...thisProduct.attributes];
  let [testIndex, setTestIndex] = React.useState(
    test.map((item) => {
      return { ...item, activeIndex: 0 };
    })
  );

  return (
    <div className='description-page'>
      <div className='product-view'>
        {/* Start Thumbnails */}
        <div className='thumbs'>
          {thisProduct.gallery.map((item, index) => {
            if (index < 5) {
              return (
                <div
                  className={`img ${index === imgIndex && 'active'}`}
                  onClick={() => setImgIndex(index)}
                  key={index}
                >
                  <img src={item} alt='thumbnail' />
                </div>
              );
            }
          })}
        </div>
        {/* End Thumbnails */}
        <div className='img'>
          <img src={thisProduct.gallery[imgIndex]} alt='thumbnail' />
        </div>
      </div>
      <div className='product-info'>
        <h2 className='brand'>{thisProduct.brand}</h2>
        <h2 className='name'>{thisProduct.name}</h2>
        {/* Start Attributes */}
        <div className='attributes'>
          {testIndex.map((item) => {
            return (
              <div className='attr' key={item.id}>
                <p>{`${item.name}:`}</p>
                <ul>
                  {item.items.map((miniItem, index) => {
                    return item.type === 'text' ? (
                      <li
                        key={miniItem.id}
                        className={`text ${index === item.activeIndex &&
                          'active'}`}
                        onClick={() =>
                          setTestIndex((prevState) => {
                            return [
                              ...prevState.map((e, i) => {
                                return e.id === item.id
                                  ? { ...e, activeIndex: index }
                                  : e;
                              }),
                            ];
                          })
                        }
                      >
                        {miniItem.displayValue}
                      </li>
                    ) : (
                      <li
                        key={miniItem.id}
                        className={`color ${index === item.activeIndex &&
                          'active'}`}
                        style={{ backgroundColor: miniItem.value }}
                        onClick={() =>
                          setTestIndex((prevState) => {
                            return [
                              ...prevState.map((e, i) => {
                                return e.id === item.id
                                  ? { ...e, activeIndex: index }
                                  : e;
                              }),
                            ];
                          })
                        }
                      ></li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
        {/* End Attributes */}
        <div className='price'>
          <p>price:</p>
          <p className='amount'>
            {nowCurrency.currency.symbol}
            {nowCurrency.amount}
          </p>
        </div>
        <Link
          to='/'
          className='add-to-cart'
          onClick={() => props.getData(thisProduct, testIndex)}
        >
          add to cart
        </Link>
        <div className='description'>{parse(thisProduct.description)}</div>
      </div>
    </div>
  );
};
//thisProduct.description
export default ProductDescription;
