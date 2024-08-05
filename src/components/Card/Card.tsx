import { Link } from "react-router-dom";
import styles from "./Card.module.css";
import { CardProps } from "./Card.props";

function Card(props: CardProps) {
  return (
    <Link to={`/profile/${props.id}`} className={styles["link"]}>
      <div className={styles["card"]}>
        <div
          className={styles["photo"]}
          style={{ backgroundImage: `url("${props.image}")` }}
        ></div>
        <div className={styles["title"]}>{props.title}</div>
        <div className={styles["favorites"]}>
			<img src="/icons/hearth.svg" alt="Сердечко"/>
		</div>
      </div>
    </Link>
  );
}

export default Card;
