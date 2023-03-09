import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./authConfig";
function LoginSP() {
  const msalInstance = new PublicClientApplication(msalConfig);
  return <div> frf</div>;
}

export default LoginSP;
