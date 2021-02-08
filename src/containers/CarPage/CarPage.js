import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import UserAside from '../../components/UserAside';
import Button from '../../components/Button';
import DetailedCar from '../../components/DetailedCar';
import {toggleFriend, getUsers} from '../../store/actions/users';
import {getCars} from '../../store/actions/cars';
import './CarPage.css';

class CarPage extends Component {
    constructor(props){
        super(props);

        this.onFriend = this.onFriend.bind(this);
    }

    checkMissingData() {
        const {authReducer, userReducer, carReducer, match, getUsers, getCars} = this.props;

        // Check for missing data: loggedInUser, wall user or wall user's cars
        if(!(authReducer.userId in userReducer.users)){
            getUsers([authReducer.userId]);
        }
        if(!(match.params.userId in userReducer.users)) {
            getUsers([match.params.userId])
                .then(() => {
                    const user = this.props.userReducer.users[match.params.userId];
                    const missingCars = user.cars.filter(f => !(f in carReducer.cars));
                    if(missingCars.length !== 0) getCars(missingCars);
                });
        } else {
            const user = this.props.userReducer.users[match.params.userId];
            const missingCars = user.cars.filter(f => !(f in carReducer.cars));
            if(missingCars.length !== 0) getCars(missingCars);
        }
    }

    componentDidMount() {
        document.title = 'EngineRoom | Cars';
        this.checkMissingData();
    }

    componentDidUpdate() {
        this.checkMissingData();
    }

    onFriend(friendId){
        this.props.toggleFriend(friendId);
    }

    render() {
        const {userReducer, authReducer, carReducer, match} = this.props;
        const user = userReducer.users[match.params.userId];
        const loggedInUser = userReducer.users[authReducer.userId];

        if(!user || !loggedInUser) return <div>Loading...</div>;
        const missingCars = user.cars.filter(f => !(f in carReducer.cars));
        if(missingCars.length !== 0) return <div>Loading...</div>;

        // Create car elements here
        const carElements = user.cars.map(id => {
            const c = carReducer.cars[id];
            if(!c) return <div key={id}>Loading Car...</div>;
            return (<DetailedCar 
                name={c.name}
                imageUrl={c.imageUrl}
                mods={c.mods}
                accelTime={c.accelTime}
                power={c.power}
                torque={c.torque}
                key={c._id}
            />);
        });

        return (
            <div className='CarPage-container'>
                <UserAside 
                    firstName={user.firstName}
                    lastName={user.lastName}
                    username={user.username}
                    bio={user.bio}
                    userId={user._id}
                    userImageUrl={user.imageUrl}
                    onFriend={this.onFriend}
                    alreadyFriend={loggedInUser.friends.includes(match.params.userId)}
                    loggedInUserId={authReducer.userId}
                />
                <div className='CarPage-inner-container'>
                    <div className='CarPage-title-container'>
                        <div className='CarPage-title CarPage-blob'>
                            <h2>Cars</h2>
                            <p>View {user.firstName}'s cars</p>
                        </div>
                        {match.params.userId === authReducer.userId && (
                            <Button className='CarPage-add-btn' to={`/users/${authReducer.userId}/cars/new`}>Add Car</Button>
                        )}
                    </div>
                    
                    <div className='CarPage-people-container'>
                        {carElements}
                    </div>
                </div>
                <div className='CarPage-spacer'></div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        userReducer: state.userReducer,
        authReducer: state.authReducer,
        carReducer: state.carReducer,
    };
}

CarPage.propTypes = {
    userReducer: PropTypes.object.isRequired,
    authReducer: PropTypes.object.isRequired,
    carReducer: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    toggleFriend: PropTypes.func.isRequired,
    getUsers: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {toggleFriend, getUsers, getCars})(CarPage);