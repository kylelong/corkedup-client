import React, { Component } from 'react';
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
                    <img id="savings" src="https://s3.amazonaws.com/corkedup.wine/assets/savings.png" className="pageImg"/>
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