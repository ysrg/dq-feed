import React from "react";
import { useSelector } from "react-redux";
import { cardList } from "./cardListSlice";
import Card from "./Card";
import styles from "./Cardlist.module.css";
import PropTypes from "prop-types";

const CardList = ({ posts }) => {
  const postsList = useSelector(cardList);
  const renderCard = (post, index) => {
    if (post) return <Card index={index} key={post.id} post={post} />;
    return null;
  };

  return (
    <div className={styles.main}>
      <div className={styles.left}>{renderCard(posts[0], 0)}</div>
      <div className={styles.App__cardlist}>
        {posts.map((post, index) => {
          if (postsList.indexOf(post) > 0) return renderCard(post, index);
          return null;
        })}
      </div>
    </div>
  );
};

CardList.propTypes = {
  posts: PropTypes.array,
};

export default React.memo(CardList);
