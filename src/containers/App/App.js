import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import './App.css';

function App() {
    return (
        <div className="App">
            <Router>
                <Navbar username='@jwasserstein' logOut={() => {}} />
                <Switch>
                    
                </Switch>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
