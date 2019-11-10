import React from "react";
import { useRoutes, useRedirect, A } from "hookrouter";
import TemplateList from "./pages/template/TemplateList";
import TemplateEdit from "./pages/template/TemplateEdit";
import TemplateCreate from "./pages/template/TemplateCreate";
import styles from "./App.module.scss";
import { SceneList } from "./pages/scene/SceneList";
import { SceneCreate } from "./pages/scene/SceneCreate";
import { SceneEdit } from "./pages/scene/SceneEdit";
import { SceneView } from "./pages/scene/SceneView";

const routes = {
  "/template/list": (): JSX.Element => <TemplateList />,
  "/template/edit/:id": ({ id }: { id?: string }): JSX.Element => (id ? <TemplateEdit id={id} /> : <div>Nope</div>),
  "/template/create": (): JSX.Element => <TemplateCreate />,
  "/scene/list": (): JSX.Element => <SceneList />,
  "/scene/edit/:id": ({ id }: { id?: string }): JSX.Element => (id ? <SceneEdit id={id} /> : <div>Nope</div>),
  "/scene/:id": ({ id }: { id?: string }): JSX.Element => (id ? <SceneView id={id} /> : <div>Nope</div>),
  "/scene/create": (): JSX.Element => <SceneCreate />,
};

const App: React.FC = () => {
  useRedirect("/", "/template/list");
  const routeResult = useRoutes(routes);

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <div>
          <A href="/template/list">Template List</A>
        </div>
        <div>
          <A href="/scene/list">Scene List</A>
        </div>
      </nav>
      <div className={styles.main}>{routeResult || <div>Not found</div>}</div>
    </div>
  );
};

export default App;
