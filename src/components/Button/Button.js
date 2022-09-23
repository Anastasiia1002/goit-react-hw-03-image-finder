import css from './Button.module.css';

const Button = ({ loadMore }) => {
  return (
    <button type="button" onClick={() => loadMore()} className={css.Button}>
      <span>Load more</span>
    </button>
  );
};
export default Button;
