import React, { Component } from "react";
import Path from "../Path/Path";
import styles from "./SceneViewer.module.scss";
import { ISceneView, ITemplateView, IShape, IShapeInfo } from "../../data/models";
import classNames from "classnames";

interface IProps {
  template: ITemplateView;
  scene: ISceneView;
}

interface IState {
  overlayShape: IShape;
  overlayShapeHovered: boolean;
  activeShapeInfo?: IShapeInfo;
}

function invertShape(shape: IShape, template: ITemplateView): IShape {
  return {
    id: "overlay",
    startCordinate: {
      x: 0,
      y: 0,
    },
    closed: true,
    points: [
      {
        x: 0,
        y: template.height,
      },
      {
        x: template.width,
        y: template.height,
      },
      {
        x: template.width,
        y: 0,
      },
      {
        x: 0,
        y: 0,
      },
      shape.startCordinate,
      ...shape.points,
      shape.startCordinate,
      {
        x: 0,
        y: 0,
      },
    ],
  };
}

export class SceneViewer extends Component<IProps, IState> {
  state: IState = {
    overlayShape: {
      id: "overlay",
      startCordinate: {
        x: 0,
        y: 0,
      },
      closed: true,
      points: [],
    },
    overlayShapeHovered: false,
    // activeShapeInfo:
  };

  onMouseEnter = (shape: IShape): void => {
    const {
      template,
      scene: { shapeInfos },
    } = this.props;
    const shapeInfo = shapeInfos.find((i) => i.shapeId === shape.id);

    this.setState({
      overlayShape: invertShape(shape, template),
      overlayShapeHovered: true,
      activeShapeInfo: shapeInfo,
    });
  };

  onMouseLeave = (): void => {
    this.setState({
      overlayShapeHovered: false,
    });
  };

  render(): JSX.Element {
    const {
      template: { width, height, shapes, imageUrl },
      // scene: { shapeInfos },
    } = this.props;
    const { overlayShape, overlayShapeHovered, activeShapeInfo } = this.state;

    return (
      <div className={styles.sceneViewer}>
        <svg className={styles.svg} viewBox={`0 0 ${width} ${height}`}>
          <image href={imageUrl} x="0" y="0" width={width} height={height} />
          <Path
            shape={overlayShape}
            fill="rgba(0, 38, 51, 0.5)"
            strokeWidth={0}
            className={classNames(styles.overlay, {
              [styles.overlayActive]: overlayShapeHovered,
            })}
          />
          {shapes.map((shape, i) => {
            // const shapeInfo = shapeInfos.find((i) => i.shapeId === shape.id);

            return (
              <a key={i} href="/template/list">
                <Path
                  className={styles.path}
                  shape={shape}
                  strokeWidth={0}
                  fill="transparent"
                  onMouseEnter={(): void => this.onMouseEnter(shape)}
                  onMouseLeave={(): void => this.onMouseLeave()}
                />
              </a>
            );
          })}
        </svg>

        {overlayShapeHovered && (
          <div className={styles.shapeInfo}>{(activeShapeInfo && activeShapeInfo.title) || "No info"}</div>
        )}
      </div>
    );
  }
}
