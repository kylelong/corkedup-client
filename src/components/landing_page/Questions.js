import React from 'react';
import questions from '../../assets/questions.png'
import { HashLink as Link } from 'react-router-hash-link';
import '../../styles/Questions.css';
const Questions = () => {
    return (
        <div id="faq">
          <p className="sectionHeader" className='faq'>Questions</p>

          <div className="questionsContainer">

            <div className="questionContainer">
              <p className="question">How does it work?</p>
              <p className="answer">Daily you will be informed of exciting events, deals, and recipes that enrich your wine experience. </p>
            </div>

            <div className="questionContainer">
              <p className="question">How much does it cost?</p>
              <p className="answer">Visit the <Link to="#pricing">pricing</Link> section for details.</p>
            </div>

            <div className="questionContainer">
              <p className="question">How secure is entering my credit card info?</p>
              <p className="answer">We do not personally store any credit card data. Payments are safely and securely processed by <a href="https://stripe.com/about" target="_blank">Stripe</a>, the leader in online economic infrastructure</p>
            </div>

          </div>
          


        </div>
    );
};

export default Questions;