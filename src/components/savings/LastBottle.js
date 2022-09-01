import React, { Component } from 'react';
import '../../styles/Savings.css';
import axios from 'axios';
import Loader from '../Loader';


class LastBottle extends Component {

    constructor(props){
        super();
        this.state = {
            name:'',
            price:'',
            image:'',
            details:'',
            technical_details: [],
            loading: true
        }
    }
    componentDidMount(){
    
        axios.get("/.netlify/functions/api/lastbottle")
        .then((response) => {
            this.setState({
                name:response.data.name,
                image: response.data.image,
                price: response.data.price,
                details: response.data.details,
                technical_details: response.data.technical_details,
                loading: false
            });
            if(this.state.price.length == 4){
                this.setState({price: this.state.price.substring(2)})
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    
    render() {

        return (
            <div>
            {this.state.loading ? <Loader /> :
            <a href="https://www.lastbottlewines.com/" target="_blank" className="savingsLink">
                <div id="wtso">
                        <p className="savingsTitle">{this.state.name}</p>
                        <img src={this.state.image} id="lastbottle-img" />
                        <p>Price: ${this.state.price}</p>
                        <p>Details:</p>
                        {this.state.technical_details.map((item, index) => {
                            return <p key={index}>{item}</p>
                        })

                        }
                        <a href={this.state.link} target="_blank"><button className="purchaseBtn">Purchase</button></a>
                </div>
             </a>

            }
            </div>
        );
    }
}

export default LastBottle;