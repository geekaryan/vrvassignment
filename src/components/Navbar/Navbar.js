import SearchIcon from "@mui/icons-material/Search";

import styles from "./Navbar.module.css";
import logo from "./../assets/Image.png";

const Navbar = () => {
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
        <div className={`${styles.btnprimary} mr-4`}>
          <button className="">Login</button>
        </div>
        <div className={styles.btnsecondary}>
          <button>Help</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
