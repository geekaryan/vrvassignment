import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import ImagesearchRollerIcon from "@mui/icons-material/ImagesearchRoller";
import PersonIcon from "@mui/icons-material/Person";
import styles from "./SlideChange.module.css";

const SlideChange = () => {
  return (
    <div className="flex flex-col">
      <div className="min-h-[80vh]">
        <div className={`${styles.hdiv} flex items-center`}>
          <div className={styles.imgDiv}>
            <DashboardIcon />
          </div>
          <div className={styles.text}>Dashboard</div>
        </div>
        <div className={`${styles.hdiv} flex items-center`}>
          <div className={styles.imgDiv}>
            <SettingsIcon />
          </div>
          <div className={styles.text}>General</div>
        </div>
        <div className={`${styles.hdiv} flex items-center`}>
          <div className={styles.imgDiv}>
            <PersonAddAlt1Icon />
          </div>
          <div className={styles.text}>User Management</div>
        </div>
        <div className={`${styles.hdiv} flex items-center`}>
          <div className={styles.imgDiv}>
            <ImagesearchRollerIcon />
          </div>
          <div className={styles.text}>Role Management</div>
        </div>
        <div className={`${styles.hdiv} flex items-center`}>
          <div className={styles.imgDiv}>
            <SettingsIcon />
          </div>
          <div className={styles.text}>Settings</div>
        </div>
      </div>
      <div className="flex items-center float-end">
        <div className="mr-3">
          <PersonIcon
            sx={(theme) => ({
              height: 44,
              width: 44,
              ...theme.applyStyles("dark", {
                bgcolor: "#101010",
                color: "grey.300",
                borderColor: "grey.800",
              }),
            })}
          />
        </div>
        <div>
          <div className={styles.nameText}>Amanda</div>
          <div className={styles.profile}>View Profile</div>
        </div>
        <div className={`${styles.unicolor} ml-12`}>
          <SettingsIcon />
        </div>
      </div>
    </div>
  );
};

export default SlideChange;
