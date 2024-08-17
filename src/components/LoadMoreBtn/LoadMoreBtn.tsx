import css from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  handleLoadMore: () => void;
}

export default function LoadMoreBtn({ handleLoadMore }: LoadMoreBtnProps) {
  return (
    <button className={css.button} onClick={handleLoadMore}>
      Load more
    </button>
  );
}
