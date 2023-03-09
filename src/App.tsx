import React, { useEffect, useState } from "react";
import "./App.css";
import { PageLayout } from "./Components/PageLayout";
import { useMSGraph } from "./graph";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./HomePage";
function App() {
  // const { getFiles, uploadFile } = useMSGraph();
  // const [files, setFiles]: any = useState([]);
  // const getFIlesFromDrive = () => {
  //   getFiles().then((response) => setFiles(response.value));
  //   // setFiles(getFiles());
  //   // console.log(files, " filessss");
  // };
  // const onFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log(e, "event file");
  //   if (e.target.files) {
  //     const file = e.target.files[0];
  //     uploadFile(file);
  //   }
  // };

  return (
    <div className="App">
      <PageLayout>
        {/* <button onClick={getFIlesFromDrive}>Get Files</button>
        <input type="file" onChange={onFileUpload}></input> */}
      </PageLayout>
    </div>
  );
}

export default App;
