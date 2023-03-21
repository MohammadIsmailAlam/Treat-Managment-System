import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const auth = getAuth();
    const navigate = useNavigate();
  
    const handleLogOut = () => {
      signOut(auth).then(() => {
        // Sign-out successful.
        navigate("/");
      });
    };
  
    return (
      <header>
        <button onClick={handleLogOut} style={{marginLeft: "auto"}}>Log Out</button>
      </header>
    );
  };
  
  export default Header;
  