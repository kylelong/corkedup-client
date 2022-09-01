import React, { Component } from 'react';
import '../../styles/Savings.css';
import data from '../../wtso.json';
import axios from 'axios';
import Loader from '../Loader';


class WTSO extends Component {

    constructor(props){
        super();
        this.state = {
            title: '',
            created_at: '',
            rating: '',
            link: '',
            discount: '',
            src:'',
            price: '',
            quote: '',
            loading: true
        }
    }
    componentDidMount(){
        this.setState({
            title: data.text, 
            created_at: data.created_at,
            rating: data.rating,
            link: data.link,
            discount: data.discount
         })
        axios.get("/.netlify/functions/api/wtso")
        .then((response) => {
            this.setState({
                src: response.data.image,
                price: response.data.price,
                quote: response.data.quote,
                loading: false

            });
        })
        .catch((error) => {
            console.log(error);
        })
    }

    
    render() {

        return (
            <div>
            {
            this.state.loading ? <Loader />:
            <a href={this.state.link} target="_blank" className="savingsLink">
                <div id="wtso">
                        <p className="savingsTitle">{this.state.title}</p>
                        <img src={this.state.src} id="wtso-img" />
                        <p>Rating: {this.state.rating}</p>
                        <p>Discount: {this.state.discount}</p>
                        <p>Price: {this.state.price}</p>
                        <p>Quote: {this.state.quote}</p>
                        <a href={this.state.link} target="_blank"><button className="purchaseBtn">Purchase</button></a>
                </div>
             </a>

            }
            </div>
        );
    }
}

export default WTSO;