/////////////////////////////////////
import './App.css';
import Recipe from './Recipe'
import logo from './images/logo.png'
function App() {
  return (
    <>
      <nav className="navBar">
        <img src={logo} className="logo"/>
        <h3 className="title">React Recipes</h3>
      </nav>
      <div className="recipes">
        < Recipe />
      </div>

    </>
  );
}
export default App;
