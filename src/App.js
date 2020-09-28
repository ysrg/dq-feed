import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Pagination } from "@material-ui/lab";

import { Header } from "./features/header/Header";
import usePagination from "./features/pagination/Pagination";
import "./App.css";
import CardList from "./features/card/CardList";
import {
  selectCards,
  add,
  fill,
  cardList,
} from "./features/card/cardListSlice";

function App() {
  const history = useHistory();
  const posts = useSelector(cardList);
  const favPosts = useSelector(selectCards);
  let PER_PAGE = 7;
  let [page, setPage] = useState(1);
  const initCardList = usePagination(posts, PER_PAGE),
    favCardList = usePagination(favPosts, PER_PAGE);
  const pageCount =
    history.location.pathname === "/favs"
      ? Math.ceil(favPosts.length / PER_PAGE)
      : Math.ceil(posts.length / PER_PAGE);
  const _DATA =
    history.location.pathname === "/favs" ? favCardList : initCardList;

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  const favCards = useSelector(selectCards);
  const dispatch = useDispatch();
  useEffect(() => {
    fetch(
      "https://finnhub.io/api/v1/company-news?symbol=AAPL&from=2020-01-01&token=bto0mm748v6v7atie760"
    )
      .then((response) => response.json())
      .then((data) => {
        dispatch(fill(data));
        dispatch(add(data[0]));
      });
  }, []);

  return (
    <div className="App">
      <Header />
      <CardList posts={_DATA.currentData()} />
      <div className="pagination">
        <Pagination
          count={pageCount}
          size="large"
          page={page}
          variant="outlined"
          shape="rounded"
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default App;
