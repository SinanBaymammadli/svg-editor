import React, { useState, useEffect } from "react";
import { ITemplateView } from "../../data/models";
import { TemplateCreator } from "../../components/TemplateCreator/TemplateCreator";
import { templateRepo } from "../../data/template_repo";

export interface IProps {
  id: string;
}

const TemplateEdit: React.FC<IProps> = (props: IProps) => {
  const { id } = props;
  const [template, setTemplate] = useState<ITemplateView | undefined>(undefined);

  useEffect(() => {
    setTemplate(templateRepo.getById(id));
  }, [id]);

  return <div>{template && <TemplateCreator width={900} template={template} onSubmit={templateRepo.save} />}</div>;
};

export default TemplateEdit;
