import styles from "./Spinner.module.scss"

type SpinnerProps = {
  fetching: boolean;
};

const Spinner = ({ fetching }: SpinnerProps) => {
  if (fetching) {
    return (
      <div className={styles.spinner}>
        ... загружаем котиков ...
      </div>)
  }
  return null
}

export default Spinner;
