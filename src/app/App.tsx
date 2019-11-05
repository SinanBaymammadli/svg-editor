import React from "react";
import SvgEditor from "./components/SvgEditor/SvgEditor";
import SvgViewer from "./components/SvgViewer/SvgViewer";
import { IShape } from "./components/models";

const App: React.FC = () => {
  const data = {
    id: "1",
    backgroundImgUrl: "",
    items: [
      {
        id: "",
        type: "",
        shape: {},
      },
      {
        id: "",
        type: "",
        shape: {},
      },
    ],
  };

  return (
    <>
      <SvgEditor
        width="600"
        height="600"
        onShapeCreated={(shape: IShape): void => {
          console.log(shape);
        }}
        onShapeDeleted={(shape: IShape): void => {
          console.log(shape);
        }}
      />

      <SvgViewer />
    </>
  );
};

export default App;
