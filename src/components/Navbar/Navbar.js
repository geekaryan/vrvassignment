import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { urlActions } from "../../store/url";
import styles from "./Navbar.module.css";
import logo from "./../assets/Image.png";
import { authActions } from "../../store/auth";
import { roleActions } from "../../store/role";

const Navbar = ({ bottomRef }) => {
  const auth = useSelector((state) => state.auth.logged);
  const dispatch = useDispatch();

  const logOutHandler = () => {
    dispatch(urlActions.remove());
    dispatch(authActions.logout());
    dispatch(roleActions.remove());
  };

  const logInHandler = () => {
    if (bottomRef?.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className={`${styles.mainDiv}`}>
      <div className={styles.fiflex}>
        <div className="mr-2 ml-5">
          <img src={logo} alt="logo" />
        </div>
        <div className={styles.text}>AdminPro</div>
        <div className="flex items-center border-solid border-2 rounded">
          <div className="mr-2 ml-2">
            <SearchIcon />
          </div>
          <div>
            <input
              type="text"
              className="pl-2 pr-2"
              alt="Search"
              placeholder="Search ..."
            />
          </div>
        </div>
      </div>
      <div className="flex items-center mr-6">
        {auth ? (
          <div className={`${styles.btnprimary} mr-4`}>
            <button className="" onClick={logOutHandler}>
              Logout
            </button>
          </div>
        ) : (
          <div onClick={logInHandler} className={`${styles.btnprimary} mr-4`}>
            <button className="">Login</button>
          </div>
        )}

        <div className={styles.btnsecondary}>
          <button>Help</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
