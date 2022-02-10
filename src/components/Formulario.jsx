import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Error from './Error';
import useSelectMonedas from '../hooks/useSelectMonedas';
import { monedas } from '../data/monedas';


const InputSubmit = styled.input`
    background-color: #9797FF;
    border:none;
    width: 100%;
    padding: 10px;
    color: #fff;
    font-weight: 700;
    font-size: 20px;
    text-transform: capitalize;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color: .3s ease-in;
    margin-top: 30px;

    &:hover{
        background-color: #7A7DFE;
    }
`
const Formulario = ({setMonedas}) => {
    
    const [criptos, setCriptos] = useState([]);
    const [error, setError] = useState(false);
    const [ moneda, SelectMonedas] = useSelectMonedas('Elige tu moneda', monedas);
    const [ criptomoneda, SelectCriptomonedas] = useSelectMonedas('Elige tu criptomoneda', criptos);

    useEffect(()=>{
        const consultarAPI = async()=>{
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
            const respuesta = await fetch(url);
            const resultado = await respuesta.json()
            console.log(resultado.Data);

            const arrayCriptos = resultado.Data.map(cripto => {
                const objeto = {
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName 
                }

                return objeto;

            })

            setCriptos(arrayCriptos);
        }

        consultarAPI();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        if([moneda, criptomoneda].includes('')){
            setError(true);
            return;
        }

        setError(false);

        setMonedas({
            moneda,
            criptomoneda
        })
    }

    return (
        <>
            {error && <Error>Todos los campos son obligatorios</Error>}
            <form
                onSubmit={handleSubmit}
            >
                <SelectMonedas/>
                <SelectCriptomonedas/>
                <InputSubmit type="submit" value="Cotizar" />
            </form>
        </>
    );
}
 
export default Formulario;