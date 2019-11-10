import React, { Component } from "react";
import styles from "./SceneCreator.module.scss";
import { ITemplateView, ISceneForm } from "../../data/models";
import Path from "../Path/Path";

interface IProps {
  template: ITemplateView;
  onSubmit: (sceneForm: ISceneForm) => void;
}

export class SceneCreator extends Component<IProps> {
  onSave = (): void => {
    const { onSubmit, template } = this.props;
    onSubmit({
      templateId: template.id,
      shapeInfos: [],
    });
  };

  render(): JSX.Element {
    const { template } = this.props;

    return (
      <div className={styles.wrapper}>
        <div className={styles.tools}>
          {/* <button onClick={this.deleteSelectedShape}>delete</button> */}
          {template && <button onClick={this.onSave}>Save</button>}
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
            // className={classNames({
            //   [styles.drawing]: mode === EMode.DRAWING || mode === EMode.DRAW_SELECTED,
            // })}
          >
            <image href={template.imageUrl} x="0" y="0" width={template.width} height={template.height} />
            {template.shapes.map((shape, i) => {
              return (
                <Path
                  // className={classNames(styles.shape, {
                  //   [styles.selected]: shape.id === selectShapeId,
                  // })}
                  key={i}
                  shape={shape}
                  // onClick={(): void => this.toggleSelectedShapeId(shape.id)}
                />
              );
            })}
          </svg>
        )}
      </div>
    );
  }
}
