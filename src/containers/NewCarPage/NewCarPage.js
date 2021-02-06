import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import UserAside from '../../components/UserAside';
import {getUsers} from '../../store/actions/users';
import {addCar} from '../../store/actions/cars';
import './NewCarPage.css';

class NewCarPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            make: '',
            model: '',
            year: '',
            modifications: '',
            power: '',
            torque: ''
        };

        this.onChange = this.onChange.bind(this);
    }

    checkMissingData() {
        const {authReducer, userReducer, getUsers} = this.props;

        // Check for missing data: loggedInUser
        if(!(authReducer.userId in userReducer.users)){
            getUsers([authReducer.userId]);
        }
    }

    componentDidMount() {
        document.title = 'EngineRoom | New Car';
        this.checkMissingData();
    }

    componentDidUpdate() {
        this.checkMissingData();
    }

    onChange(e){
        this.setState({...this.state, [e.target.name]: e.target.value});
    }

    render() {
        const {userReducer, authReducer, match} = this.props;
        const {make, model, year, modifications, power, torque} = this.state;
        const loggedInUser = userReducer.users[authReducer.userId];

        if(!loggedInUser) return <div>Loading...</div>;

        return (
            <div className='NewCarPage-container'>
                <UserAside 
                    firstName={loggedInUser.firstName}
                    lastName={loggedInUser.lastName}
                    username={loggedInUser.username}
                    bio={loggedInUser.bio}
                    userId={loggedInUser._id}
                    userImageUrl={loggedInUser.imageUrl}
                    onFriend={this.onFriend}
                    alreadyFriend={loggedInUser.friends.includes(match.params.userId)}
                    loggedInUserId={authReducer.userId}
                />

                <div className='NewCarPage-inner-container'>
                    <div className='NewCarPage-title NewCarPage-blob'>
                        <h2>Add a Car</h2>
                        <p>Add a car to your EngineRoom profile</p>
                    </div>

                    <div className='NewCarPage-form NewCarPage-blob'>
                        <div className='NewCarPage-form-row'>
                            <div>
                                <label htmlFor='make'>Make:</label>
                                <input type='text' id='make' name='make' value={make} onChange={this.onChange} placeholder='Ford' />
                            </div>
                            <div>
                                <label htmlFor='model'>Model:</label>
                                <input type='text' id='model' name='model' value={model} onChange={this.onChange} placeholder='F150' />
                            </div>
                            <div>
                                <label htmlFor='year'>Year:</label>
                                <input type='text' id='year' name='year' value={year} onChange={this.onChange} placeholder='2021' />
                            </div>
                        </div>
                        <div className='NewCarPage-form-row'>
                            <div className='NewCarPage-form-col'>
                                <label htmlFor='modifications'>Modifications:</label>
                                <textarea id='modifications' name='modifications' value={modifications} onChange={this.onChange} placeholder='K&N cold air intake, Bridgestone Ecopia tires'></textarea>
                                <div className='NewCarPage-form-row NewCarPage-inner-row'>
                                    <div className='NewCarPage-power'>
                                        <label htmlFor='power'>Power (hp):</label>
                                        <input type='text' id='power' name='power' value={power} onChange={this.onChange} placeholder='155' />
                                    </div>
                                    <div>
                                        <label htmlFor='torque'>Torque (ft-lb):</label>
                                        <input type='text' id='torque' name='torque' value={torque} onChange={this.onChange} placeholder='150' />    
                                    </div>
                                </div>
                            </div>
                            <div className='NewCarPage-form-col'>
                                <label htmlFor='image'>Image:</label>
                                <div className='NewCarPage-image'>
                                    Drag an image to upload...
                                </div>
                                <button>Browse</button>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='NewCarPage-spacer'></div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        userReducer: state.userReducer,
        authReducer: state.authReducer,
    };
}

NewCarPage.propTypes = {
    userReducer: PropTypes.object.isRequired,
    authReducer: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    getUsers: PropTypes.func.isRequired,
    addCar: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {getUsers, addCar})(NewCarPage);