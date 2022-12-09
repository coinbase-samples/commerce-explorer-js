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

import Layout from "../components/Layouts";
import ProductDetails from "../components/ProductDetails";

export default function HomePage({ furniture }) {
  const { products } = furniture;

  return (
    <Layout>
      <h1>Latest Products</h1>
      <ProductDetails products={products}></ProductDetails>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const response = await fetch(`http://localhost:3000/api/products`);
  const furniture = await response.json();

  return {
    props: { furniture },
  };
}
