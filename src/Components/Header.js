import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { IoExitOutline } from "react-icons/io5";
import Logo from "../asset/img/cover-removebg-preview 3.png";

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
      <img src={Logo} alt="Logo" onClick={()=> navigate("/dashboard")}/>
      <i className="bi bi-box-arrow-right" style={{ marginRight: "auto" }}></i>
      <IoExitOutline onClick={handleLogOut} style={{ cursor: "pointer" }} />
    </header>
  );
};

export default Header;
