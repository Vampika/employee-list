import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import styles from "./Login.module.css";
import { FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { login, userActions } from "../../store/user.slice";

export type LoginForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
};

export function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const {jwt, loginError} = useSelector((s: RootState) => s.user);

  useEffect(() => {
	if(jwt) {
		navigate("/");
	}
  }, [jwt, navigate]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(userActions.clearError());
    const target = e.target as typeof e.target & LoginForm;
    const { email, password } = target;
    sendLogin(email.value, password.value);
  };

  const sendLogin = async (email: string, password: string) => {
	dispatch(login({email, password}));
  };

  return (
    <div className={styles["login"]} onSubmit={submit}>
      <h1 className={styles["title"]}>Вход</h1>
      {loginError && <div className={styles["error"]}>{loginError}</div>}
      <form className={styles["form"]}>
        <div className={styles["field"]}>
          <label htmlFor="email">Ваш email</label>
          <Input id="email" name="email" placeholder="Email" />
        </div>
        <div className={styles["field"]}>
          <label htmlFor="password">Ваш пароль</label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
          />
        </div>
        <Button modificator="big" color="accent">
          Вход
        </Button>
      </form>
      <div className={styles["links"]}>
        <p>Нет акканута?</p>
        <Link to="/auth/register">Зарегестрироваться</Link>
      </div>
    </div>
  );
}
