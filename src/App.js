
import "./App.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Login';
import { useStateValue } from './StateProvider';

function App() {
  const [{user}] = useStateValue();
  return (
    <div className="app">
      {
        !user ? (
          <Login/>
          
        ) : (
          <div className='app__body'>
            <Router>
              <Sidebar />
              <Routes>
                <Route path='/' element={<></>} />
                <Route path='/rooms/:roomId' element={<Chat />} />
              </Routes>
            </Router>
          </div>
        )
      }

    </div>
  );
}

export default App;