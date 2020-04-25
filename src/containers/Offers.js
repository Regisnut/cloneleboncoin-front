import React, { useState, useEffect } from 'react';
import axios from 'axios';
import url from '../utils/url';
import { useHistory } from "react-router-dom";
import emptyPic from "../assets/nophoto.png"
import moment from "moment";
import Pagination from "../components/Pagination"
import Search from "../components/Search"
import CustomerLoader from "../utils/CustomLoader"

function Offers() {
	const [ data, setData ] = useState({});
        const [ isLoading, setIsLoading ] = useState(true);
        const [count, setCount]=useState("");
        const [page, setPage] = useState(1);

	let history = useHistory();

	// Fonction fetch data
	const fetchData = async (page) => {
		try {
                        
                        const response = await axios.get(`${url}/offer/with-count?page=${page}`);
                        setData(response.data.offers);
                        setIsLoading(false);
                        setCount(response.data.count)
                        
		} catch (error) {
			console.log(error.message);
		}
	};

	useEffect(() => {
                fetchData(page);         
        }, [page]);
        
	return (
<div>
			
                        <Search setData={setData}/>
                     
                        {isLoading === true ?(
        // <div >En cours de chargement ...</div>
                   <CustomerLoader />
                
      ):(
        <>     
{data && data ?
       ( <main>
              {data.map((result, index)=>{
const LinkOffer = `/offer/${result._id}`;
return (

       <div className="cardContainer" key={result._id} onClick={()=>{history.push(LinkOffer)}}>
                <img
                src={result.picture?result.picture.secure_url:emptyPic}
                alt={result.title}
                />

<div className="cardContainerRight" >
                      <h2>{result.title} </h2>
                      <h3>{result.price} €</h3>
                      <p>{result.description} </p>
                      <p>Crée par {result.creator.account.username} </p>
                      <p>{moment(result.created).format("YYYY-MM-DD")}</p>

                    </div>

       </div> 
)
              })}


        <Pagination
     
        count={count}
              data={data}
              setData={setData}
              fetchData={fetchData}
              setIsLoading={setIsLoading}
              page={page} setPage={setPage} 
        />

       </main>
       
       )
       :(
        <div >
        <span> Sorry, can't find any results ! </span>
      </div>
       )   
}
</>
                        )
               
                    
}

</div>
        )
}

export default Offers;
