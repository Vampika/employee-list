import { HeaderProps } from "./Header.props";
import styles from "./Header.module.css";
import cn from "classnames";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { userActions } from "../../store/user.slice";

function Header({
  backbtn = false,
  left = false,
  children,
  ...props
}: HeaderProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const logout = () => {
    dispatch(userActions.logout());
    navigate("/auth/login");
  };

  const back = () => {
    navigate(-1);
  };

  return (
    <div className={styles["header-wrapper"]}>
      <div className="container">
        <div
          className={cn(styles["header"], {
            [styles["header-left"]]: left === true,
          })}
        >
          <Button
            color="gray"
            className={cn(styles["back-btn"], {
              [styles["hidden"]]: backbtn === false,
            })}
            onClick={back}
          >
            Назад
          </Button>
          <Button color="gray" className={styles["exit-btn"]} onClick={logout}>
            Выход
          </Button>
          <button
            className={cn(styles["back-btn__mobile"], {
              [styles["hidden"]]: backbtn === false,
            })}
            onClick={back}
          >
            <img src="/icons/back.svg"></img>
          </button>
          <button className={styles["exit-btn__mobile"]}>
            <img src="/icons/exit.svg" onClick={logout}></img>
          </button>
          <div className={styles["content"]}>{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Header;
