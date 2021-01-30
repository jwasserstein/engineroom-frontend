import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {apiCall} from '../../services/api';
import Car from '../../components/Car';
import User from '../../components/User';
import Post from '../../components/Post';
import './FeedPage.css';

class FeedPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            cars: [],
            users: []
        };
    }

    componentDidMount(){
        document.title = 'EngineRoom | Feed';
        apiCall('get', '/auth/random/6', {})
            .then(users => this.setState({...this.state, users}))
            .catch(err => console.log(err));
        apiCall('get', '/cars/random/4', {})
            .then(cars => this.setState({...this.state, cars}))
            .catch(err => console.log(err));
    }

    render() {
        const {userImage} = this.props;
        const {cars, users} = this.state;

        const carElements = cars.map(c => (
            <Car name={c.name} imageUrl={c.imageUrl} userId={c.user} key={c.name + c.user} width='200'/>
        ));
        const userElements = users.map(u => (
            <User firstName={u.firstName} lastName={u.lastName} imageUrl={u.imageUrl} id={u._id} key={u._id} width='125' />
        ));

        return (
            <div className='FeedPage-container'>
                <div className='FeedPage-friends-container'>
                    <div className='FeedPage-title FeedPage-blob'>
                        <h2>Explore Friends</h2>
                    </div>
                    <div className='FeedPage-people-container'>
                        
                        {userElements}

                    </div>
                </div>
                <div className='FeedPage-feed-container'>
                    <div className='FeedPage-title FeedPage-blob'>
                        <h2>Your Feed</h2>
                        <p>See what your friends are talking about</p>
                    </div>
                    <div className='FeedPage-post-form FeedPage-blob'>
                        <img src={userImage} alt='me' />
                        <textarea placeholder='Add a post...'></textarea>
                    </div>

                    <Post 
                        postName='Jane Doe'
                        postDate='2021-01-28T21:16:56.427Z'
                        postText='Just crashed my car!  Oops!'
                        postLikes={3}
                        postComments={[]}
                    />

                </div>
                <div className='FeedPage-cars-container'>
                    <div className='FeedPage-title FeedPage-blob'>
                        <h2>Explore Cars</h2>
                    </div>
                    <div className='FeedPage-car-container'>
                        
                        {carElements}

                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        userImage: state.authReducer.imageUrl
    };
}

FeedPage.propTypes = {
    userImage: PropTypes.string
};

export default connect(mapStateToProps)(FeedPage);