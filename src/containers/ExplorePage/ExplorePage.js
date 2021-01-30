import React, {Component} from 'react';
import User from '../../components/User';
import Car from '../../components/Car';
import {apiCall} from '../../services/api';
import './ExplorePage.css';

class ExplorePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            users: [],
            cars: []
        };
    }

    componentDidMount(){
        document.title = 'EngineRoom | Explore';
        apiCall('get', '/auth/random/6', {})
            .then(users => this.setState({...this.state, users}))
            .catch(err => console.log(err));
        apiCall('get', '/cars/random/4', {})
            .then(cars => this.setState({...this.state, cars}))
            .catch(err => console.log(err));
    }

    render() {
        const {cars, users} = this.state;
        
        const carElements = cars.map(c => (
            <Car name={c.name} imageUrl={c.imageUrl} userId={c.user} key={c.name + c.user} />
        ));
        const userElements = users.map(u => (
            <User firstName={u.firstName} lastName={u.lastName} imageUrl={u.imageUrl} id={u._id} key={u._id} />
        ));

        return (
            <div className='ExplorePage-container'>
                <div className='ExplorePage-inner-container'>
                    <div className='ExplorePage-title ExplorePage-blob'>
                        <h2>People</h2>
                        <p>View a random selection of EngineRoom users</p>
                    </div>
                    <div className='ExplorePage-people-container'>
                        {userElements}
                    </div>
                </div>
                <div className='ExplorePage-inner-container'>
                    <div className='ExplorePage-title ExplorePage-blob'>
                        <h2>Cars</h2>
                        <p>View a random selection of EngineRoom users' cars</p>
                    </div>
                    <div className='ExplorePage-car-container'>
                        {carElements}
                    </div>
                </div>
            </div>
        );
    }
}

export default ExplorePage;