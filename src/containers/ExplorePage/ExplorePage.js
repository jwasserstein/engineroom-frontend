import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getRandomUsers} from '../../store/actions/users';
import {getRandomCars} from '../../store/actions/cars';
import User from '../../components/User';
import Car from '../../components/Car';
import './ExplorePage.css';

class ExplorePage extends Component {
    componentDidMount(){
        document.title = 'EngineRoom | Explore';
        if(this.props.userReducer.randomUserIds.length === 0){
            this.props.getRandomUsers(6);
        }
        if(this.props.carReducer.randomCarIds.length === 0){
            this.props.getRandomCars(4);
        }
    }

    render() {
        const {carReducer, userReducer} = this.props;

        if(!userReducer.randomUserIds.length || !carReducer.randomCarIds.length) return <div>Loading...</div>;
        
        const carElements = carReducer.randomCarIds.map(id => {
            const c = carReducer.cars[id];
            return (
                <Car name={c.name} imageUrl={c.imageUrl} userId={c.user} key={c.name + c.user} />
            )
        });
        const userElements = userReducer.randomUserIds.map(id => {
            const u = userReducer.users[id];
            return (
                <User firstName={u.firstName} lastName={u.lastName} imageUrl={u.imageUrl} id={u._id} key={u._id} />
            )
        });

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
        userReducer: state.userReducer,
        carReducer: state.carReducer
    };
}

ExplorePage.propTypes = {
    getRandomCars: PropTypes.func.isRequired,
    getRandomUsers: PropTypes.func.isRequired,
    userReducer: PropTypes.object,
    carReducer: PropTypes.object
};

export default connect(mapStateToProps, {getRandomCars, getRandomUsers})(ExplorePage);