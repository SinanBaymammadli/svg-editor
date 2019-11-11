import React, { useState, useEffect } from "react";
import { ISceneView, ITemplateView } from "../../data/models";
import { sceneRepo } from "../../data/scene_repo";
import { SceneCreator } from "../../components/SceneCreator/SceneCreator";
import { templateRepo } from "../../data/template_repo";

export interface IProps {
  id: string;
}

export function SceneEdit(props: IProps): JSX.Element {
  const { id } = props;
  const [scene, setScene] = useState<ISceneView | undefined>(undefined);
  const [template, setTemplate] = useState<ITemplateView | undefined>(undefined);

  useEffect(() => {
    setTemplate(templateRepo.getById(id));
  }, [id]);

  useEffect(() => {
    const s = sceneRepo.getById(id);
    if (s) {
      setScene(s);
      setTemplate(templateRepo.getById(s.templateId));
    }
  }, [id]);

  if (scene && template) {
    return (
      <div>
        {scene && (
          <SceneCreator
            template={template}
            shapeInfos={scene.shapeInfos}
            onSubmit={(f): void => {
              sceneRepo.edit({
                ...f,
                id,
              });
            }}
          />
        )}
      </div>
    );
  }

  return <div>not found</div>;
}
