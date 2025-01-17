import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useAppDispath } from '../redux/store';
import { Cat } from '../types/Cat';
import { catRequested, catRequestFailed, catsReceved } from '../redux/catSlice';
import { selectCount } from '../redux/catSelectors';
import { useSelector } from 'react-redux';

const useAxios = () => {
  const [cats, setCats] = useState<Cat[]>([])
  const [fetching, setFetching] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(0)
  const totalCount = useSelector(selectCount);
  const dispatch = useAppDispath();
  const token = "live_qen8AwTpRJvz5Txsp0hnlsXTNOaAY0X0UCt4cHBzaZDEe92ZDshATvZ5R5UblViq"

  useEffect(() => {
    if (fetching) {
      dispatch(catRequested());
      axios.get("https://api.thecatapi.com/v1/images/search", {
        params: {
          limit: 20,
          page: currentPage,
          api_key: token,
          size: "small",
          mime_types: "jpg"
        },
      })
        .then((response: AxiosResponse<Cat[]>) => {
          const newCats = [...cats, ...response.data]
          setCats(newCats)
          setCurrentPage(prevState => prevState + 1)
          dispatch(catsReceved(newCats));
        })
        .catch(() => dispatch(catRequestFailed()))
        .finally(() => {
          setFetching(false)
        })
    }
  }, [fetching]);

  const refetch = () => {
    setFetching(true)
  }

  return { cats, setCats, fetching, refetch, totalCount };
};

export default useAxios;
