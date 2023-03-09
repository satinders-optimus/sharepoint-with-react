import { useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";
import { graphConfig, loginRequest } from "./authConfig";

/**
 * Attaches a given access token to a Microsoft Graph API call. Returns information about the user
 */
export function useMSGraph(accessToken: any) {
  // const { instance, accounts, inProgress } = useMsal();
  // const [accessToken, setAccessToken] = useState(null);
  // const [files, setFiles]: any = useState([]);
  // const request = {
  //   ...loginRequest,
  //   account: accounts[0],
  // };

  // useEffect(() => {
  //   instance
  //     .acquireTokenSilent(request)
  //     .then((response: any) => {
  //       console.log(response, "**** response ***");
  //       setAccessToken(response.accessToken);
  //     })
  //     .catch((e) => {
  //       instance.acquireTokenPopup(request).then((response: any) => {
  //         setAccessToken(response.accessToken);
  //       });
  //     });
  // }, []);

  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;

  headers.append("Authorization", bearer);

  const getFiles = () => {
    const options = {
      method: "GET",
      headers: headers,
    };

    return fetch(graphConfig.graphDriveEndpoint, options)
      .then((response) => {
        return response.json();
      })
      .catch((error) => console.log(error));
  };

  const createFolder = () => {
    headers.append("Content-Type", "application/json");

    const options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        name: "New Folder",
        folder: {},
      }),
    };

    return fetch(graphConfig.graphDriveEndpoint, options)
      .then((response) => response.json())
      .catch((error) => console.log(error));
  };

  const uploadFile = (file: File) => {
    const options = {
      method: "PUT",
      headers: headers,
      body: file,
    };

    return fetch(graphConfig.driveUploadFile(file.name), options)
      .then((response) => response.json())
      .catch((error) => console.log(error));
  };
  const deleteFile = (itemId: string) => {
    const options = {
      method: "DELETE",
      headers: headers,
    };

    return fetch(graphConfig.deleteDriveFile(itemId), options)
      .then((response) => {
        return response.json();
      })
      .catch((error) => console.log(error));
  };
  const updateFileName = (itemId: string, name: string) => {
    headers.append("Content-Type", "application/json");
    const options = {
      method: "PATCH",
      headers: headers,
      body: JSON.stringify({
        name: name,
      }),
    };

    return fetch(graphConfig.deleteDriveFile(itemId), options)
      .then((response) => {
        return response.json();
      })
      .catch((error) => console.log(error));
  };
  return { getFiles, createFolder, uploadFile, deleteFile, updateFileName };
}

export const useGetAccessToken = () => {
  const { instance, accounts } = useMsal();
  const request = {
    ...loginRequest,
    account: accounts[0],
  };

  const getToken = () =>
    instance.acquireTokenSilent(request).then((response) => response);

  return { getToken };
};
