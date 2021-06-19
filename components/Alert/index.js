import { Info } from 'react-feather';
import styles from './Alert.module.css'

function Alert(props) {
  return (
    <div className={styles.alert}>
      <Info/>
      <p>{props.text}</p>
    </div>
  );
}

export default Alert;