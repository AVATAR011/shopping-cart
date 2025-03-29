// eslint-disable-next-line import/extensions
// import logo from "./logo.svg";
import React, { useState } from "react";
import { NavLink, Route, Switch, Redirect } from "react-router-dom";
import routes from "routes";

import Product from "components/Product";
import ProductList from "components/ProductList";
import PageNotFound from "components/commons/PageNotFound";
import CartItemsContext from "./contexts/CartItemsContext";
import Cart from "components/Cart";

import "./App.css";
import { set } from "ramda";

const App = () => {
    const [cartItems, setCartItems] = useState([]);

    return(
        <>
        {/* <div className="flex space-x-2">
            <NavLink exact activeClassName="underline font-bold" to="/">
                Home
            </NavLink>
            <NavLink exact activeClassName="underline font-bold" to="/product">
                Product
            </NavLink>
        </div> */}
        <CartItemsContext.Provider value={[cartItems, setCartItems]}>
        <Switch>
            <Route exact component={Cart} path={routes.cart}/>
            <Route exact component={ProductList} path={routes.products.index} />
            <Route exact component={Product} path={routes.products.show} />
            <Redirect exact from={routes.root} to={routes.products.index} />
            <Route component={PageNotFound} path="*" />
        </Switch>
        </CartItemsContext.Provider>
        </>
    )
};

export default App;
