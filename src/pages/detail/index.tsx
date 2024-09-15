import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { CardProps } from '../home';
import styles from './detail.module.css'

interface ResponseData {
    data: CardProps
}
interface ErrorData {
    message: string
}
type DataProps = ResponseData | ErrorData

export function Detail() {

    const { card } = useParams();
    const navigate = useNavigate();

    const [ cards, setCards ] = useState<CardProps>()
    const [ loading, setLoading] = useState(false)


    useEffect(() => {

        async function getCard(){
            try{
                fetch(`https://api.pokemontcg.io/v2/cards/${card}`)
                .then(response => response.json())
                .then((data:DataProps) => {

                    if("message" in data){
                        navigate("/");
                        return
                    }
                    
                    const price = Intl.NumberFormat("en-US", {
                        style:"currency",
                        currency:"EUR",
                    })

                    const resultData = {
                        ...data.data,
                        formatedTrendPrice: price.format(Number(data.data.formatedTrendPrice)),
                        formatedASP: price.format(Number(data.data.formatedASP))
                    }

                   setCards(resultData)
                   setLoading(false)
                })

            }catch(err){
                navigate("/")        
        }
    }
        getCard()
}, [card])

    if(loading){
        return(
            <div className={styles.container}>
                <h4 className={styles.center}> Carregando Detalhes... </h4>
            </div>
        )
    }


    return(

        <div>
            <img
            src={cards?.images.small} 
            alt="imagem carta" />

            <section>
                
            </section>

        </div>
    )
}