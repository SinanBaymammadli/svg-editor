import React, { Component, MouseEvent } from "react";
import uuid from "uuid/v1";
import classNames from "classnames";
import styles from "./SvgEditor.module.scss";
import bg from "../../../assets/ma-1.jpg";
import { IShape, Coordinate } from "../models";
import Path from "../Path/Path";

enum EMode {
  FREE = "FREE",
  DRAW_SELECTED = "DRAW_SELECTED",
  DRAWING = "DRAWING",
}

interface IProps {
  width: string;
  height: string;
  onShapeCreated: (shape: IShape) => void;
  onShapeDeleted: (shape: IShape) => void;
}

interface IState {
  shapes: IShape[];
  mode: EMode;
  currentShape: IShape;
  selectShapeId?: string;
}
export default class SvgEditor extends Component<IProps, IState> {
  state: IState = {
    shapes: [
      {
        id: "250f3a50-feed-11e9-a680-072687c52a0a",
        startCordinate: {
          x: 35,
          y: 67,
        },
        closed: true,
        lines: [
          {
            x: 217,
            y: 44,
          },
          {
            x: 192,
            y: 247,
          },
          {
            x: 44,
            y: 219,
          },
          {
            x: 35,
            y: 67,
          },
        ],
      },
    ],
    mode: EMode.FREE,
    currentShape: {
      id: "",
      startCordinate: { x: 0, y: 0 },
      lines: [],
      closed: false,
    },
    selectShapeId: undefined,
  };

  isCollides = (startCoordinate: Coordinate, lastCordinate: Coordinate, radius = 5): boolean => {
    const xd = startCoordinate.x - lastCordinate.x;
    const yd = startCoordinate.y - lastCordinate.y;
    const wt = radius * 2;
    return xd * xd + yd * yd <= wt * wt;
  };

  onMouseDown = (event: MouseEvent): void => {
    const svg = document.getElementById("svg");
    if (svg) {
      const { left, top } = svg.getBoundingClientRect();

      const x = event.clientX - left;
      const y = event.clientY - top;
      const { mode, currentShape } = this.state;
      const { onShapeCreated } = this.props;

      if (mode === EMode.DRAW_SELECTED) {
        this.setState({
          mode: EMode.DRAWING,
          currentShape: {
            id: uuid(),
            startCordinate: { x, y },
            closed: false,
            lines: [{ x, y }],
          },
        });
      } else if (mode === EMode.DRAWING) {
        const shouldClose = this.isCollides(currentShape.startCordinate, { x, y });

        if (shouldClose) {
          this.setState(
            (prevState) => ({
              currentShape: {
                ...prevState.currentShape,
                startCordinate: { x: 0, y: 0 },
                lines: [],
                closed: false,
              },
              shapes: [
                ...prevState.shapes,
                {
                  ...prevState.currentShape,
                  closed: true,
                },
              ],
              mode: EMode.FREE,
            }),
            () => {
              const { shapes } = this.state;
              onShapeCreated(shapes[shapes.length - 1]);
            },
          );
        } else {
          this.setState((prevState) => ({
            currentShape: {
              ...prevState.currentShape,
              closed: false,
              lines: [...prevState.currentShape.lines, { x, y }],
            },
          }));
        }
      }
    }
  };

  onMouseMove = (event: MouseEvent): void => {
    const svg = document.getElementById("svg");
    if (svg) {
      const { left, top } = svg.getBoundingClientRect();
      const x = event.clientX - left;
      const y = event.clientY - top;
      const { mode, currentShape } = this.state;

      if (mode === EMode.DRAWING) {
        const shouldClose = this.isCollides(currentShape.startCordinate, { x, y });

        this.setState((prevState) => {
          const copiedLines = prevState.currentShape.lines;
          copiedLines[copiedLines.length - 1].x = shouldClose ? currentShape.startCordinate.x : x;
          copiedLines[copiedLines.length - 1].y = shouldClose ? currentShape.startCordinate.y : y;

          return {
            currentShape: {
              ...prevState.currentShape,
              lines: copiedLines,
            },
          };
        });
      }
    }
  };

  startDrawing = (): void => {
    this.setState({
      mode: EMode.DRAW_SELECTED,
    });
  };

  toggleSelectedShapeId = (id: string): void => {
    this.setState({
      selectShapeId: id,
    });
  };

  onDeleteShape = (): void => {
    const { onShapeDeleted } = this.props;
    const { shapes, selectShapeId } = this.state;
    const deletedShape = shapes.find((shape) => shape.id === selectShapeId);

    if (deletedShape) {
      onShapeDeleted(deletedShape);
    }

    this.setState({
      selectShapeId: undefined,
      shapes: shapes.filter((shape) => shape.id !== selectShapeId),
    });
  };

  render(): JSX.Element {
    const { width, height } = this.props;
    const { shapes, currentShape, selectShapeId } = this.state;

    return (
      <div className={styles.wrapper}>
        <div className={styles.tools}>
          <button onClick={this.startDrawing}>draw</button>
          <button onClick={this.onDeleteShape}>delete</button>
        </div>
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          id="svg"
          style={{
            background: "#eee",
          }}
          onMouseDown={this.onMouseDown}
          onMouseMove={this.onMouseMove} //throttle this function?
        >
          <image href={bg} x="0" y="0" width={width} height={height} />
          {shapes.map((shape, i) => {
            return (
              <Path
                className={classNames(styles.shape, {
                  [styles.selected]: shape.id === selectShapeId,
                })}
                key={i}
                shape={shape}
                onClick={(): void => this.toggleSelectedShapeId(shape.id)}
              />
            );
          })}

          {currentShape && <Path shape={currentShape} fill="transparent" />}
        </svg>
      </div>
    );
  }
}
