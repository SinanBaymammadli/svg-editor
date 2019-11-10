import React, { Component, MouseEvent, ChangeEvent } from "react";
import uuid from "uuid/v1";
import classNames from "classnames";
import styles from "./TemplateCreator.module.scss";
import { IShape, Coordinate, ITemplateForm, ITemplateView } from "../../data/models";
import Path from "../Path/Path";

enum EMode {
  FREE = "FREE",
  DRAW_SELECTED = "DRAW_SELECTED",
  DRAWING = "DRAWING",
}

interface IProps {
  width: number;
  template?: ITemplateView;
  onSubmit: (template: ITemplateForm) => void;
}

interface IState {
  mode: EMode;
  currentShape: IShape;
  selectShapeId?: string;
  template?: ITemplateForm;
}

export class TemplateCreator extends Component<IProps, IState> {
  state: IState = {
    mode: EMode.FREE,
    currentShape: {
      id: "",
      startCordinate: { x: 0, y: 0 },
      points: [],
      closed: false,
    },
  };

  static getDerivedStateFromProps(props: IProps, state: IState): IState | null {
    const { template } = props;

    if (template) {
      return {
        ...state,
        template,
      };
    }

    return null;
  }

  isCollides = (startCoordinate: Coordinate, lastCordinate: Coordinate, radius = 5): boolean => {
    const xd = startCoordinate.x - lastCordinate.x;
    const yd = startCoordinate.y - lastCordinate.y;
    const wt = radius * 2;
    return xd * xd + yd * yd <= wt * wt;
  };

  startDrawing = (startCoordinate: Coordinate): void => {
    const { x, y } = startCoordinate;

    this.setState({
      mode: EMode.DRAWING,
      currentShape: {
        id: uuid(),
        startCordinate: { x, y },
        closed: false,
        points: [{ x, y }],
      },
    });
  };

  addPoint = (point: Coordinate): void => {
    const { x, y } = point;

    this.setState((prevState) => ({
      currentShape: {
        ...prevState.currentShape,
        points: [...prevState.currentShape.points, { x, y }],
      },
    }));
  };

  closeShape = (): void => {
    this.setState((prevState) => {
      if (prevState.template) {
        console.log(prevState.currentShape);

        return {
          currentShape: {
            ...prevState.currentShape,
            startCordinate: { x: 0, y: 0 },
            points: [],
            closed: false,
          },
          template: {
            ...prevState.template,
            shapes: [
              ...prevState.template.shapes,
              {
                ...prevState.currentShape,
                closed: true,
              },
            ],
          },
          mode: EMode.FREE,
        };
      }

      return prevState;
    });
  };

  getMousePoision = (event: MouseEvent): Coordinate => {
    const svg = document.getElementById("svg");
    let x = 0;
    let y = 0;

    if (svg) {
      const { left, top } = svg.getBoundingClientRect();

      x = event.clientX - left;
      y = event.clientY - top;
    }

    return { x, y };
  };

  onMouseDown = (event: MouseEvent): void => {
    const position = this.getMousePoision(event);
    const { mode, currentShape } = this.state;

    if (mode === EMode.DRAW_SELECTED) {
      this.startDrawing(position);
    } else if (mode === EMode.DRAWING) {
      const shouldClose = this.isCollides(currentShape.startCordinate, position);

      if (shouldClose) {
        this.closeShape();
      } else {
        this.addPoint(position);
      }
    }
  };

  onMouseMove = (event: MouseEvent): void => {
    const position = this.getMousePoision(event);
    const { mode, currentShape } = this.state;

    if (mode === EMode.DRAWING) {
      const shouldClose = this.isCollides(currentShape.startCordinate, position);

      this.setState((prevState) => {
        const copiedPoints = prevState.currentShape.points;
        copiedPoints[copiedPoints.length - 1].x = shouldClose ? currentShape.startCordinate.x : position.x;
        copiedPoints[copiedPoints.length - 1].y = shouldClose ? currentShape.startCordinate.y : position.y;

        return {
          currentShape: {
            ...prevState.currentShape,
            points: copiedPoints,
          },
        };
      });
    }
  };

  selectPen = (): void => {
    this.setState({
      mode: EMode.DRAW_SELECTED,
    });
  };

  toggleSelectedShapeId = (id: string): void => {
    this.setState({
      selectShapeId: id,
    });
  };

  deleteSelectedShape = (): void => {
    const { template, selectShapeId } = this.state;

    if (template) {
      this.setState({
        selectShapeId: undefined,
        template: {
          ...template,
          shapes: template.shapes.filter((shape) => shape.id !== selectShapeId),
        },
      });
    }
  };

  /// Image
  handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();

    const reader = new FileReader();
    const { files } = e.target;

    if (files && files.length) {
      const file = files[0];

      reader.onloadend = (): void => {
        const bgImgUrl = reader.result ? reader.result.toString() : undefined;
        if (bgImgUrl) {
          const image = new Image();

          image.onload = (): void => {
            this.addImage(file, bgImgUrl, image.naturalWidth, image.naturalHeight);
          };

          image.src = bgImgUrl;
        }
      };

      reader.readAsDataURL(file);
    }
  };

  addImage = (imageFile: File, imageUrl: string, imageWidth: number, imageHeight: number): void => {
    const { width } = this.props;

    const template: ITemplateForm = {
      imageFile,
      imageUrl,
      width,
      height: (width * imageHeight) / imageWidth, // Preseving aspect ratio of image
      shapes: [],
    };

    this.setState({
      template,
    });
  };
  /// Image

  /// Submit
  onSubmit = (): void => {
    const { onSubmit } = this.props;
    const { template } = this.state;

    if (template) {
      onSubmit(template);
    }
  };
  /// Submit

  render(): JSX.Element {
    const { template, mode, currentShape, selectShapeId } = this.state;

    return (
      <div className={styles.wrapper}>
        <div className={styles.tools}>
          <button onClick={this.selectPen}>draw</button>
          <button onClick={this.deleteSelectedShape}>delete</button>
          {template && <button onClick={this.onSubmit}>Save</button>}
          <input type="file" onChange={this.handleImageChange} />
        </div>
        {template && (
          <svg
            width={template.width}
            height={template.height}
            viewBox={`0 0 ${template.width} ${template.height}`}
            id="svg"
            style={{
              background: "#eee",
            }}
            className={classNames({
              [styles.drawing]: mode === EMode.DRAWING || mode === EMode.DRAW_SELECTED,
            })}
            onMouseDown={this.onMouseDown}
            onMouseMove={this.onMouseMove} //throttle this function?
          >
            <image href={template.imageUrl} x="0" y="0" width={template.width} height={template.height} />
            {template.shapes.map((shape, i) => {
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
        )}
      </div>
    );
  }
}
