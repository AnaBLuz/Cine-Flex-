import styled from "styled-components"
import {useParams} from "react-router-dom"
import { useEffect,useState } from "react"
import axios from "axios"


export default function SeatsPage() {
    const { idSessao } = useParams()
    const [assentos,setAssentos] = useState(undefined)
    const [assentosSelecionados, setAssentosSelecionados] = useState([]);

    useEffect(() => {
        const promisse = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`);
        promisse.then(resp => {setAssentos(resp.data)});
        promisse.catch(err => console.log(err.response.data));

    },[])

   if(assentos === undefined){ 
    return(
        <div> Carregando... </div>
    );
    }

    function assentoClicado(assento){
        if(!assento.isAvailable){
            alert("Assento indisponível")
        }
        else
        { const selecionado = assentosSelecionados.some((s) => s.id === assento.id)
               if(selecionado){ const newArray = assentosSelecionados.filter((a) => a.id !== assento.id)
                                setAssentosSelecionados(newArray)}
               else{ setAssentosSelecionados([...assentosSelecionados,assento])} 
            }
    }
 

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {assentos.seats.map((a) => 
                <SeatItem 
                isAvailable={a.isAvailable}
                selecionado = {assentosSelecionados.some((s) => s.id === a.id)}
                onClick={() => assentoClicado(a)} 
                >{a.name} 
                </SeatItem>)}
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle status = "selecionado"/>
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle status = "disponivel"/>
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle status = "indisponivel"/>
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer>
                Nome do Comprador:
                <input placeholder="Digite seu nome..." />

                CPF do Comprador:
                <input placeholder="Digite seu CPF..." />

                <button>Reservar Assento(s)</button>
            </FormContainer>

            <FooterContainer>
                <div>
                    <img src={assentos.movie.posterURL} alt={assentos.movie.title} />
                </div>
                <div>
                    <p>{assentos.movie.title}</p>
                    <p>{assentos.day.weekday} - {assentos.name} </p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid ${(props) => {if(props.status === 'selecionado'){return '#0E7D71'}
                                    else if(props.status === 'disponivel'){return '#7B8B99'}
                                    else {return '#F7C52B'}}};  

    background-color: ${(props) => {if(props.status === 'selecionado'){return '#1AAE9E'}
                                    else if(props.status === 'disponivel'){return '#C3CFD9'}
                                    else {return '#FBE192'}}};  
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const SeatItem = styled.div`
    border: 1px solid ${(props) => {if(!props.isAvailable){return '#F7C52B'}
                                    else{if(props.selecionado){return '#0E7D71'}
                                        else{return '#7B8B99'}}}}; 

    background-color: ${(props) => {if(!props.isAvailable){return '#FBE192'}
                                    else{if(props.selecionado){return '#0E7D71'}
                                       else{return '#C3CFD9'}}}} ;  
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`