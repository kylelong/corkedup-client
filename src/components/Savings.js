import React, { Component } from 'react';
import savings from '../assets/savings.png';
import '../styles/Savings.css';
import WTSO from './savings/Wtso';
import LastBottle from './savings/LastBottle';
import SideMenu from './SideMenu';
import Navigation from './Navigation';
class Savings extends Component {

    constructor(props){
        super();
        this.state = {
           
        }
    }
    componentDidMount(){
       
    }

    
    render() {
        let header = "SAVINGS";
        return (
            <>
                 <Navigation />
                 <div className="savingsContainer">
                    <img id="savings" src={savings} className="pageImg"/>
                    <SideMenu />
                    <div className="saveItemsContainer">
                    <WTSO/>
                    <LastBottle/>
                    </div>

                </div>
            </>
        );
    }
}

export default Savings;