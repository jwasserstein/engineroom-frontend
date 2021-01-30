import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {logOut} from '../../store/actions/auth';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import withAuth from '../../hocs/withAuth';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import LandingPage from '../LandingPage';
import AboutPage from '../AboutPage';
import SignupPage from '../SignupPage';
import LoginPage from '../LoginPage';
import ExplorePage from '../ExplorePage';
import FeedPage from '../FeedPage';
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
        const {username, logOut} = this.props;

        return (
            <div className="App">
                <Router>
                    <Navbar username={username} logOut={logOut} />
                    <Switch>
                        <Route path='/feed' component={withAuth(FeedPage)} />
                        <Route path='/explore' component={withAuth(ExplorePage)} />
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

function mapStateToProps(state){
	return {
		username: state?.authReducer?.username
	};
}

App.propTypes = {
    username: PropTypes.string,
	logOut: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {logOut})(App);
