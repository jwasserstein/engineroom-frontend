import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import UserAside from '../../components/UserAside';
import User from '../../components/User';
import {toggleFriend, getUsers} from '../../store/actions/users';
import './FriendPage.css';

class FriendPage extends Component {
    constructor(props){
        super(props);
        
        this.onFriend = this.onFriend.bind(this);
    }

    checkMissingData() {
        const {authReducer, userReducer, match, getUsers} = this.props;

        // Check for missing data: loggedInUser, wall user or wall user's friends
        if(!(authReducer.userId in userReducer.users)){
            getUsers([authReducer.userId]);
        }
        if(!(match.params.userId in userReducer.users)) {
            getUsers([match.params.userId])
                .then(() => {
                    const user = this.props.userReducer.users[match.params.userId];
                    const missingUsers = user.friends.filter(f => !(f in userReducer.users));
                    if(missingUsers.length !== 0) getUsers(missingUsers);
                });
        } else {
            const user = this.props.userReducer.users[match.params.userId];
            const missingUsers = user.friends.filter(f => !(f in userReducer.users));
            if(missingUsers.length !== 0) getUsers(missingUsers);
        }
    }

    componentDidMount() {
        document.title = 'EngineRoom | Friends';
        this.checkMissingData();
    }

    componentDidUpdate() {
        this.checkMissingData();
    }

    onFriend(friendId){
        this.props.toggleFriend(friendId);
    }

    render() {
        const {userReducer, authReducer, match} = this.props;
        const user = userReducer.users[match.params.userId];
        const loggedInUser = userReducer.users[authReducer.userId];

        if(!user || !loggedInUser) return <div>Loading...</div>;
        const missingUsers = user.friends.filter(f => !(f in userReducer.users));
        if(missingUsers.length !== 0) return <div>Loading...</div>;

        const userElements = user.friends.map(id => {
            const u = userReducer.users[id];
            return (
                <User firstName={u.firstName} lastName={u.lastName} imageUrl={u.imageUrl} id={u._id} key={u._id} width='150'/>
            )
        });

        return (
            <div className='FriendPage-container'>
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
                <div className='FriendPage-inner-container'>
                    <div className='FriendPage-title FriendPage-blob'>
                        <h2>Friends</h2>
                        <p>View {user.firstName}'s friends</p>
                    </div>
                    <div className='FriendPage-people-container'>
                        {userElements}
                    </div>
                </div>
                <div className='FriendPage-spacer'></div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        userReducer: state.userReducer,
        authReducer: state.authReducer
    };
}

FriendPage.propTypes = {
    userReducer: PropTypes.object.isRequired,
    authReducer: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    toggleFriend: PropTypes.func.isRequired,
    getUsers: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {toggleFriend, getUsers})(FriendPage);