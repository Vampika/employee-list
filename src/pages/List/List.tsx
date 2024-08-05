import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import styles from "./List.module.css";
import axios, { AxiosError } from "axios";
import { TeamList } from "./TeamList/TeamList";
import cn from "classnames";
import { User } from "../../interfaces/User.interface";

export function List() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const getList = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`https://reqres.in/api/users?page=1`);
      setUsers(data.data);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
      if (e instanceof AxiosError) setError(e.message);
      return;
    }
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <div className={styles["list"]}>
      <Header backbtn={false}>
        <div className={styles["header-content"]}>
          <h1 className={styles["title"]}>Наша команда</h1>
          <p className={styles["text"]}>
            Это опытные специалисты, хорошо разбирающиеся во всех задачах,
            которые ложатся на их плечи, и умеющие находить выход из любых, даже
            самых сложных ситуаций.{" "}
          </p>
        </div>
      </Header>
      <div className={cn(styles["content"], "container")}>
        {error && <>{error}</>}
        {!isLoading && <TeamList users={users} />}
        {isLoading && <>Загружаем информацию...</>}
      </div>
    </div>
  );
}
