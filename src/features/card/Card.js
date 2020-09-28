import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCards, add, remove } from "./cardListSlice";
import PropTypes from "prop-types";

import style from "./Card.module.css";

const truncate = (input) =>
  input.length > 100 ? `${input.substring(0, 100)}...` : input;

const Card = ({ post, index }) => {
  const favCards = useSelector(selectCards);
  const dispatch = useDispatch();
  const [src, setSrc] = useState("");
  useEffect(() => {
    const loadImage = async () => {
      try {
        const { default: src } = await import(
          `../../assets/bm_${
            favCards.indexOf(post) !== -1 ? "full" : "empty"
          }.png`
        );
        setSrc(src);
      } catch (err) {
        console.error("failed to load icon");
      }
    };
    loadImage();
  }, [favCards, post]);

  const bmClick = () => {
    if (favCards.indexOf(post) === -1) dispatch(add(post));
    else dispatch(remove(post));
  };
  const cardClick = () => {
    window.open(post.url, "_blank");
  };

  const date = new Date(post.datetime);
  const month = date.toLocaleString("en-us", { month: "short" });
  const DOW = date.getDate();
  return (
    <div
      className={`${style.App__card} ${
        index === 0 ? style.App__card__main : ""
      }`}
      style={{ backgroundImage: `url(${post.image}` }}
    >
      <div className={style.inner}>
        {index === 0 ? <div className={style.latest}>Latest News</div> : null}
        <div className={style.related}>{post.related}</div>
        <h3 onClick={cardClick}>{post.headline}</h3>
        <div className={style.summary}>{truncate(post.summary)}</div>
        <div className={style.footer}>
          <div className={style.date}>{`${month} ${DOW}`}</div>
          <div className={style.ln}>Open</div>
          {index === 0 ? (
            ""
          ) : (
            <div className={style.bk}>
              <img onClick={bmClick} src={src} alt="" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  post: PropTypes.object.isRequired,
  index: PropTypes.number,
};

export default Card;
