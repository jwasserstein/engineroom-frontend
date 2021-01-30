import React from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import './Post.css';

const Post = ({postName, postDate, postText, postLikes, postComments}) => (
    <div className='Post-post Post-blob'>
        <div className='Post-post-user'>
            <img src='http://localhost:3001/images/woman2.jpg' alt='woman2' />
            <div>
                <p>{postName}</p>
                <p className='Post-post-date'>{dayjs(postDate).format('MM/DD/YYYY')}</p>
            </div>
        </div>
        <p className='Post-post-text'>
            {postText}
        </p>
        <div className='Post-like-container'>
            <div><i className="fa fa-thumbs-up" aria-hidden="true"></i>{postLikes} likes</div>
            <div><div className='Post-comments-arrow-expanded'></div>{postComments.length} comments</div>
        </div>
        <div className='Post-comment-container'>
            <div className='Post-comment'>
                <span>X</span>
                <img src='http://localhost:3001/images/me.jpeg' alt='me' />
                <div>
                    <span>Justin Wasserstein</span>
                    <p>OMG, are you alright???</p>
                </div>
            </div>
            <input className='Post-comment-input' type='text' placeholder='Add a comment...' />
        </div>
    </div>
);

Post.propTypes = {
    postName: PropTypes.string.isRequired,
    postDate: PropTypes.string.isRequired,
    postText: PropTypes.string.isRequired,
    postLikes: PropTypes.number.isRequired,
    postComments: PropTypes.array.isRequired
};

export default Post;