import React from "react";

export interface IProps {
  id: string;
}

export function SceneEdit(props: IProps): JSX.Element {
  const { id } = props;

  return <div>{id}</div>;
}
