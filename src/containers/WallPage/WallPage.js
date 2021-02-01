import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getUser} from '../../store/actions/users';
import {togglePostLike, createComment, deleteComment} from '../../store/actions/posts';
import Car from '../../components/Car';
import Post from '../../components/Post';
import UserAside from '../../components/UserAside';
import './WallPage.css';

class WallPage extends Component {
    componentDidMount(){
        const {userReducer, getUser, match} = this.props;

        document.title = 'EngineRoom | Wall';
        if(!(match.params.userId in userReducer)) {
            getUser(match.params.userId);
        }

        this.onLike = this.onLike.bind(this);
        this.onCommentSubmit = this.onCommentSubmit.bind(this);
        this.onCommentDelete = this.onCommentDelete.bind(this);
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
        const {userReducer, match} = this.props;
        const user = userReducer[match.params.userId];

        if(!user) return <div>Loading...</div>;

        const carElements = user.cars.map(c => (
            <div className='WallPage-car-container' key={c.name + c.user} >
                <Car 
                    name={c.name} 
                    imageUrl={c.imageUrl} 
                    userId={c.user} 
                    width='200'
                />
            </div>
        ));
        const postElements = user.posts.map(p => (
            <Post 
                postId={p._id}
                postUser={p.user}
                postDate={p.date}
                postText={p.text}
                postLikes={p.likers}
                postComments={p.comments}
                userId={user._id}
                onLike={this.onLike}
                onCommentSubmit={this.onCommentSubmit}
                onCommentDelete={this.onCommentDelete}
                key={p.user._id+p.text}
            />
        ));

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
        userReducer: state.userReducer
    };
}

WallPage.propTypes = {
    userReducer: PropTypes.object,
    getUser: PropTypes.func.isRequired,
    togglePostLike: PropTypes.func.isRequired,
    createComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {getUser, togglePostLike, createComment, deleteComment})(WallPage);