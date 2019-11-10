import React, { Component } from "react";
import Path from "../Path/Path";
import styles from "./SceneViewer.module.scss";
import { ISceneView, ITemplateView } from "../../data/models";

interface IProps {
  template: ITemplateView;
  scene: ISceneView;
}

export class SceneViewer extends Component<IProps> {
  render(): JSX.Element {
    const {
      template: { width, height, shapes, imageUrl },
    } = this.props;

    return (
      <div>
        <svg className={styles.svg} viewBox={`0 0 ${width} ${height}`} id="svg">
          <image href={imageUrl} x="0" y="0" width={width} height={height} />
          {shapes.map((shape, i) => {
            return (
              <Path className={styles.path} key={i} shape={shape} onSelected={(shape): void => console.log(shape)} />
            );
          })}
        </svg>
      </div>
    );
  }
}
