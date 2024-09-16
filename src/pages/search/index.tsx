import { useNavigate, useParams } from "react-router-dom";
import { CardProps } from "../home"
import { useEffect, useState } from "react";

interface ResponseData {
    data: CardProps
}

interface ErrorData{
    message: string;
}
type DataProps = ResponseData | ErrorData



export function Search(){

    const { name } = useParams();
    const navigate = useNavigate();

    const [ card, setCard ]= useState<CardProps>()
    const [ loading, setLoading] = useState(true)


    useEffect(() => {

    async function getCard() {
         try{
             fetch(`https://api.pokemontcg.io/v2/cards?q=name:?${name}`)
            .then(response => response.json())
            .then((data:DataProps) => {

        if("message" in data){
         navigate("/");
         return
     }

        const resultData ={
            ...data.data
        }

        setCard(resultData)
        setLoading(false)
    })    
    
    }catch(err){
           navigate("/")
    }
}   
        getCard()
    }, [name])


    if(loading){
        return(
            <div> Carregando Lista de Pokémons </div>
        )
    }


    return(

        <div> {card?.name} </div>
    )
}