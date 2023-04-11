// Styles
import './styles/Post.css';

// component
import React from 'react';
import Avatar from '@mui/material/Avatar';



function Post({username, imgUrl, caption}) {
  return (
    <div className="post">
    
        {/* header -> avatar + username */}
        <div className="post__header">
            <Avatar 
                className='post_headerAvatar'
                alt={username}
                src='#'
            />
            <h3 className='post__headerUsername'>{username}</h3>
        </div>

        {/* post-img  */}
        <img 
            className='post__img'
            src={imgUrl} 
            alt="Instagram post" 
        />

        {/* username + caption  */}
        <h4 className="post__caption">{username} <span>{caption}</span></h4>
    </div>
  )
}

export default Post