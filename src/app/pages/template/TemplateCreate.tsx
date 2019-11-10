import React from "react";
import { TemplateCreator } from "../../components/TemplateCreator/TemplateCreator";
import { templateRepo } from "../../data/template_repo";

const TemplateCreate: React.FC = () => {
  return (
    <div>
      <TemplateCreator width={900} onSubmit={templateRepo.save} />
    </div>
  );
};

export default TemplateCreate;
