import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCats } from "../../redux/catSelectors";
import Header from "../../components/Header/Header";
import CardList from "../../components/CardList/CardList";
import useAxios from "../../hooks/useAxios";
import Spinner from "../../components/Spinner/Spinner";

const Home = () => {
  const { cats, setCats, fetching, refetch, totalCount } = useAxios()
  const catsStore = useSelector(selectCats);

  useEffect(() => {
    if (catsStore.length === 0) {
      refetch()
    }
    else{
      setCats(catsStore);
    }
  }, []);

  useEffect(() => {
    setCats(catsStore);
  }, [catsStore]);

  const scrollHandler = (e: any) => {
    const scrollHeight = e.target.documentElement.scrollHeight;
    const scrollTop = e.target.documentElement.scrollTop;
    const innerHeight = window.innerHeight
    if ((scrollHeight - (scrollTop + innerHeight) < 400) && (cats.length < totalCount)) {
      refetch()
    }
  }

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
    return function () {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [cats])

  return (
    <>
      <Header />
      <CardList cats={cats} />
      <Spinner fetching={fetching} />
    </>
  )
}

export default Home;
