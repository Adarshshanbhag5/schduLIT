import Link from "next/link";
import { useRouter } from "next/router";
import { useAuthContext } from "../context/AuthContext";
import styles from "../styles/NavBar.module.css";

export default function NavBar() {
  const { currentUser, logout } = useAuthContext();
  const route = useRouter();
  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <div className={styles.logo__container}>
          <div className={styles.logo__text}>ScheduLIT</div>
        </div>
        <div className={styles.navbar__right}>
          <Link href="/events">
            <div className={styles.navbar__right__text}>Browse Events</div>
          </Link>
          <button
            className="btn"
            onClick={() => {
              if (currentUser) {
                route.push("/addevent");
              } else {
                route.replace("/login");
              }
            }}
          >
            Create Event
          </button>
          {currentUser ? (
            <div className={styles.navbar__right__text}>
              {currentUser.displayName}
            </div>
          ) : (
            <Link href="/login">
              <div className={styles.navbar__right__text}>Login</div>
            </Link>
          )}
          {currentUser && (
            <div className={styles.account__dropdown}>
              <div className={styles.dropdown__option}>Manage my events</div>
              <div className={styles.dropdown__option} onClick={logout}>
                Logout
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
