// Styles
import './App.css';

// Components
import Post from './component/Post';
import React, {useState, useEffect} from 'react';
import {db} from './firebase';

function App() {

  const [posts, setPosts] = useState([
    // {
    //   username: "MS Dhoni",
    //   imgUrl: "https://images.successstory.com/img_people/profile/620Xauto/profile5_1438946298.jpg",
    //   caption: "mai pal do pal ka shayar hun pal do pal meri kahani hai pal do pal meri hasti hai pal do pal meri ravani hai..."
    // },
    // {
    //   username: "Batman",
    //   imgUrl: "https://static1.cbrimages.com/wordpress/wp-content/uploads/2019/11/frank-miller-dark-knight-returns.jpg",
    //   caption: "I'm Batman"
    // }

  ]);

  useEffect (() => {
    db.collection("posts").onSnapshot(snapshot => {
      // every time new post added, this code fires...
      setPosts(snapshot.docs.map(doc => { 
        return {
          id: doc.id,
          post: doc.data()
        }
      }));
    })
  }, [])





  return (
    <div className="App">
      
      <div className="app__header">
        <img 
          className='app__headerImg'
          src="https://1000logos.net/wp-content/uploads/2017/02/Logo-Instagram.png" 
          alt="Instagram-logo" 
        />
      </div>

      <h1>Instagram clone app is in progress</h1>


      {/* header */}
      {/* Post */}
      {posts.map(({id, post}) => {
        return (<Post key={id} username={post.username} imgUrl={post.imgUrl} caption={post.caption}/>);
      })}
      {/* post */}

    </div>
  );
}

export default App;
