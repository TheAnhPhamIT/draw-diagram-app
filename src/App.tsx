import "./App.css";
import { DiagramBoard } from "./components/DiagramBoard/DiagramBoard";
import { StepNodeProvider } from "./context/stepNodeContext";

function App() {
  return (
    <div className="app">
      <StepNodeProvider>
        <DiagramBoard />
      </StepNodeProvider>
    </div>
  );
}

export default App;
