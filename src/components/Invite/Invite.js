import styles from "./Invite.module.css";

const Invite = () => {
  return (
    <div className="flex flex-col items-center">
      <div>
        <input
          className={styles.inputTag}
          type="text"
          alt="email"
          placeholder="Email"
        />
      </div>
      <div>
        <input
          className={styles.inputTag}
          type="text"
          alt="role"
          placeholder="Role"
        />
      </div>
      <div>
        <div className={styles.send}>
          <button>Send Invite</button>
        </div>
        <div className={styles.cancel}>
          <button>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Invite;
