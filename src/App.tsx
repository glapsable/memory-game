import React from "react";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import Router from "./routes/Router";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Layout>
        <Router />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
