import React, { SVGAttributes } from "react";
import { IShape } from "../../data/models";

const buildPath = (shape: IShape): string => {
  const { points } = shape;

  const curves = points.map((point) => `L ${point.x} ${point.y}`);

  let instructions = [`M ${shape.startCordinate.x} ${shape.startCordinate.y}`, ...curves];

  if (shape.closed) {
    instructions = [...instructions, "Z"];
  }

  return instructions.join(" ");
};

interface IProps extends SVGAttributes<SVGPathElement> {
  shape: IShape;
  fill?: string;
  onSelected?: (shape: IShape) => void;
}

const Path: React.FC<IProps> = (props: IProps) => {
  const { shape, fill, onSelected, onClick, ...rest } = props;

  return (
    <path
      {...rest}
      d={buildPath(shape)}
      fill={fill}
      stroke="gray"
      strokeWidth={1}
      onClick={(e: React.MouseEvent<SVGPathElement, MouseEvent>): void => {
        if (onSelected) {
          onSelected(shape);
        } else {
          onClick && onClick(e);
        }
      }}
    />
  );
};

export default Path;
