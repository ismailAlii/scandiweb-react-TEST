import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// graphQl
import { useQuery, gql } from '@apollo/client';
// Components
import Nav from './components/nav/Nav';
import Content from './components/Content';
import ProductDescription from './components/ProductDescription';
import Cart from './components/Cart';
/* Start GraphQL */
const GET_DATA = gql`
  query {
    currencies {
      label
      symbol
    }
    categories {
      name
      products {
        id
        name
        inStock
        gallery
        description
        category
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    }
  }
`;
/* End GraphQL */
const App = () => {
  /* Start Mini Cart Option */
  const [cartState, setCartState] = React.useState(false);
  const changeCartState = () => {
    setCartState(!cartState);
  };
  const closeCartState = () => {
    setCartState(false);
  };
  /* End Mini Cart Option */
  /* Start Currencies option State */
  const [activeCurrency, setActiveCurrency] = React.useState('$');
  const changeCurrency = (currency) => {
    setActiveCurrency(currency);
  };
  // curr options
  const [currState, setCurrState] = React.useState(false);
  const changeCurrState = () => {
    setCurrState(!currState);
  };
  /* End Currencies option State */
  /* Start Change Categories */
  const [cat, setCat] = React.useState('all');
  const { error, data, loading } = useQuery(GET_DATA);
  let changeCat = (cat) => {
    setCat(cat);
  };
  /* End Change Categories */
  /* Start Sending Data To Cart */
  const [cartData, setCartData] = React.useState([]);
  const getData = (product, attributes) => {
    const newProduct = {
      prod: product,
      attr: attributes,
      num: 1,
    };
    const onlyId = cartData.map((i) => {
      return i.prod.id;
    });
    if (!onlyId.includes(newProduct.prod.id)) {
      setCartData((prevState) => {
        return [...prevState, newProduct];
      });
    }
  };
  /* End Sending Data To Cart */
  /* End Overlay */
  let overLay = () => {
    setCurrState(false);
    setCartState(false);
  };
  /* End Overlay */
  /* !!!!!!!!!!!!!!!!!!!Start Cart!!!!!!!!!!!!!!!!!!! */
  // change Attributes
  let changeAttr = (attrId, attrIndex, prodId) => {
    setCartData((prevState) => {
      return prevState.map((item) => {
        if (item.prod.id === prodId) {
          return {
            ...item,
            attr: item.attr.map((item) => {
              return item.id === attrId
                ? { ...item, activeIndex: attrIndex }
                : item;
            }),
          };
        } else {
          return item;
        }
      });
    });
  };
  // change product amount +1 (num)
  let addOne = (prodId) => {
    setCartData((prevState) => {
      return prevState.map((item) => {
        if (item.prod.id === prodId) {
          return { ...item, num: item.num + 1 };
        } else {
          return item;
        }
      });
    });
  };
  // change product amount -1 (num)
  let removeOne = (prodId) => {
    setCartData((prevState) => {
      return prevState.map((item) => {
        if (item.prod.id === prodId) {
          return {
            ...item,
            num: item.num > 0 ? item.num - 1 : item.num,
          };
        } else {
          return item;
        }
      });
    });
    setCartData((prevState) => {
      return prevState.filter((item) => {
        return item.num > 0;
      });
    });
  };
  /* !!!!!!!!!!!!!!!!!!!End Cart!!!!!!!!!!!!!!!!!!! */
  if (loading) {
    return <h1>loading...</h1>;
  }
  return (
    <Router>
      <main>
        <div
          className={`overlay ${currState && 'active'} ${cartState &&
            'cart-active'}`}
          onClick={overLay}
        ></div>
        {/* Start Navigation Bar */}
        <Nav
          navItem={data.categories}
          cat={cat}
          changeCat={changeCat}
          currencies={data.currencies}
          currState={currState}
          changeCurrency={changeCurrency}
          changeCurrState={changeCurrState}
          activeCurrency={activeCurrency}
          cartData={cartData}
          cartState={cartState}
          changeCartState={changeCartState}
          changeAttr={changeAttr}
          addOne={addOne}
          removeOne={removeOne}
          closeCartState={closeCartState}
        />
        {/* End Navigation Bar */}
        {/* Start Content */}
        <div className='container'>
          <Routes>
            <Route
              path='/'
              element={
                <>
                  <h1>{cat}</h1>
                  {data.categories.map((item, index) => {
                    return item.name === cat ? (
                      <Content
                        key={index}
                        catName={item.name}
                        products={item.products}
                        activeCurrency={activeCurrency}
                      />
                    ) : (
                      ''
                    );
                  })}
                </>
              }
            />
            <Route
              path='/cart'
              element={
                <Cart
                  cartData={cartData}
                  activeCurrency={activeCurrency}
                  changeAttr={changeAttr}
                  addOne={addOne}
                  removeOne={removeOne}
                />
              }
            />
            <Route
              path='/:id'
              element={
                <ProductDescription
                  products={data.categories}
                  cat={cat}
                  activeCurrency={activeCurrency}
                  getData={getData}
                />
              }
            />
          </Routes>
        </div>
        {/* End Content */}
      </main>
    </Router>
  );
};

export default App;
