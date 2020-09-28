import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { cardList, removeMainListItems } from "../card/cardListSlice";

import styles from "./Header.module.css";

export const Header = () => {
  const [value, setValue] = useState("");
  const cards = useSelector(cardList);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setValue(e.target.value);
    // @to-do add debounce
    dispatch(removeMainListItems(e.target.value));
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <Link to="/">
          <h3 className={styles.headerMenu}>News</h3>
        </Link>
        <Link to="/favs">
          <h3 className={styles.headerMenu}>Bookmarks</h3>
        </Link>
      </div>
      <div className={styles.headerInput}>
        <input
          onChange={handleChange}
          value={value}
          type="search"
          placeholder="Search"
        />
      </div>
    </header>
  );
};
