import "./App.css";
import MainLayout from "./layouts/main/MainLayout.tsx";
import Home from "./pages/Home.tsx";

function App() {

  return (
    <div className="body">
      <MainLayout>
        <Home />
      </MainLayout>
    </div>
  )
}

export default App
