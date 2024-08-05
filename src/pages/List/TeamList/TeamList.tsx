import Card from "../../../components/Card/Card";
import { TeamListProps } from "./TeamList.props";
import styles from "./TeamList.module.css";

export function TeamList({ users }: TeamListProps) {
  return <div className={styles['wrapper']}>
  {users.map((user) => (
    <Card
      title={user.first_name + " " + user.last_name}
      id={user.id}
      image={user.avatar}
      key={user.id}
    />
  ))}
  </div> 
}
