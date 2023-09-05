import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import './App.css';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import ListPost from './components/ListPost';

function App() {
  return (
    <div className="App">
      <h5>React POST CRUD operations using PHP and MySQL API</h5>
<a href="#" class="badge badge-primary">Primary</a>

      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/">List Posts</Link>
            </li>
            <li>
              <Link to="post/create">Create Posts</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route index element={<ListPost />} />
          <Route path="post/create" element={<CreatePost />} />
          <Route path="post/:id/edit" element={<EditPost />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
