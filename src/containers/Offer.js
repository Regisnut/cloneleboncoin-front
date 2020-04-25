import React, { useState, useEffect } from 'react';
import axios from 'axios';
import url from '../utils/url';
import emptyPic from "../assets/nophoto.png"
import { useParams, useHistory } from 'react-router-dom';
import moment from "moment";
import CustomerLoader from "../utils/CustomLoader"

function Offer(tokenUser) {
	const history = useHistory();
	const { id } = useParams();

	const [ isLoading, setIsLoading ] = useState(true);
	const [ offer, setOffer ] = useState({});

	const offerLink = `${url}/offer/${id}`;

	const fetchData = async () => {
		try {
			const response = await axios.get(offerLink);
			setOffer(response.data);
			setIsLoading(false);
		
		} catch (error) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		fetchData();
	
      }, [id]);

	return (<>
	{isLoading === true ?
	 (<CustomerLoader/>):
	 (
		 <div className="offerContainer">
			 <section className="leftCard">
				 <div>
				<img src={offer.picture?offer.picture.url : emptyPic} alt="pic"></img>
				<h2>{offer.title} </h2>
                      <h3>{offer.price} €</h3>
					  <p>{moment(offer.created).format("DD-MM-YYYY")}</p>
				 </div>
				 <hr/>
				 <div>
					 <h4>Description</h4>
					 <p>{offer.description} </p>
				 </div>
				 <hr/>
				 </section>
			 <section className="rightCard">
			 <div>
					 <h2>{offer.creator.account.username}</h2>
					 <hr/>
					 <button onClick={(event)=>{
						 event.preventDefault();
						 if(tokenUser===null){
history.push("/login");
					 }else{
						history.push("/payment", {
							productId: offer._id,
							img: offer.picture ? offer.picture.url :emptyPic,
							title: offer.title,
							price: offer.price
						  } )
						}
					 }}><span>€</span> Faire une offre</button>
				 </div>
				 </section>
		 </div>
	 )
}
	</>)
}

export default Offer;
