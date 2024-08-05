import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import styles from "./Register.module.css";
import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { register, userActions } from "../../store/user.slice";

export type RegisterForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
  name: {
    value: string;
  };
};

const INITIAL_VALID = {
  name: true,
  email: true,
  password: true,
  password_repeat: true,
};

export function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { jwt, registerError } = useSelector((s: RootState) => s.user);
  const [formValidState, setFormValidState] = useState(INITIAL_VALID);
  let isValid = false;

  useEffect(() => {
    if (jwt) {
      navigate("/");
    }
  }, [jwt, navigate]);

  const checkData = (data: {
    name: string;
    email: string;
    password: string;
    password_repeat: string;
  }) => {
    //Имя должно быть длинной больше 0
    if (data.name?.trim().length === 0) {
      isValid = false;
      setFormValidState((state) => ({ ...state, name: false }));
    } else setFormValidState((state) => ({ ...state, name: true }));

    //email должен содержать @ и быть длинной больше 0
    if (!data.email?.trim().includes("@") || data.email?.trim().length === 0) {
      isValid = false;
      setFormValidState((state) => ({ ...state, email: false }));
    } else setFormValidState((state) => ({ ...state, email: true }));

    //Пароль должен быть длинной больше 0
    if (data.password?.trim().length === 0) {
      isValid = false;
      setFormValidState((state) => ({ ...state, password: false }));
    } else {
      setFormValidState((state) => ({ ...state, password: true }));
    }

    //Пароли должны быть равны
    if (data.password_repeat?.trim() !== data.password?.trim()) {
      isValid = false;
      setFormValidState((state) => ({ ...state, password_repeat: false }));
    } else setFormValidState((state) => ({ ...state, password_repeat: true }));
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    isValid = true;
    checkData(formProps);
    console.log(isValid);

    if (isValid) {
      dispatch(userActions.clearRegisterError());
      const target = e.target as typeof e.target & RegisterForm;
      const { email, password, name } = target;
      dispatch(
        register({
          email: email.value,
          password: password.value,
          name: name.value,
        })
      );
    }
  };

  return (
    <div className={styles["login"]}>
      <h1 className={styles["title"]}>Регистрация</h1>
      {registerError && <div className={styles["error"]}>{registerError}</div>}
      <form className={styles["form"]} onSubmit={submit}>
        <div className={styles["field"]}>
          <label htmlFor="name">Имя</label>
          <Input
            id="name"
            name="name"
            placeholder="Имя"
            isValid={formValidState.name}
          />
        </div>
        <div className={styles["field"]}>
          <label htmlFor="email">Электронная почта</label>
          <Input
            id="email"
            name="email"
            placeholder="Email"
            isValid={formValidState.email}
          />
        </div>
        <div className={styles["field"]}>
          <label htmlFor="password">Пароль</label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
            isValid={formValidState.password}
          />
        </div>
        <div className={styles["field"]}>
          <label htmlFor="password">Подтвердите пароль</label>
          <Input
            id="password_repeat"
            name="password_repeat"
            type="password"
            placeholder="Пароль"
            isValid={formValidState.password_repeat}
          />
        </div>
        <Button modificator="big" color="accent">
          Зарегистрироваться
        </Button>
      </form>
      <div className={styles["links"]}>
        <p>Есть акканут?</p>
        <Link to="/auth/login">Войти</Link>
      </div>
    </div>
  );
}
