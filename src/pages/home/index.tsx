import { useState, useEffect } from "react"
import styles from './home.module.css'
import { Link } from "react-router-dom";

export interface CardProps{
    id: string;
    name: any[];
    supertype: string;
    subtypes: string[];
    hp?: string;
    types?: string[];
    evolesFrom?: string;
    evolvesTo?: string[];
    rules?: string[];
    ancientTrait?: any;
    abilities?: any;
    attacks?: any;
    weaknesses?: any;
    resistances?: any;
    retreatCost?: string[];
    convertedRetreatCost?: number;
    set: string[];
    number: string;
    artist?: string;
    rarity: string;
    flavorText?: string;
    nationalPokedexNumbers?: number[];
    legalities: any;
    regulationMark?: string;
    images: any;
    tcgplayer?: any;
    cardmarket?: any;
    formatedTrendPrice?: any;
    formatedASP?: any;
}
interface CardProp{
    data: CardProps[]
}
export function Home(){
    const [pagesize, setPagesize] = useState(60)
    const [cards, setCards] = useState<CardProps[]>([])

    useEffect(() => {
        getData();
        setPagesize(pagesize)
    }, [pagesize])


    function getData(){
        fetch(`https://api.pokemontcg.io/v2/cards?page=1&pageSize=${pagesize}`)

        .then(response => response.json())
        .then((data: CardProp) => {
            const cardData = data.data;

            const price = Intl.NumberFormat("en-US", {
                style:"currency",
                currency:"EUR",
            })

            const formatedResult = cardData.map((item) => {
                const formated = {
                    ...item,
                    formatedTrendPrice: price.format(Number(item.cardmarket.prices.trendPrice)),
                    formatedASP: price.format(Number(item.cardmarket.prices.averageSellPrice))
                }

                return formated
            })

            const listCards = [...cards, ...formatedResult];

            setCards(listCards);

        })
    }

    return(
        <main className={styles.container}>
            


            <table>
                <thead>
                    <tr>
                        <th scope="col"> Name </th>
                        <th scope="col"> Rarity </th>
                        <th scope="col"> Type </th>
                        <th scope="col"> Set </th>
                        <th scope="col"> Trend Price</th>
                        <th scope="col"> Average Sell Price </th>
                    </tr>
                </thead>

                <tbody>
                
                    { cards.length > 0 && cards.map( (item) => (
                        <tr 
                        className={styles.tr}
                        key={item.id}>

                        <td 
                        className={styles.tdLabel}
                        data-label="Name" > 
                        
                         <div className={styles.name}> 
                            <Link to={`/detail/${item.id}`}> 
                            <span> {item.name} </span>
                            </Link>
                         </div>
                        
                        </td>
                        <td data-label="Rarity" className={styles.tdLabel}> {item.rarity}</td>
                        <td data-label="Type" className={styles.tdLabel} > {item.types[0]}</td>
                        <td data-label="Set" className={styles.tdLabel}> {item.set.name}  </td>
                        <td data-label="TrendPrice" className={styles.tdLabel}> {item.formatedTrendPrice} </td>
                        <td data-label="ASP" className={styles.tdLabel}> { item.formatedASP} </td>
                        </tr>
                    ))}

                    

               
                </tbody>
            </table>

        </main>
    )

}