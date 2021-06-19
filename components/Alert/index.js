import { Info } from 'react-feather';
import styles from './Alert.module.css'

function Alert(props) {
  return (
    <div className={styles.alert}>
      <Info/>
      {props.text}
    </div>
  );
}

export default Alert;