import "./styles/navbar.css";
import SearchBar from './serchbar';
import AccountMenu from "./menu";
function Navbar() {
  return (
    <div className='navbar'>
        <h1 className="title_navbar">Notes</h1> 
        <SearchBar />
       <AccountMenu />
    </div>
  )
}

export default Navbar;