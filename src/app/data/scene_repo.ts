import { ISceneView, ISceneForm } from "./models";
import uuid from "uuid/v1";

const SCENE_KEY = "SCENE_KEY";

class SceneRepo {
  getList = (): ISceneView[] => {
    const sceneString = localStorage.getItem(SCENE_KEY) || "[]";

    const scenes: ISceneView[] = JSON.parse(sceneString);
    return scenes;
  };

  getById = (id: string): ISceneView | undefined => {
    const sceneList = this.getList();

    return sceneList.find((t) => t.id === id);
  };

  save = (scene: ISceneForm): void => {
    const newScene: ISceneView = {
      ...scene,
      id: uuid(),
    };

    const scenes = this.getList();

    localStorage.setItem(SCENE_KEY, JSON.stringify([newScene, ...scenes]));
  };

  edit = (scene: ISceneView): void => {
    const scenes = this.getList();
    const filtered = scenes.filter((t) => t.id !== scene.id);

    localStorage.setItem(SCENE_KEY, JSON.stringify([scene, ...filtered]));
  };

  delete = (id: string): void => {
    const scenes = this.getList();
    const filtered = scenes.filter((t) => t.id !== id);

    localStorage.setItem(SCENE_KEY, JSON.stringify(filtered));
  };
}

export const sceneRepo = new SceneRepo();
