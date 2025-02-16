import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './home';
import { ViewUser } from './view-user';

export const App: React.FC = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/user/:id" element={<ViewUser/>} />
        </Routes>
    </BrowserRouter>
)

export default App;
