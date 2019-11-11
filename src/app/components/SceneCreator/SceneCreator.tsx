import React, { Component } from "react";
import styles from "./SceneCreator.module.scss";
import { ITemplateView, ISceneForm, IShapeInfo, IShape } from "../../data/models";
import Path from "../Path/Path";
import { ShapeInfoForm } from "./ShapeInfoForm";

interface IProps {
  template: ITemplateView;
  onSubmit: (sceneForm: ISceneForm) => void;
  shapeInfos?: IShapeInfo[];
}

interface IState {
  shapeInfos: IShapeInfo[];
  selectedShape?: IShape;
}

export class SceneCreator extends Component<IProps, IState> {
  state: IState = {
    shapeInfos: [],
  };

  componentDidMount = (): void => {
    const { shapeInfos } = this.props;

    if (shapeInfos) {
      this.setState({
        shapeInfos,
      });
    }
  };

  onSave = (): void => {
    const { onSubmit, template } = this.props;
    const { shapeInfos } = this.state;

    onSubmit({
      templateId: template.id,
      shapeInfos: shapeInfos,
    });
  };

  addInfo = (shapeInfo: IShapeInfo): void => {
    this.setState((prevState) => ({
      shapeInfos: [...prevState.shapeInfos.filter((i) => i.shapeId !== shapeInfo.shapeId), shapeInfo],
    }));
  };

  selectShape = (shape: IShape): void => {
    this.setState({
      selectedShape: shape,
    });
  };

  getSelectedShapeInfo = (selectedShape: IShape): IShapeInfo => {
    const { shapeInfos } = this.state;
    const defaultShapeInfo = {
      shapeId: selectedShape.id,
      title: "",
    };
    const selectedShapeInfo = shapeInfos.find((s) => s.shapeId === selectedShape.id);

    return selectedShapeInfo || defaultShapeInfo;
  };

  render(): JSX.Element {
    const {
      template,
      template: { width, height },
    } = this.props;
    const { selectedShape } = this.state;

    return (
      <div className={styles.wrapper}>
        <div className={styles.tools}>{template && <button onClick={this.onSave}>Save</button>}</div>
        {template && (
          <svg className={styles.svg} viewBox={`0 0 ${width} ${height}`}>
            <image href={template.imageUrl} x="0" y="0" width={template.width} height={template.height} />
            {template.shapes.map((shape, i) => {
              return <Path key={i} shape={shape} onClick={(): void => this.selectShape(shape)} />;
            })}
          </svg>
        )}
        {selectedShape && (
          <ShapeInfoForm
            key={selectedShape.id}
            onSubmit={this.addInfo}
            shapeInfo={this.getSelectedShapeInfo(selectedShape)}
          />
        )}
      </div>
    );
  }
}
