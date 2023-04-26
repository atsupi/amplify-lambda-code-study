import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { ContentDetail } from "./ContentDetail";
import { ContentDetailRoot } from "./ContentDetailRoot";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail">
          <Route path=":id" element={<ContentDetail />} />
          <Route path="/detail" element={<ContentDetailRoot />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
