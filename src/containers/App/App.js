import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import LandingPage from '../LandingPage';
import AboutPage from '../AboutPage';
import SignupPage from '../SignupPage';
import LoginPage from '../LoginPage';
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
                    <Navbar username={''} logOut={() => {}} />
                    <Switch>
                        <Route path='/login' component={LoginPage} />
                        <Route path='/signup' component={SignupPage} />
                        <Route path='/about' component={AboutPage} />
                        <Route path='/' component={LandingPage} />
                    </Switch>
                    <Footer />
                </Router>
            </div>
        );
    }
}

export default App;
