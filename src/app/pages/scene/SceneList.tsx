import React, { useEffect, useState } from "react";
import { ISceneView } from "../../data/models";
import { sceneRepo } from "../../data/scene_repo";

export function SceneList(): JSX.Element {
  const [scenes, setScenes] = useState<ISceneView[]>([]);

  useEffect(() => {
    setScenes(sceneRepo.getList());
  }, []);

  return (
    <div>
      <div>
        <a href="/scene/create">Create Scene</a>
      </div>
      {scenes.map((scene) => (
        <ul key={scene.id}>
          <li>
            <a href={`/scene/${scene.id}`}>{scene.id}</a>

            <button
              onClick={(): void => {
                sceneRepo.delete(scene.id);
              }}
            >
              Delete
            </button>
            <a href={`/scene/edit/${scene.id}`}>Edit</a>
          </li>
        </ul>
      ))}
    </div>
  );
}
