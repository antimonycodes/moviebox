import Details from "./pages/Details";
import Homepage from "./pages/Homepage";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Details/:id" element={<Details />} />
      </Routes>
    </>
  );
}

export default App;
