import { getAuth, signOut } from "firebase/auth";
import { FaArrowLeft } from "react-icons/fa";
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
    
    const handleBackButton = () => {
      navigate("/DashBoard");
    };
  
    return (
      <header>
        <button onClick={handleLogOut}>Log Out</button>
        
        <button className="goBack" onClick={handleBackButton}>
          <FaArrowLeft />
        </button>
      </header>
    );
  };
  
  export default Header;
  