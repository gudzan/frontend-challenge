import { Cat } from "../../types/Cat";
import Card from "../Card/Card";
import styles from "./CardList.module.scss"

type CardListProps = {
  cats: Cat[]
};

const CardList = ({ cats }: CardListProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.cardList}>
        {cats.map((element) => (
          <Card key={element.id} element={element} />
        ))}
      </div>
    </div>
  )
}

export default CardList;
