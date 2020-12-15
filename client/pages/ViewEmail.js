import React, { useEffect, useState } from "react";
import Layout from "./components/Layout";
import Email from "./components/Email";
import store from "../store";

export default function ViewEmail() {

  return (
    <Layout>
      <Email userAuthor={false} />
    </Layout>
  );
}
