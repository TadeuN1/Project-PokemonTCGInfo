import { useParams, useNavigate } from "react-router-dom"
import { CardProps } from '../home';
import styles from './detail.module.css'
import { useState, useEffect } from "react"

interface ResponseData {
    data: CardProps
}
interface ErrorData {
    error: string
}
type DataProps = ResponseData | ErrorData

export function Detail(){

    const { card } = useParams();
    const navigate = useNavigate();

    const [ cards, setCards ] = useState<CardProps>()
    const [ loading, setLoading] = useState(false)


    useEffect(() => {
        async function getCard() {
            try{
                fetch(`https://api.pokemontcg.io/v2/cards?q=id:${card}`)
                .then(response => response.json())
                .then((data: DataProps) => {

                    if("error" in data){
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
            } catch(err){
                navigate("/")
            }
        }


        getCard();
    }, [card])

    if(loading){
        return(
            <div className={styles.container}>
                <h4 className={styles.center}> Carregando Detalhes... </h4>
            </div>
        )
    }


    return(
        <div className={styles.container}>

            <section className={styles.img}>

            <h1> {cards?.abilities} </h1>

            </section>
            


            <section className={styles.info}>
                <h1> oi  </h1>
            </section>

        </div>
    )
}