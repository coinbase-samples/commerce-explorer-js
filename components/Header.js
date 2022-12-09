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

import React, { useContext } from "react";
import { TopNavigation } from "@cloudscape-design/components";
import { CartContext } from "../context/cartContext";
import { useRouter } from "next/router";

export default function Header() {
  const { totalPrice, qty } = useContext(CartContext);
  const router = useRouter();

  return (
    <TopNavigation
      identity={{
        href: "/",
        title: "Rose Interiors",
        logo: {
          src: "/rose-interiors-logo.png",
          alt: "rose-interiors-logo",
        },
      }}
      utilities={[
        {
          type: "menu-dropdown",
          text: `Cart Items ${qty} |  $ ${totalPrice}`,
          ariaLabel: "Cart",
          title: "Settings",
          items: [
            {
              id: "charges",
              text: "Orders",
              href: "/charges",
            },
          ],
        },
        {
          type: "menu-dropdown",
          text: "Patrick Hughes",
          iconName: "user-profile",
          iconAlign: "right",
          items: [
            { id: "profile", text: "Profile" },
            { id: "orders", text: "Order History" },
            { id: "account", text: "Account Settings" },
            { id: "signout", text: "Sign out" },
          ],
        },
      ]}
      i18nStrings={{
        searchIconAriaLabel: "Search",
        searchDismissIconAriaLabel: "Close search",
        overflowMenuTriggerText: "More",
        overflowMenuTitleText: "All",
        overflowMenuBackIconAriaLabel: "Back",
        overflowMenuDismissIconAriaLabel: "Close menu",
      }}
    />
  );
}
