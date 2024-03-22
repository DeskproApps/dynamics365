import { Routes, Route } from "react-router-dom";
import { Main } from "./pages/Main";
import { GlobalAuth } from "./pages/Admin/GlobalAuth";
import { Redirect } from "./components/Redirect/Redirect";
import { FindOrCreate } from "./pages/FindOrCreate/FindOrCreate";
import { ViewObject } from "./pages/View/Object";
import { CreateObject } from "./pages/Create/Object";
import { EditObject } from "./pages/Edit/Edit";

const App = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Main />} />
        <Route path="redirect" element={<Redirect />} />
        <Route path="findOrCreate" element={<FindOrCreate />} />
        <Route path="admin">
          <Route path="globalauth" element={<GlobalAuth />} />
        </Route>
        <Route path="view">
          <Route
            path=":objectView/:objectName/:objectId"
            element={<ViewObject />}
          />
        </Route>
        <Route path="create">
          <Route path=":objectName" element={<CreateObject />} />
          <Route path=":objectName/:objectId" element={<CreateObject />} />
        </Route>
        <Route path="edit">
          <Route path=":objectName/:objectId" element={<EditObject />} />
        </Route>
      </Route>
    </Routes>
  );
};

export { App };
