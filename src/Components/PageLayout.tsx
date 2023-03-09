import React, { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import { useIsAuthenticated } from "@azure/msal-react";
import { SignInButton } from "./SignInButton";
import HomePage from "../HomePage";
import { useGetAccessToken } from "../graph";

/**
 * Renders the navbar component with a sign-in button if a user is not authenticated
 */
export const PageLayout = (props: any) => {
  const isAuthenticated = useIsAuthenticated();
  const [token, setToken] = useState<any>();
   debugger;
  let { getToken } = useGetAccessToken();

  useEffect(() => {
    getToken().then((response) => setToken(response.accessToken));
  }, []);

  return (
    <>
      <Navbar bg="primary" variant="light">
        {isAuthenticated && token ? (
          <HomePage token={token} />
        ) : (
          // props.children
          <SignInButton />
        )}
      </Navbar>
      {/* <h5>
        <center>
          Welcome to the Microsoft Authentication Library For React Tutorial
        </center>
      </h5>
      <br />
      <br /> */}
      {/* {props.children} */}
    </>
  );
};
