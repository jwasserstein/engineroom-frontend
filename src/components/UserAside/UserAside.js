import React from 'react';
import {Link} from 'react-router-dom';
import './UserAside.css';

const UserAside = ({firstName, lastName, username, bio, userId, userImageUrl, alreadyFriend, loggedInUserId}) => (
    <div>
        <div className='WallPage-user'>
            <img src={userImageUrl} alt={`${firstName} ${lastName}`} />
            <h2>{firstName} {lastName}</h2>
            <p className='WallPage-username'>@{username}</p>
            <p className='WallPage-bio'>{bio}</p>
            <div>
                <Link to={`/user/${userId}/friends`}>Friends</Link>
                <Link to={`/user/${userId}/cars`}>Cars</Link>
            </div>
        </div>
        {loggedInUserId !== userId && (
            alreadyFriend ? (
                <button className='WallPage-friend-btn WallPage-remove-btn'>Remove Friend</button>
            ) : (
                <button className='WallPage-friend-btn'>Add Friend</button>
            )
        )}
    </div>
);

export default UserAside;