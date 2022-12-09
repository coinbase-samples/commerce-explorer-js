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

import Layout from "../../components/Layouts";
import {
  Button,
  Icon,
  Modal,
  Box,
  Container,
} from "@cloudscape-design/components";
import { useContext, useState } from "react";
import { CartContext } from "../../context/cartContext";
import { useRouter } from "next/router";
import styles from "../../styles/Products.module.css";

export default function ProductPage({ furniture }) {
  const product = furniture.product[0];
  const { addToCart, items } = useContext(CartContext);
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  const changeModal = () => {
    addToCart(product);
    const state = visible;
    const newState = !state;
    setVisible(newState);
  };

  const closeModal = () => {
    const state = visible;
    const newState = !state;
    setVisible(newState);
  };

  const checkoutCart = (e) => {
    e.preventDefault();
    addToCart(product);
    //createCharge();
    setTimeout(() => {
      router.push("/cart/");
    }, 1000);
  };

  return (
    <Layout>
      <Container className={styles.container}>
        <div className={styles.description}>
          <img src={`../images/furniture/${product.image}`} />
        </div>
        <div className={styles.description}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>${product.price} </p>
        </div>
        <div className={styles.description}>
          <Button onClick={closeModal}>
            <Modal
              onDismiss={changeModal}
              visible={visible}
              closeAriaLabel="Close modal"
              footer={
                <Box float="right">
                  <Button onClick={changeModal} variant="link">
                    Keep Shopping
                  </Button>
                  <Button onClick={checkoutCart} variant="primary">
                    Checkout
                  </Button>
                </Box>
              }
              header="Added to cart!"
            >
              {`You have added ${product.name} to your cart`}
            </Modal>
            {"Add to Cart "}
            <Icon
              variant={"normal"}
              svg={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.73779 19.75C7.73779 18.7835 8.52129 18 9.48779 18C10.4543 18 11.2378 18.7835 11.2378 19.75C11.2378 20.7165 10.4543 21.5 9.48779 21.5C8.52129 21.5 7.73779 20.7165 7.73779 19.75Z"
                    fill="currentColor"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17 19.75C17 18.7835 17.7835 18 18.75 18C19.7165 18 20.5 18.7835 20.5 19.75C20.5 20.7165 19.7165 21.5 18.75 21.5C17.7835 21.5 17 20.7165 17 19.75Z"
                    fill="currentColor"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2 3.98361C2 3.44038 2.44038 3 2.98361 3H6.26229C6.73111 3 7.13476 3.33087 7.22677 3.79057L7.88882 7.09836H21.0164C21.3095 7.09836 21.5874 7.22911 21.7743 7.45497C21.9611 7.68083 22.0375 7.97827 21.9826 8.26622L20.6697 15.1506C20.5498 15.7544 20.2213 16.2968 19.7417 16.6828C19.265 17.0666 18.6691 17.2716 18.0573 17.2623H10.1066C9.49487 17.2716 8.89897 17.0666 8.42218 16.6828C7.94293 16.297 7.61455 15.755 7.49445 15.1516C7.49439 15.1513 7.49432 15.151 7.49425 15.1506L6.12599 8.31445C6.11986 8.28912 6.1147 8.2634 6.11056 8.23735L5.45605 4.96721H2.98361C2.44038 4.96721 2 4.52684 2 3.98361ZM8.28256 9.06557L9.42378 14.7674C9.45376 14.9183 9.53588 15.0539 9.65576 15.1504C9.77564 15.2469 9.92564 15.2982 10.0795 15.2953L10.0984 15.2951H18.0656L18.0844 15.2953C18.2383 15.2982 18.3883 15.2469 18.5082 15.1504C18.6273 15.0545 18.7091 14.92 18.7396 14.7702C18.7398 14.7693 18.74 14.7683 18.7402 14.7674L19.8275 9.06557H8.28256Z"
                    fill="currentColor"
                  ></path>
                </svg>
              }
            ></Icon>
          </Button>
        </div>
      </Container>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  //include product id in fetch
  //context.params
  const API_URL = `http://localhost:3000/`;
  const response = await fetch(`${API_URL}/api/product/${context.params.id}`);
  console.log(response);
  const furniture = await response.json();
  console.log(furniture);

  return {
    props: { furniture },
  };
}
