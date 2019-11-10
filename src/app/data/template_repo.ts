import { ITemplateView, ITemplateForm } from "./models";
import uuid from "uuid/v1";

const TEMPLATES_KEY = "TEMPLATES_KEY";

class TemplateRepo {
  getList = (): ITemplateView[] => {
    const templateString = localStorage.getItem(TEMPLATES_KEY) || "[]";

    const templates: ITemplateView[] = JSON.parse(templateString);
    return templates;
  };

  getById = (id: string): ITemplateView | undefined => {
    const templateList = this.getList();

    return templateList.find((t) => t.id === id);
  };

  save = (template: ITemplateForm): void => {
    const newTemplate: ITemplateView = {
      ...template,
      id: uuid(),
    };

    const templates = this.getList();

    localStorage.setItem(TEMPLATES_KEY, JSON.stringify([newTemplate, ...templates]));
  };

  edit = (template: ITemplateView): void => {
    const templates = this.getList();
    const filtered = templates.filter((t) => t.id !== template.id);

    localStorage.setItem(TEMPLATES_KEY, JSON.stringify([template, ...filtered]));
  };

  delete = (id: string): void => {
    const templates = this.getList();
    const filtered = templates.filter((t) => t.id !== id);

    localStorage.setItem(TEMPLATES_KEY, JSON.stringify(filtered));
  };
}

export const templateRepo = new TemplateRepo();
