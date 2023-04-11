// Styles
import './App.css';

// Components
import Post from './component/Post';
import React, {useState, useEffect} from 'react';
import {db, auth} from './firebase';

// materialUI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Input from '@mui/material/Input';

function App() {

  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const signUp = (event) => {
    event.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then(authuser => {
        return (
          authuser.user.updateProfile({displayName: username})
        );
      })
      .catch(error => alert(error.message));

      setOpen(false);
  }

  const signIn = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch(error => alert(error.message));

    setOpenSignIn(false);
  }

  useEffect (() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        // user is logged in...
        console.log(authUser);
        setUser(authUser);
      } else {
        // user is logged out...
        setUser(null);
      }
    })

    return () => {
      // clean up action
      unsubscribe();
    }

  }, [user])

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


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };



  return (
    <div className="App">
      
      <div className="app__header">
        <img 
          className='app__headerImg'
          src="https://1000logos.net/wp-content/uploads/2017/02/Logo-Instagram.png" 
          alt="Instagram-logo" 
        />
      </div>

      <div>
      {user ? 
        (<Button onClick={() => auth.signOut()}>LogOut</Button>) 
        : 
        (
          <div className="app__loginContainer">
            <Button onClick={() => setOpenSignIn(true)}>SignIn</Button>
            <Button onClick={handleOpen}>SignUp</Button>
          </div>
        )
      }
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <form action="">
                <div className="modal__signup">
                  <img 
                    className='modal-img' 
                    src="https://1000logos.net/wp-content/uploads/2017/02/Logo-Instagram.png" 
                    alt="Instagram-logo" 
                  />
                  <Input 
                    type='text' 
                    placeholder='Enter Username' 
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                  />
                  <Input 
                    type='email' 
                    placeholder='Enter Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input 
                    type='password' 
                    placeholder='Enter Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button type="submit" onClick={signUp}>Sign Up</Button>
                </div>
              </form>
            </Typography>
        </Box>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={setOpenSignIn}
      >
        <Box sx={style}>
          
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <form action="">
                <div className="modal__signup">
                  <img 
                    className='modal-img' 
                    src="https://1000logos.net/wp-content/uploads/2017/02/Logo-Instagram.png" 
                    alt="Instagram-logo" 
                  />
                  <Input 
                    type='email' 
                    placeholder='Enter Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input 
                    type='password' 
                    placeholder='Enter Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button type="submit" onClick={signIn}>Sign In</Button>
                </div>
              </form>
            </Typography>
        </Box>
      </Modal>
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
