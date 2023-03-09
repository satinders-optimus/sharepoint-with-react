export const msalConfig = {
  auth: {
    clientId: "226bd8d9-c863-4d2a-aa1f-cca0484508ff",
    authority:
      "https://login.microsoftonline.com/b5db11ac-8f37-4109-a146-5d7a302f5881", // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
    redirectUri: "http://localhost:3000",
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: true, // Set this to "true" if you are having issues on IE11 or Edge
  },
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
  scopes: ["User.Read", "Files.Read", "Files.ReadWrite", "Files.ReadWrite.All"],
};

// Add the endpoints here for Microsoft Graph API services you'd like to use.
export const graphConfig = {
  graphDriveEndpoint: "https://graph.microsoft.com/v1.0/me/drive/root/children",
  driveUploadFile: (fileName: string) =>
    `https://graph.microsoft.com/v1.0/me/drive/root:/${fileName}:/content`,
  deleteDriveFile: (itemId: string) =>
    `https://graph.microsoft.com/v1.0/me/drive/items/${itemId}`,
};
