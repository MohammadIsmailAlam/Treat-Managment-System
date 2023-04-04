import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { IoExitOutline } from "react-icons/io5";
import Logo from "../asset/img/cover-removebg-preview 4.svg";
import { useEffect, useState } from "react";
import LoginIcon from "@mui/icons-material/Login";
import { IconButton, Tooltip } from "@mui/material";

const Header = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleLogOut = () => {
    signOut(auth).then(() => {
      navigate("/");
    });
  };

  return (
    <header>
      <img src={Logo} alt="Logo" onClick={() => navigate("/dashboard")} />
      {user ? (
        <>
          <i
            className="bi bi-box-arrow-right"
            style={{ marginRight: "auto" }}
          ></i>
          <Tooltip title="Log Out" placement="top" arrow onClick={handleLogOut}>
            <IconButton>
              <IoExitOutline />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <>
          <i
            className="bi bi-box-arrow-right"
            style={{ marginRight: "auto" }}
          ></i>
          <Tooltip
            title="Log In"
            placement="top"
            arrow
            onClick={() => navigate("/dashboard")}
          >
            <IconButton>
              <LoginIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
    </header>
  );
};

export default Header;
