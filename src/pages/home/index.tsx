import { FormEvent, useState, useEffect } from "react"
import { BsSearch } from "react-icons/bs"
import styles from './home.module.css'
import { Link, useNavigate } from "react-router-dom";

export interface CardProps{
    id: string;
    name: string;
    supertype: string;
    subtypes: string[];
    hp?: string;
    types?: string;
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
    set: any;
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
}
interface CardProp{
    data: CardProps[]
}
export function Home(){
    const [pagesize, setPagesize] = useState(5)
    const [cards, setCards] = useState<CardProps[]>([])
    const [input, setInput] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        getData();
    }, [pagesize])


    function getData(){
        fetch(`https://api.pokemontcg.io/v2/cards?page=1&pageSize=${pagesize}`)

        .then(response => response.json())
        .then((data: CardProp) => {
            const cardData = data.data;

            const formatedResult = cardData.map((item) => {
                const formated = {
                    ...item
                }

                return formated
            })

            const listCards = [ ...cards, ...formatedResult];

            console.log(listCards);

            setCards(listCards);

        })
    }
    function handleSubmit(e: FormEvent){
        e.preventDefault();

        if(input === '') return;
        navigate(`/detail/${input}`)
    }

    function handleGetMore(){
        if(pagesize === 5){
            setPagesize(10);
            return;
        }

        setPagesize(pagesize + 10)
    }

    return(
        <main className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                type="text"
                placeholder="Digite o nome do pokémon..."
                value={input}
                onChange={ (e) => setInput(e.target.value)}
                />
                <button type='submit'>
                   <BsSearch size={30} color="#FFF" />
                </button>
            </form>
            


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
                            <Link to={`/detail/${item.name}`}> 
                            <span> {item.name} </span>
                            </Link>
                         </div>
                        
                        </td>
                        <td data-label="Rarity" className={styles.tdLabel}> {item.rarity}</td>
                        <td data-label="Type" className={styles.tdLabel} > {item.types[0]}</td>
                        <td data-label="Set" className={styles.tdLabel}> {item.set.name}  </td>
                        <td data-label="TrendPrice" className={styles.tdLabel}> { item.cardmarket.prices.trendPrice} </td>
                        <td data-label="ASP" className={styles.tdLabel}> { item.cardmarket.prices.averageSellPrice} </td>
                        </tr>
                    ))}

                    

               
                </tbody>
            </table>

            <button className={styles.buttonMore} onClick={handleGetMore}>
                More Cards
            </button>
        </main>
    )

}