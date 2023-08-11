import styles from "./EmptyWishlist.module.scss";
import emptyCloud1 from "../../assets/Vectoremptycloud1.png";
import emptyCloud2 from "../../assets/Vectoremptycloud2.png";

const EmptyWhishlist = () => {
  return (
    <div className={styles.empty_wishlist}>
      <div className={styles.image_container}>
        <img src={emptyCloud1} alt="cloud 1" className={styles.cloudimage1} />
        <img src={emptyCloud2} alt="cloud 2" className={styles.cloudimage2} />
      </div>
      <p>No locations added to watchlist</p>
    </div>
  );
};

export default EmptyWhishlist;