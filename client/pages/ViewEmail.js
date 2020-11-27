import React, { useEffect, useState } from "react";
import Layout from "./components/Layout";
import Email from "./components/Email";
import store from "../store";

export default function ViewEmail() {
  // const [author, setAuthor] = useState(null);

  // useEffect(() => {
  //   const storeState = store.getState();
  //   setAuthor(storeState.userAuthor)
  // })

  return (
    <Layout>
      <Email userAuthor={false} />
    </Layout>
  );
}
