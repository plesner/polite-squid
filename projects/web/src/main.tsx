import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createEngineFactory, type EngineFactory } from "@posqui/engine";
import { EngineContext } from "./engine/context";

createEngineFactory().then((factory) => {
  main(factory);
});

function main(factory: EngineFactory) {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <EngineContext value={factory}>
        <App />
      </EngineContext>
    </StrictMode>,
  );
}
