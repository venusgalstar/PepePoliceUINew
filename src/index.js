/*  Index collects all modules and embeds them in <StrictMode>
    to obtain potential errors*/

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from "react";

import App from "./App";
import { WalletButton } from "./Walletbutton";

// selector of root component in DOM
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
// render of all components
root.render(
  <StrictMode>
    <App />
    <WalletButton />
  </StrictMode>
);
