import React, { useState, useEffect, ChangeEvent } from "react";
import { templateRepo } from "../../data/template_repo";
import { ITemplateView } from "../../data/models";
import { SceneCreator } from "../../components/SceneCreator/SceneCreator";
import { sceneRepo } from "../../data/scene_repo";

export function SceneCreate(): JSX.Element {
  const [templates, setTemplates] = useState<ITemplateView[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<ITemplateView | undefined>(undefined);

  useEffect(() => {
    setTemplates(templateRepo.getList());
  }, []);

  const onSelectChanged = (e: ChangeEvent<HTMLSelectElement>): void => {
    setSelectedTemplate(templates.find((t) => t.id === e.target.value));
  };

  return (
    <div>
      <select onChange={onSelectChanged}>
        <option>Select</option>
        {templates.map((t) => (
          <option key={t.id} value={t.id}>
            {t.id}
          </option>
        ))}
      </select>

      {selectedTemplate && <SceneCreator template={selectedTemplate} onSubmit={sceneRepo.save} />}
    </div>
  );
}
