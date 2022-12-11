import { createStore } from "redux";
import { authReducer } from "./AuthState";
import { productsReducer } from "./ProductsState";

import { applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { followedProductsReducer } from "./FollowedProductsState";





export const productsStore = createStore(productsReducer, composeWithDevTools(applyMiddleware()));

export const authStore = createStore(authReducer, composeWithDevTools(applyMiddleware()));

export const followedProductsStore = createStore(followedProductsReducer, composeWithDevTools(applyMiddleware()));

