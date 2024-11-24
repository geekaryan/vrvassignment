import styles from "./Detail.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Detail = () => {
  return (
    <div>
      <div className={styles.text}>User Detail</div>
      <div>
        <div className={styles.name}>John Doe</div>
        <div className={styles.rest}>Role: Admin</div>
        <div className={styles.rest}>
          Associate Compnaies: Tech Corp, Innovate Ltd
        </div>
        <div className={styles.rest}>Last Login: 2024-11-24 13:29</div>
      </div>
      <div className="flex float-right">
        <div className={`${styles.delete} flex`}>
          <div>
            <DeleteIcon sx={{ height: 16, width: 16 }} />
          </div>
          <div>Delete User</div>
        </div>
        <div className="ml-2">
          <div className={`${styles.del2} flex`}>
            <div>
              <EditIcon sx={{ height: 16, width: 16 }} />
            </div>
            <div>Edit</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
