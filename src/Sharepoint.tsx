import React from "react";
import {
  FilePicker,
  IFilePickerResult,
} from "@pnp/spfx-controls-react/lib/FilePicker";

function Sharepoint() {
  return (
    <div>
      {/* <FilePicker
        bingAPIKey="<BING API KEY>"
        accepts={[
          ".gif",
          ".jpg",
          ".jpeg",
          ".bmp",
          ".dib",
          ".tif",
          ".tiff",
          ".ico",
          ".png",
          ".jxr",
          ".svg",
        ]}
        buttonIcon="FileImage"
        onSave={(filePickerResult: IFilePickerResult[]) => {
          this.setState({ filePickerResult });
        }}
        onChange={(filePickerResult: IFilePickerResult[]) => {
          this.setState({ filePickerResult });
        }}
        context={this.props.context}
      /> */}
    </div>
  );
}

export default Sharepoint;
