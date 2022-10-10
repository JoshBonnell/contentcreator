import "./css/App.css";
import React from "react";
import PageBuilder from "./components/PageBuilder";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faImage } from "@fortawesome/free-solid-svg-icons";

library.add(fab, faImage);

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <PageBuilder />
    </DndProvider>
  );
}

export default App;
