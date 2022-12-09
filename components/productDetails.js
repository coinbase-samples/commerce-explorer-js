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

import Link from "next/link";
import { Container, Button } from "@cloudscape-design/components";
import styles from "../styles/Products.module.css";

export default function ProductDetails(props) {
  const { products } = props;

  return (
    <div className={styles.image}>
      <Container>
        <h2>Chairs</h2>
        <div className={styles.container}>
          {products.map((products) => {
            return (
              <Link href={`/product/${products.id}`} key={products.id}>
                <a>
                  <Container className={styles.square}>
                    <img src={`../images/furniture/${products.image}`} />
                    {/* <img src={products.image} /> */}
                    <h3>{products.name}</h3>
                    <div className={styles.icon}>
                      <p>${products.price}</p>
                      <Button>View</Button>
                    </div>
                  </Container>
                </a>
              </Link>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
