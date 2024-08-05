import { useLoaderData } from "react-router-dom";
import { User } from "../../interfaces/User.interface";
import Header from "../../components/Header/Header";
import styles from "./Profile.module.css";

export function Profile() {
  const data = useLoaderData() as User;

  return (
    <div className="profile">
      <Header backbtn={true} left={true}>
        <div className={styles["header-content"]}>
          <div className={styles["avatar"]}>
            <img src={data.avatar}></img>
          </div>
          <div className={styles["name"]}>
            {data.first_name} {data.last_name}
          </div>
          <div className={styles["title"]}>Партнер</div>
        </div>
      </Header>
      <div className="container">
        <div className={styles["content"]}>
          <div className={styles["description"]}>
            Клиенты видят в нем эксперта по вопросам разработки комплексных
            решений финансовых продуктов, включая такие аспекты, как
            организационная структура, процессы, аналитика и ИТ-компоненты. Он
            помогает клиентам лучше понимать структуру рисков их бизнеса,
            улучшать процессы за счет применения новейших технологий и
            увеличивать продажи, используя самые современные аналитические
            инструменты.<br></br>
            <br></br> В работе с клиентами недостаточно просто решить конкретную
            проблему или помочь справиться с трудностями. Не менее важно уделять
            внимание обмену знаниями: "Один из самых позитивных моментов — это
            осознание того, что ты помог клиенту перейти на совершенно новый
            уровень компетентности, уверенность в том, что после окончания
            проекта у клиента есть все необходимое, чтобы дальше развиваться
            самостоятельно". <br></br>
            <br></br>Помимо разнообразных проектов для клиентов финансового
            сектора, Сорин ведет активную предпринимательскую деятельность. Он
            является совладельцем сети клиник эстетической медицины в Швейцарии,
            предлагающей инновационный подход к красоте, а также инвестором
            других бизнес-проектов.
          </div>
          <div className={styles["items-list"]}>
            <div className={styles["item"]}>
              <img src="/icons/Vectoricon.svg"></img>
              <p>+7 (954) 333-44-55</p>
            </div>
            <div className={styles["item"]}>
              <img src="/icons/Vectoricon-1.svg"></img>
              <p>{data.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
