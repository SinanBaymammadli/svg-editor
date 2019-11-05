import React, { SVGAttributes } from "react";
import { IShape } from "../models";

const buildPath = (shape: IShape): string => {
  const { lines } = shape;

  const curves = lines.map((lineTo) => `L ${lineTo.x} ${lineTo.y}`);

  let instructions = [`M ${shape.startCordinate.x} ${shape.startCordinate.y}`, ...curves];

  if (shape.closed) {
    instructions = [...instructions, "Z"];
  }

  return instructions.join(" ");
};

interface IProps extends SVGAttributes<SVGPathElement> {
  shape: IShape;
  fill?: string;
}

const Path: React.FC<IProps> = (props: IProps) => {
  const { shape, fill, ...rest } = props;
  return <path {...rest} d={buildPath(shape)} fill={fill} stroke="gray" strokeWidth={2} />;
};

export default Path;
