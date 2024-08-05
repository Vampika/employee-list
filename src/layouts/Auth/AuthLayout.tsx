import { Outlet, useLocation } from "react-router-dom";
import styles from "./AuthLayout.module.css";
import { useEffect } from "react";

export function AuthLayout() {
  const location = useLocation();

  useEffect(() => {
    console.log(location);
  }, [location]);

  return (
    <div className={styles["layout"]}>
      <div className={styles["content"]}>
        <Outlet />
      </div>
    </div>
  );
}
