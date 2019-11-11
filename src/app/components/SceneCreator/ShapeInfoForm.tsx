import React, { useState } from "react";
import { IShapeInfo } from "../../data/models";

interface IProps {
  onSubmit: (shapeInfo: IShapeInfo) => void;
  shapeInfo: IShapeInfo;
}

export function ShapeInfoForm(props: IProps): JSX.Element {
  const { onSubmit, shapeInfo } = props;
  const [title, setTitle] = useState<string>((shapeInfo && shapeInfo.title) || "");

  return (
    <div>
      <input
        value={title}
        onChange={(e): void => {
          setTitle(e.target.value);
        }}
      />
      <button
        onClick={(): void => {
          onSubmit({
            shapeId: shapeInfo.shapeId,
            title,
          });
        }}
      >
        Save
      </button>
    </div>
  );
}
