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

import axios from "axios";
import getFrontendHeaders from "../../components/getFrontendHeaders";

export default async function fetchCharges(req, res) {
  const options = {
    url: "https://api.commerce.coinbase.com/charges",
    method: "GET",
    headers: getFrontendHeaders(),
    mode: "cors",
  };

  try {
    const getCharges = await axios.request(options);
    //console.log(getCharges.data);
    const getChargesResponse = getCharges.data;
    const results = getChargesResponse.data;
    return res.status(200).json(results);
  } catch (e) {
    return e;
  }
}
