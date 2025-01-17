import { useSelector } from "react-redux";
import CardList from "../../components/CardList/CardList";
import Header from "../../components/Header/Header";
import { selectFavourites } from "../../redux/catSelectors";
import styles from "./Favourites.module.scss"

const Favourites = () => {
  const catsStore = useSelector(selectFavourites);

  if (catsStore.length === 0) {
    return (
      <>
        <Header />
        <div className={styles.null}>У вас нет любимых котиков :(</div>
      </>
    )
  }

  return (
    <>
      <Header />
      <CardList cats={catsStore} />
    </>
  )
}

export default Favourites;
