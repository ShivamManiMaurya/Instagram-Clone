// Styles
import './styles/Post.css';

// component
import React from 'react';
import Avatar from '@mui/material/Avatar';



function Post() {
  return (
    <div className="post">
        {/* header -> avatar + username */}
        <div className="post___header">
            <Avatar />
            <h3 className='post__headerUsername'>MS Dhoni</h3>
        </div>


        {/* post-img  */}
        <img 
            className='post__img'
            src="https://images.successstory.com/img_people/profile/620Xauto/profile5_1438946298.jpg" 
            alt="" 
        />
        {/* username + caption  */}
        <h4 className="post__caption">MS Dhoni <span>Mai pal do pal ka shayar hun</span></h4>
    </div>
  )
}

export default Post