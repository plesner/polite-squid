import { useContext, useState } from "react";
import "./App.css";
import { CtfsEngineBridge, Engine, EngineContext, type EngineBridge } from "./engine/engine";
import { useEffect } from "react";

function EngineOutput(params: { engine: Engine }) {
  return <>{params.engine.toString()}</>;
}

function App() {
  const [engine, setEngine] = useState<Engine>();
  const factory = useContext(EngineContext);

  useEffect(() => {
    fetch("http://localhost:7120/test.ctfs.zip")
      .then(response => response.bytes())
      .then(bytes => new CtfsEngineBridge(bytes).init())
      .then(bridge => factory.createEngine(bridge))
      .then(async engine => { await engine.open(); setEngine(engine) })
  }, []);

  return <>{engine && <EngineOutput engine={engine} />}</>;
}

export default App;
