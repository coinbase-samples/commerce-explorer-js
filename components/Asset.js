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
import { useContext, useState } from "react";
import { CartContext } from "../context/cartContext";
import { Button } from "@cloudscape-design/components";
import styles from "../styles/Products.module.css";
import QRCode from "react-qr-code";

const Asset = ({ asset }) => {
  const { chargeAddresses, exchangeRate, totalPrice, chargeDetails } =
    useContext(CartContext);
  const selectedAsset = new String(asset).toLowerCase();
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const formattedPrice = Number(totalPrice);

  return (
    <div className={styles.expandable}>
      <div>
        <QRCode
          size={256}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={chargeAddresses[selectedAsset]}
          viewBox={`0 0 256 256`}
        />
      </div>
      <div className={styles.expandableImage}>
        <p>
          {`Payment Address: ${chargeAddresses[selectedAsset]}  `}
          <Button
            iconName="copy"
            onClick={() => {
              navigator.clipboard.writeText(chargeAddresses[selectedAsset]);
            }}
          ></Button>
        </p>

        <p>
          {`${exchangeRate[selectedAsset]["amount"]}  ${asset}  `}
          <Button
            iconName="copy"
            onClick={() => {
              navigator.clipboard.writeText(
                exchangeRate[selectedAsset]["amount"]
              );
            }}
          ></Button>
        </p>
        <p>{formatter.format(formattedPrice)}</p>
      </div>
    </div>
  );
};

export default Asset;
