import Layout from "../components/Layouts";
import {
  Container,
  Header,
  FormField,
  Input,
  Select,
  Button,
} from "@cloudscape-design/components";
import { useState } from "react";

export default function ReturnPage() {
  const [emailAddress, setEmailAddress] = useState("");
  const [orderCode, setOrderCode] = useState("");
  const [blockchainNetwork, setBlockchainNetwork] = useState("");
  const [refundReason, setRefundReason] = useState({
    label: "-",
    id: "0",
  });
  return (
    <Layout>
      <h1>Submit a return request</h1>
      <Container>
        <FormField
          description="Enter in an email address where you would like to receive confirmation."
          label="Your email address"
        >
          <Input
            value={emailAddress}
            onChange={(event) => setEmailAddress(event.detail.value)}
          />
        </FormField>
        <FormField
          description="The order code that corresponds with your return request."
          label="Your order code"
        >
          <Input
            value={orderCode}
            onChange={(event) => setOrderCode(event.detail.value)}
          />
        </FormField>
        <FormField
          description="The reason for wanting to return an item"
          label="Refund reason"
        >
          <Select
            selectedOption={refundReason}
            onChange={({ detail }) => setRefundReason(detail.selectedOption)}
            options={[
              { label: "No longer need", id: "1" },
              { label: "Product arrived late", id: "2" },
              { label: "Service or product was damaged", id: "3" },
              { label: "Did not meet expectations", id: "4" },
              { label: "Found a better price", id: "5" },
            ]}
          />
        </FormField>
        <FormField
          description="This is a description."
          label="Blockchain Network"
        >
          <Select
            selectedOption={blockchainNetwork}
            onChange={({ detail }) =>
              setBlockchainNetwork(detail.selectedOption)
            }
            options={[
              { label: "Bitcoin", id: "1" },
              { label: "Ethereum", id: "2" },
              { label: "Doge", id: "3" },
              { label: "Polygon / MATIC", id: "4" },
            ]}
          />
        </FormField>
        <br></br>
        <Button variant="primary">Submit</Button>
      </Container>
    </Layout>
  );
}
