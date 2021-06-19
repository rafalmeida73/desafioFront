import styles from '../styles/Home.module.css'
import { useForm } from "react-hook-form"
import axios from 'axios'
import { useState } from 'react'
import Alert from '../components/Alert'
import InputMask from 'react-input-mask'

export default function Home(props) {
  const { register, handleSubmit } = useForm();
  const [result, setResult] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [zipCode, setZipCode] = useState('');
  const [state, setstate] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');

  const onSubmit = data => {
    if (data.zipcode.indexOf('_')) {
      setResult(false);
      setError(true);
      setErrorMessage("CEP incompleto. Digite 8 números!")
    } else {
      axios.get(`https://viacep.com.br/ws/${data.zipcode}/json/`)
        .then(function (response) {
          const { localidade, uf, logradouro, erro } = response.data;
          // handle success
          if (erro) {
            //error
            setResult(false);
            setError(true)
            setErrorMessage("Cep digitado não foi encontado! 👎🏿")
          } else {
            setResult(true);
            setError(false);

            setZipCode(data.zipcode);
            setstate(uf);
            setCity(localidade);
            setStreet(logradouro);
          }
        })
        .catch(function (error) {
          // handle error
          setResult(false);
          setError(true)
          setErrorMessage("Ocorreu um erro ao consultar CEP!")
        })
    }
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>

        {error && (
          <Alert text={errorMessage} />
        )}

        <div className={styles.card}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputMask
              mask="99999999"
              id="zipcode"
              {...register("zipcode")}
            />
            <button type="submit">
              Buscar CEP
            </button>
          </form>
        </div>

        {result && (
          <div className={styles.result}>
            <p>
              <strong>
                CEP:
              </strong>
              {zipCode}
            </p>
            <p>
              <strong>
                Estado:
              </strong>
              {state}
            </p>
            <p>
              <strong>
                Cidade:
              </strong>
              {city}
            </p>
            <p>
              <strong>
                Logradouro:
              </strong>
              {street}
            </p>
          </div>
        )}

      </main>
    </div>
  )
}
