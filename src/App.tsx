import { Outlet } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="bg-white text-black min-h-screen font-sans">
      <Outlet />
    </div>
  );
}

export default App;
