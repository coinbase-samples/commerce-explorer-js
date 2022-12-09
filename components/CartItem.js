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

import { Container, Button } from "@cloudscape-design/components";
import styles from "../styles/Products.module.css";
import React, { useContext } from "react";
import { CartContext } from "../context/cartContext";

export default function CartItem({ product }) {
  const { items, removeItem } = useContext(CartContext);
  const removeProduct = () => {
    removeItem(product, items);
  };

  return (
    <div className={styles.container}>
      <Container className={styles.image}>
        <img
          src={`../images/furniture/${product.image}`}
          alt={product.name}
        ></img>
        <h3>{product.name}</h3>
        <div>${product.price}</div>
        <p>Quantity: {product.qty}</p>
        <Button
          onClick={removeProduct}
          iconAlign="right"
          iconName="close"
          variant="warning"
        >
          Remove Item
        </Button>
      </Container>
    </div>
  );
}
