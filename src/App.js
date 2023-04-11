// Styles
import './App.css';

// Components
import Post from './component/Post';

function App() {
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
      <Post />
      {/* post */}

    </div>
  );
}

export default App;
