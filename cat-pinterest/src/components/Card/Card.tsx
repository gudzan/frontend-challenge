import { favouritesAdd, favouritesRemove } from "../../redux/catSlice";
import { useAppDispath } from "../../redux/store";
import { Cat } from "../../types/Cat";
import styles from "./Card.module.scss"
import { useState } from "react";

type CardProps = {
  element: Cat
};

const Card = ({ element }: CardProps) => {
  const dispatch = useAppDispath();
  const [like, setLike] = useState(element.favorite)

  const handleClickLike = () => {
    if(like){
      dispatch(favouritesRemove(element.id))
    }
    else{
      dispatch(favouritesAdd(element))
    }
    setLike(prevState => !prevState)
  }

  const likeClassName = like ? styles.like : styles.heard

  return (
    <div className={styles.card}>
      <img className={styles.image} src={element.url}></img>
      <button className={likeClassName} onClick={handleClickLike}></button>
    </div>
  )
}

export default Card;
