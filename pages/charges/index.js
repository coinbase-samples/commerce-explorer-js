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

import { useEffect, useState } from "react";
import Layout from "../../components/Layouts";
import {
  Header,
  Table,
  Link,
  Box,
  Button,
  Pagination,
  CollectionPreferences,
} from "@cloudscape-design/components";
import axios from "axios";

export function ChargeActivity() {
  const [chargesLoaded, setChargesLoaded] = useState(false);
  const [charges, setCharges] = useState([]);
  const [selectedItems, setSelectedItems] = useState([{ name: "Item 2" }]);

  async function fetchCharge() {
    const options = {
      url: "http://localhost:3000/api/charges",
      method: "GET",
    };

    const response = await axios.request(options);
    const results = response.data;

    if (results?.length > 0) {
      setCharges(results);
      setChargesLoaded(true);
    }
  }

  function pricingType(e) {
    if (e.pricing_type === "no_price") {
      return "Donation";
    } else {
      return e.pricing.local.amount;
    }
  }

  function refundPage(string) {
    const link = <Link href={string}>{"Submit a request"}</Link>;
    return link;
  }
  function getStatus(e) {
    const timeline = e.timeline; //string
    const status = timeline[timeline.length - 1]["status"]; //get the latest status
    return status;
  }
  useEffect(() => {
    if (!chargesLoaded && charges?.length === 0) {
      fetchCharge();
    }
  }, [charges, chargesLoaded]);

  return (
    <Layout>
      <Table
        onSelectionChange={({ detail }) =>
          setSelectedItems(detail.selectedItems)
        }
        selectedItems={selectedItems}
        ariaLabels={{
          selectionGroupLabel: "Items selection",
          allItemsSelectionLabel: ({ selectedItems }) =>
            `${selectedItems.length} ${
              selectedItems.length === 1 ? "item" : "items"
            } selected`,
          itemSelectionLabel: ({ selectedItems }, item) => {
            const isItemSelected = selectedItems.filter(
              (i) => i.name === item.name
            ).length;
            return `${item.name} is ${isItemSelected ? "" : "not"} selected`;
          },
        }}
        columnDefinitions={[
          {
            id: "id",
            header: "Charge ID",
            cell: (e) => e.id,
            sortingField: "name",
          },
          {
            id: "date",
            header: "Date",
            cell: (e) => e.created_at,
            sortingField: "alt",
          },
          {
            id: "price",
            header: "Price",
            cell: (e) => pricingType(e),
          },
          {
            id: "status",
            header: "Status",
            cell: (e) => getStatus(e),
          },
          {
            id: "refund",
            header: "Request Refund",
            cell: (e) => refundPage("returns"),
          },
        ]}
        items={charges}
        loadingText="Loading resources"
        selectionType="multi"
        trackBy="name"
        visibleColumns={["id", "date", "price", "status"]}
        empty={
          <Box textAlign="center" color="inherit">
            <b>No resources</b>
            <Box padding={{ bottom: "s" }} variant="p" color="inherit">
              No resources to display.
            </Box>
          </Box>
        }
        header={
          <Header
            counter={
              selectedItems.length
                ? "(" + selectedItems.length + "/10)"
                : "(10)"
            }
          >
            Order History
          </Header>
        }
        pagination={
          <Pagination
            currentPageIndex={1}
            pagesCount={2}
            ariaLabels={{
              nextPageLabel: "Next page",
              previousPageLabel: "Previous page",
              pageLabel: (pageNumber) => `Page ${pageNumber} of all pages`,
            }}
          />
        }
        preferences={
          <CollectionPreferences
            title="Preferences"
            confirmLabel="Confirm"
            cancelLabel="Cancel"
            preferences={{
              pageSize: 10,
              visibleContent: ["id", "value", "price", "status"],
            }}
            pageSizePreference={{
              title: "Select page size",
              options: [
                { value: 10, label: "10 resources" },
                { value: 20, label: "20 resources" },
              ],
            }}
            visibleContentPreference={{
              title: "Select visible content",
              options: [
                {
                  label: "Main distribution properties",
                  options: [
                    {
                      id: "id",
                      label: "charge id",
                      editable: false,
                    },
                    { id: "date", label: "Charge date" },
                    { id: "price", label: "Price" },
                    {
                      id: "status",
                      label: "Status",
                    },
                  ],
                },
              ],
            }}
          />
        }
      />
    </Layout>
  );
}

export default ChargeActivity;
