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

import Link from "next/link";
import styles from "../styles/Footer.module.css";

export default function Footer() {
  return (
    <div>
      <footer className={styles.footer}>
        <p>Copyright &copy; Rose Interiors 2022</p>
        <p>
          <Link href={"/about"}>About us</Link>
        </p>
      </footer>
    </div>
  );
}
