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

import styles from "../styles/Products.module.css";
import Button from "@cloudscape-design/components/button";
import Link from "next/link";

const PaymentCompleted = ({ code }) => {
  return (
    <div className={styles.expandable}>
      <h2>Thank you!</h2>
      <h3>Your payment for order #{code} is processing</h3>
      <h3>Visit your orders page to get the latest status of your order.</h3>
      <Link href={`/charges`}>
        <a>
          <Button variant="primary">View Orders</Button>
        </a>
      </Link>
    </div>
  );
};

export default PaymentCompleted;
