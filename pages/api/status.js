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
import { getBackendHeaders } from "../../components/getBackendHeaders";

const Status = async (req, res) => {
  const chargeCodeOrChargeID = req.body;
  const url = `https://api.commerce.coinbase.com/charges/${chargeCodeOrChargeID}`;
  const headers = getBackendHeaders();
  console.log("code: ", req.body);
  try {
    const resp = await axios.get(url, headers);
    const timeline = resp.data.data.timeline; //array of statuses
    const lastStatus = JSON.stringify(timeline[timeline.length - 1]["status"]);
    console.log(lastStatus);
    return res.status(200).json(lastStatus);
  } catch (error) {
    console.log(error);
  }
};

export default Status;
