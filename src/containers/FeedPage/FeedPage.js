import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getPosts, createPost, togglePostLike, createComment, deleteComment} from '../../store/actions/posts';
import {getUsers} from '../../store/actions/users';
import {getCars} from '../../store/actions/cars';
import Car from '../../components/Car';
import User from '../../components/User';
import Post from '../../components/Post';
import './FeedPage.css';

class FeedPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            postText: ''
        };

        this.onLike = this.onLike.bind(this);
        this.onPostSubmit = this.onPostSubmit.bind(this);
        this.onCommentSubmit = this.onCommentSubmit.bind(this);
        this.onCommentDelete = this.onCommentDelete.bind(this);
        this.onChange = this.onChange.bind(this);
    }

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

    onLike(postId){
        this.props.togglePostLike(postId);
    }

    onPostSubmit(e){
        e.preventDefault();
        this.props.createPost(this.state.postText);
    }

    onCommentSubmit(e, text, postId){
        e.preventDefault();
        this.props.createComment(text, postId)
    }

    onCommentDelete(commentId, postId){
        this.props.deleteComment(commentId, postId);
    }

    onChange(e){
        this.setState({...this.state, [e.target.name]: e.target.value});
    }

    render() {
        const {userId, userImage, userFirstName, userLastName, posts, users, cars} = this.props;
        const {postText} = this.state;

        const carElements = cars.map(c => (
            <Car name={c.name} imageUrl={c.imageUrl} userId={c.user} key={c.name + c.user} width='200'/>
        ));
        const userElements = users.map(u => (
            <User firstName={u.firstName} lastName={u.lastName} imageUrl={u.imageUrl} id={u._id} key={u._id} width='125' />
        ));
        const postElements = posts.map(p => (
            <Post 
                postId={p._id}
                postUser={p.user}
                postDate={p.date}
                postText={p.text}
                postLikes={p.likers}
                postComments={p.comments}
                userId={userId}
                onLike={this.onLike.bind(this, p._id)}
                onCommentSubmit={this.onCommentSubmit}
                onCommentDelete={this.onCommentDelete}
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
                    <form className='FeedPage-post-form FeedPage-blob' onSubmit={this.onPostSubmit}>
                        <img src={userImage} alt={userFirstName + ' ' + userLastName} />
                        <textarea placeholder='Add a post...' name='postText' value={postText} onChange={this.onChange}></textarea>
                        <button><i className="fa fa-arrow-right" aria-hidden="true"></i></button>
                    </form>
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
        userId: state.authReducer.userId,
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
    userId: PropTypes.string,
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
    userLastName: PropTypes.string,
    togglePostLike: PropTypes.func.isRequired,
    createComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {getPosts, getUsers, getCars, togglePostLike, createPost, createComment, deleteComment})(FeedPage);