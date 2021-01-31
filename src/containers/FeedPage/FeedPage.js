import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getPosts} from '../../store/actions/posts';
import {getUsers} from '../../store/actions/users';
import {getCars} from '../../store/actions/cars';
import Car from '../../components/Car';
import User from '../../components/User';
import Post from '../../components/Post';
import './FeedPage.css';

class FeedPage extends Component {
    componentDidMount(){
        document.title = 'EngineRoom | Feed';
        
        if(this.props.postsLastUpdated === 0) {
            this.props.getPosts();
        }
        if(this.props.usersLastUpdated === 0){
            this.props.getUsers(6);
        }
        if(this.props.carsLastUpdated === 0){
            this.props.getCars(4);
        }
    }

    render() {
        const {userImage, userFirstName, userLastName, posts, users, cars} = this.props;

        const carElements = cars.map(c => (
            <Car name={c.name} imageUrl={c.imageUrl} userId={c.user} key={c.name + c.user} width='200'/>
        ));
        const userElements = users.map(u => (
            <User firstName={u.firstName} lastName={u.lastName} imageUrl={u.imageUrl} id={u._id} key={u._id} width='125' />
        ));
        const postElements = posts.map(p => (
            <Post 
                postUser={p.user}
                postDate={p.date}
                postText={p.text}
                postLikes={p.likers.length}
                postComments={p.comments}
                userId={p.user._id}
                key={p.user._id+p.text}
            />
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
                        <img src={userImage} alt={userFirstName + ' ' + userLastName} />
                        <textarea placeholder='Add a post...'></textarea>
                    </div>
                    {postElements}
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
        userImage: state.authReducer.imageUrl,
        userFirstName: state.authReducer.firstName,
        userLastName: state.authReducer.lastName,
        posts: state.postReducer.posts,
        postsLastUpdated: state.postReducer.lastUpdated,
        users: state.userReducer.users,
        usersLastUpdated: state.userReducer.lastUpdated,
        cars: state.carReducer.cars,
        carsLastUpdated: state.carReducer.lastUpdated
    };
}

FeedPage.propTypes = {
    userImage: PropTypes.string,
    getPosts: PropTypes.func.isRequired,
    posts: PropTypes.array,
    postsLastUpdated: PropTypes.number,
    getUsers: PropTypes.func.isRequired,
    users: PropTypes.array,
    usersLastUpdated: PropTypes.number,
    getCars: PropTypes.func.isRequired,
    cars: PropTypes.array,
    carsLastUpdated: PropTypes.number,
    userFirstName: PropTypes.string,
    userLastName: PropTypes.string
};

export default connect(mapStateToProps, {getPosts, getUsers, getCars})(FeedPage);