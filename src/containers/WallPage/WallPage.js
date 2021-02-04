import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getUser} from '../../store/actions/users';
import {getPosts} from '../../store/actions/posts';
import {getCars} from '../../store/actions/cars';
import {togglePostLike, createComment, deleteComment} from '../../store/actions/posts';
import Car from '../../components/Car';
import Post from '../../components/Post';
import UserAside from '../../components/UserAside';
import './WallPage.css';

class WallPage extends Component {
    constructor(props){
        super(props);
        this.onLike = this.onLike.bind(this);
        this.onCommentSubmit = this.onCommentSubmit.bind(this);
        this.onCommentDelete = this.onCommentDelete.bind(this);
    }

    componentDidMount(){
        const {userReducer, carReducer, postReducer, getUser, getPosts, getCars, match} = this.props;

        document.title = 'EngineRoom | Wall';
        if(!(match.params.userId in userReducer.users)) {
            getUser(match.params.userId);
        } else {
            const user = userReducer.users[match.params.userId];
            const missingPosts = user.posts.filter(p => !(p in postReducer.posts));
            if(missingPosts.length > 0){
                getPosts(missingPosts);
            }

            const missingCars = user.cars.filter(c => !(c in carReducer.cars));
            if(missingCars.length > 0){
                getCars(missingCars);
            }
        }
    }

    onLike(postId){
        this.props.togglePostLike(postId);
    }

    onCommentSubmit(e, text, postId){
        e.preventDefault();
        this.props.createComment(text, postId)
    }

    onCommentDelete(commentId, postId){
        this.props.deleteComment(commentId, postId);
    }

    render() {
        const {userReducer, carReducer, postReducer, authReducer, match} = this.props;
        const user = userReducer.users?.[match.params.userId];

        if(!user) return <div>Loading...</div>;

        const carElements = user.cars.length > 0 && user.cars.map(id => {
            const c = carReducer.cars[id];
            if(!c) return <div key={id + 'loading'}>Loading Car...</div>;
            return (
                <Car name={c.name} imageUrl={c.imageUrl} userId={c.user} key={c._id} width='200'/>
            )
        });
        const postElements = user.posts.length > 0 && user.posts.map(id => {
            const p = postReducer.posts[id];
            if(!p) return <div key={id + 'loading'}>Loading Post...</div>;
            return (
                <Post 
                    postId={p._id}
                    postUser={userReducer.users[p.user]}
                    postDate={p.date}
                    postText={p.text}
                    postLikes={p.likers}
                    postComments={p.comments}
                    userId={user._id}
                    onLike={this.onLike}
                    onCommentSubmit={this.onCommentSubmit}
                    onCommentDelete={this.onCommentDelete}
                    key={p._id}
                />
            )
        });

        return (
            <div className='WallPage-container'>
                <div className='WallPage-user-container'>
                    <UserAside 
                        firstName={user.firstName}
                        lastName={user.lastName}
                        username={user.username}
                        bio={user.bio}
                        userId={user._id}
                        userImageUrl={user.imageUrl}
                        alreadyFriend={authReducer.user.friends.includes(match.params.userId)}
                        loggedInUserId={authReducer.user._id}
                    />
                </div>

                <div className='WallPage-feed-container'>
                    <div className='WallPage-title WallPage-blob'>
                        <h2>{user.firstName}'s Wall</h2>
                        <p>See what's on {user.firstName}'s mind</p>
                    </div>
                    {postElements}
                </div>

                <div className='WallPage-cars-container'>
                    <div className='WallPage-title WallPage-blob'>
                        <h2>{user.firstName}'s Cars</h2>
                    </div>
                    {carElements}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        userReducer: state.userReducer,
        carReducer: state.carReducer,
        postReducer: state.postReducer,
        authReducer: state.authReducer
    };
}

WallPage.propTypes = {
    userReducer: PropTypes.object,
    carReducer: PropTypes.object,
    postReducer: PropTypes.object,
    authReducer: PropTypes.object,
    getUser: PropTypes.func.isRequired,
    togglePostLike: PropTypes.func.isRequired,
    createComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
    getPosts: PropTypes.func.isRequired,
    getCars: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {getUser, togglePostLike, createComment, deleteComment, getPosts, getCars})(WallPage);