import React, {useState} from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import './Post.css';

dayjs.extend(relativeTime);

const Post = ({postId, postUser, postDate, postText, postLikes, postComments, userId, onLike, onCommentSubmit, onCommentDelete}) => {
    const commentElements = postComments.map(c => (
        <div className='Post-comment' key={postUser.firstName + postUser.lastName + c.text}>
            {postUser._id === userId ? (
                <span onClick={() => onCommentDelete(c._id, postId)}>X</span>
            ) : (
                <span></span>
            )}
            <img src={postUser.imageUrl} alt={postUser.firstName + ' ' + postUser.lastName} />
            <div>
                <span>{postUser.firstName} {postUser.lastName} - {dayjs(c.date).fromNow()}</span>
                <p>{c.text}</p>
            </div>
        </div>
    ));

    const [expanded, setExpanded] = useState(false);
    const [text, setText] = useState('');


    function onSubmit(e){
        onCommentSubmit(e, text, postId); 
        setText('');
    }

    return (
        <div className='Post-post Post-blob'>
            <Link className='Post-post-user' to={`/users/${postUser._id}`}>
                <img src={postUser.imageUrl} alt={postUser.firstName + ' ' + postUser.lastName} />
                <div>
                    <p>{postUser.firstName} {postUser.lastName}</p>
                    <p className='Post-post-date'>{dayjs(postDate).fromNow()}</p>
                </div>
            </Link>
            <p className='Post-post-text'>
                {postText}
            </p>
            <div className='Post-like-container'>
                <div onClick={() => onLike(postId)} className={postLikes.includes(userId) ? 'Post-like-green' : undefined}>
                    <i className="fa fa-thumbs-up" aria-hidden="true"></i>
                    {postLikes.length} likes
                </div>
                <div onClick={() => setExpanded(!expanded)}>
                    <div className={expanded ? 'Post-comments-arrow-expanded' : 'Post-comments-arrow-collapsed'}></div>
                    {postComments.length} comments
                </div>
            </div>
            <div className='Post-comment-container' style={expanded ? undefined : {display: 'none'}}>
                {commentElements}
                <form className='Post-comment-form' onSubmit={e => {onSubmit(e); setText('')}}>
                    <input className='Post-comment-input' type='text' placeholder='Add a comment...' value={text} onChange={e => setText(e.target.value)} />
                    <button><i className="fa fa-arrow-right" aria-hidden="true"></i></button>
                </form>
            </div>
        </div>
    );
};

Post.propTypes = {
    postUser: PropTypes.object.isRequired,
    postDate: PropTypes.string.isRequired,
    postText: PropTypes.string.isRequired,
    postLikes: PropTypes.array.isRequired,
    postComments: PropTypes.array.isRequired,
    onLike: PropTypes.func.isRequired
};

export default Post;