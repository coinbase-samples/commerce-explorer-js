/**
 * Copyright 2022 Coinbase Global, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { createContext, useState, useEffect } from "react";
import axios from "axios";

const defaultState = {
  items: [],
  totalPrice: 0,
};

export const CartContext = createContext(defaultState);
let ids = [];

export const CartProvider = ({ children }) => {
  const date = new Date().toString();
  const [items, setItems] = useState([]);
  const [totalPrice, setPrice] = useState(0);
  const [chargeDetails, setChargeDetails] = useState([]);
  const [chargeAddresses, setChargeAddresses] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [loadStatus, setLoadStatus] = useState(true);
  const [qty, setQty] = useState(0);
  const [code, setCode] = useState("");

  function updateProductQuantity(newProduct, cart) {
    let newQty = qty;
    let newCart = cart;
    if (cart.length === 0) {
      newProduct.qty = 1.0;
      console.log("added a new item to an empty cart");
      newCart.push(newProduct);
      ids.push(parseInt(newProduct.id));
      console.log("ids: ", ids);
      newQty += 1;
    } else if (cart.length > 0 && ids.includes(parseInt(newProduct.id))) {
      console.log("item is in the cart already");
      cart.forEach((itemInCart) => {
        if (itemInCart.id === newProduct.id) {
          console.log("item is in the cart already");
          itemInCart.qty += 1;
          newQty += 1;
        }
      });
    } else if (
      cart.length > 0 &&
      ids.includes(parseInt(newProduct.id)) === false
    ) {
      console.log("this is a new item");
      console.log(ids.includes(newProduct.id) === false);
      newProduct.qty = 1.0;
      newCart.push(newProduct);
      ids.push(parseInt(newProduct.id));
      console.log("ids: ", ids);
      newQty += 1;
    }
    console.log(ids);
    setQty(newQty);
  }

  function addToCart(item) {
    //check if it exist first and them add to items
    updateProductQuantity(item, items);
    //const newItems = [...items, newItem];
    //setItems(items);
    const newPrice = totalPrice + item.price;
    setPrice(newPrice);
    console.log("added item", items, newPrice); //change back to newItems
  }

  function removeItem(item, cart) {
    const index = cart.indexOf(item);
    //if the item is in the cart
    if (index > -1) {
      //update cart total
      if (totalPrice > 0) {
        const newPrice = totalPrice - item.price;
        setPrice(newPrice);
      }
      //update product quantity
      if (item.qty > 1) {
        item.qty -= 1;
      } else {
        cart.splice(index, 1);
      }
      setItems(cart);
      console.log(cart);
      console.log(totalPrice);
    }
  }

  async function createCharge() {
    //send post request to api/charges
    const options = {
      url: "http://localhost:3000/api/createcharge",
      method: "POST",
      data: {
        local_price: { amount: totalPrice, currency: "usd" },
        name: `Rose-Interiors-${date}`,
        pricing_type: "fixed_price",
        description: { items },
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response);
      const chargeData = response.data;
      const chargeDetails = chargeData.data;
      const xRate = chargeDetails.local_exchange_rates;
      const name = chargeDetails.name;
      const addresses = chargeDetails.addresses;
      const pricing = chargeDetails.pricing;
      const code = chargeDetails.code;
      const paymentDetails = [addresses, name, xRate, pricing];
      console.log(paymentDetails);
      setChargeDetails(paymentDetails);
      setChargeAddresses(addresses);
      setExchangeRate(chargeDetails.pricing);
      setLoadStatus(false);
      setCode(code);
    } catch (e) {
      console.log(e);
    }
  }

  const state = {
    items,
    totalPrice,
    addToCart,
    removeItem,
    createCharge,
    chargeDetails,
    chargeAddresses,
    exchangeRate,
    loadStatus,
    qty,
    code,
  };

  return <CartContext.Provider value={state}>{children}</CartContext.Provider>;
};
