import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getUsers} from '../../store/actions/users';
import {getCars} from '../../store/actions/cars';
import User from '../../components/User';
import Car from '../../components/Car';
import './ExplorePage.css';

class ExplorePage extends Component {
    componentDidMount(){
        document.title = 'EngineRoom | Explore';
        if(this.props.usersLastUpdated === 0){
            this.props.getUsers(6);
        }
        if(this.props.carsLastUpdated === 0){
            this.props.getCars(4);
        }
    }

    render() {
        const {cars, users} = this.props;
        
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

function mapStateToProps(state){
    return {
        users: state.userReducer.users,
        usersLastUpdated: state.userReducer.lastUpdated,
        cars: state.carReducer.cars,
        carsLastUpdated: state.carReducer.lastUpdated
    };
}

ExplorePage.propTypes = {
    getCars: PropTypes.func.isRequired,
    getUsers: PropTypes.func.isRequired,
    users: PropTypes.array,
    usersLastUpdated: PropTypes.number,
    cars: PropTypes.array,
    carsLastUpdated: PropTypes.number
};

export default connect(mapStateToProps, {getCars, getUsers})(ExplorePage);