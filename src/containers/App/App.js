import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import LandingPage from '../LandingPage';
import './App.css';

class App extends Component {
    componentDidMount(){
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions(){
        const html = document.querySelector('html');
        html.style.minHeight = `${window.innerHeight}px`;
    }
    
    render() {
        return (
            <div className="App">
                <Router>
                    <Navbar username='@jwasserstein' logOut={() => {}} />
                    <Switch>
                        <Route path='/' component={LandingPage} />
                    </Switch>
                    <Footer />
                </Router>
            </div>
        );
    }
}

export default App;
