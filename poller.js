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

const express = require("express");
require("dotenv").config();
const cors = require("cors");
const axios = require("axios");
const PORT = 8000;
const { getBackendHeaders } = require("./components/getBackendHeaders");

app = express();
app.use(cors());

//routes
app.get("/payments", async (req, res) => {
  console.log(req.query.code);
  const options = {
    method: "GET",
    url: `https://api.commerce.coinbase.com/charges/${req.query.code}`, //req.query.code
    headers: getBackendHeaders(),
  };

  try {
    axios.request(options).then((response) => {
      const payments = response.data.data.payments;
      res.status(200).send(payments);
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
