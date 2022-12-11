import Logo from "../Logo/Logo";
import Menu from "../Menu/Menu";
import "./Header.css";

function Header(): JSX.Element {
    return (
        <div className="Header">
             <h1> "To be able to understand a dog, you have to be a dog." </h1>
             <Logo />
            <Menu />
        </div>

      
        
    );
}

export default Header;