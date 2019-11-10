import React, { useState, useEffect } from "react";
import { SceneViewer } from "../../components/SceneViewer/SceneViewer";
import { sceneRepo } from "../../data/scene_repo";
import { templateRepo } from "../../data/template_repo";
import { ISceneView, ITemplateView } from "../../data/models";

export interface IProps {
  id: string;
}

export function SceneView(props: IProps): JSX.Element {
  const { id } = props;
  const [scene, setScene] = useState<ISceneView | undefined>(undefined);
  const [template, setTemplate] = useState<ITemplateView | undefined>(undefined);

  useEffect(() => {
    const s = sceneRepo.getById(id);

    if (s) {
      const t = templateRepo.getById(s.templateId);

      setScene(s);
      setTemplate(t);
    }
  }, []);

  return <div>{scene && template && <SceneViewer scene={scene} template={template} />}</div>;
}
