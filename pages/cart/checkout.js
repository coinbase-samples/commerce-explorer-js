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

import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { CartContext } from "../../context/cartContext";
import Layout from "../../components/Layouts";
import Asset from "../../components/Asset";
import PaymentCompleted from "../../components/PaymentCompleted";
import {
  Container,
  Spinner,
  ButtonDropdown,
} from "@cloudscape-design/components";

export default function CheckoutPage() {
  const [bitcoinVisible, setBitcoinVisible] = useState(false);
  const [ethereumVisible, setEthereumVisible] = useState(false);
  const [usdcVisible, setUsdcVisible] = useState(false);
  const { code, loadStatus } = useContext(CartContext);
  const [asset, setAsset] = useState("Select");
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [isLoading, setLoading] = useState(loadStatus);

  async function Subscribe(code) {
    const options = {
      method: "GET",
      url: "http://localhost:8000/payments",
      params: { code: code },
    };

    let response = await axios.request(options);

    if (response.status == 502) {
      await Subscribe(code);
    } else if (response.status != 200) {
      console.log(response.statusText);
      // Reconnect in one second
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await Subscribe(code);
    } else {
      let message = await response;
      if (message.data.length > 0) {
        setPaymentComplete(true);
        setEthereumVisible(false);
        setBitcoinVisible(false);
        setUsdcVisible(false);
      } else {
        // Call Subscribe() again to get the next message
        setTimeout(async () => {
          await Subscribe(code);
        }, 2000);
      }
    }
  }

  Subscribe(code);

  //conditionally render asset
  useEffect(() => {
    asset === "Bitcoin" ? setBitcoinVisible(true) : setBitcoinVisible(false);
    asset === "Ethereum" ? setEthereumVisible(true) : setEthereumVisible(false);
    asset === "USDC" ? setUsdcVisible(true) : setUsdcVisible(false);
  }, [asset]);

  function assetSelection(e) {
    setAsset(e.detail.id);
  }

  const renderResult = () => {
    let result;
    asset === "Select"
      ? (result = "Choose a payment method")
      : (result = asset);
    return result;
  };

  {
    return (
      <Layout>
        <h1>Make a payment</h1>
        <Container>
          <h2>
            {paymentComplete ? (
              <PaymentCompleted code={code} />
            ) : (
              renderResult()
            )}
          </h2>
          {!paymentComplete && (
            <ButtonDropdown
              onItemClick={assetSelection}
              items={[
                {
                  text: "Assets",
                  items: [
                    { text: "Bitcoin", id: "Bitcoin" },
                    { text: "USDC", id: "USDC" },
                    { text: "Ethereum", id: "Ethereum" },
                  ],
                },
              ]}
            >
              {asset}
            </ButtonDropdown>
          )}
          {bitcoinVisible && <Asset asset={asset} />}
          {ethereumVisible && <Asset asset={asset} />}
          {usdcVisible && <Asset asset={asset} />}
        </Container>
      </Layout>
    );
  }
}
