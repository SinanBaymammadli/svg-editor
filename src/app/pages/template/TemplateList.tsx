import React, { useState, useEffect } from "react";
import { ITemplateView } from "../../data/models";
import { templateRepo } from "../../data/template_repo";

const TemplateList: React.FC = () => {
  const [templates, setTemplates] = useState<ITemplateView[]>([]);

  useEffect(() => {
    const templates = templateRepo.getList();
    setTemplates(templates);
  }, []);

  return (
    <div>
      <div>
        <a href="/template/create">Create Template</a>
      </div>
      {templates.map((template) => (
        <ul key={template.id}>
          <li>
            <a href={`/template/edit/${template.id}`}>{template.id}</a>

            <button
              onClick={(): void => {
                templateRepo.delete(template.id);
              }}
            >
              Delete
            </button>
            <a href={`/template/edit/${template.id}`}>Edit</a>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default TemplateList;
