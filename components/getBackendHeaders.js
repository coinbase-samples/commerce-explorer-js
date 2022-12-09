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
function getBackendHeaders() {
  try {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CC-Api-Key": process.env.NEXT_PUBLIC_API_KEY, //process.env.commerceKey,
      "X-CC-Version": process.env.NEXT_PUBLIC_API_VERSION, //process.env.NEXT_PUBLIC_API_VERSION,
      Mode: "cors",
    };
    return headers;
  } catch (error) {
    console.log(error);
  }
}

exports.getBackendHeaders = getBackendHeaders;
