import React from "react";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import { Provider } from "react-redux";
import Router from "./routes/Router";
import Layout from "./components/Layout/Layout";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <CssBaseline />
        <Layout>
          <Router />
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
