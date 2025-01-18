import React from 'react';
import './Pricing.css';

const Pricing = () => {
  return (
    <>
    <section className="pricing_Wrapper"> 
    <div className="container ">
    <div className='text-center ' style={{lineHeight:'2.5'}}>
    <h2 className=' title'>Pricing Plans</h2> 
        <h3>Streamline Your Email Campaigns with Dummy Mails </h3>
        <p>Powerful, User-Friendly and Scalable Email Solution.</p>
       
    </div>
     <div className="row ">
        <div className="col-12 col-md-3 card_border">
        <h2>Beginner </h2>
        <h5>Start a Trial</h5>
        <h1 className='price'> $ 0</h1>
        <ul className='ul_tabs'>
            <li> Duration : 7 Days</li>
            <li> Daily 10 emails free</li>
            <li> No Hidden Fees</li>
            <li> 100+ Video Tutorials</li>
            <li> No Tools</li>
        </ul>
        <button className="btn get_started  mt-2">Get Started</button>
        </div>
        <div className="col-12 col-md-3 card_border" style={{backgroundColor:'#84bff9'}}>
        <button className='btn Popular_btn '>Popular</button>
        <h2>  Intermediate </h2>
        <h5>For Small Bussiness Team</h5>
        <h1 className='price'> $ 12.9 </h1>
        <ul className='ul_tabs '>
            <li> Duration : 3 Month</li>
            <li>Daily 100 emails </li>
            <li> No Hidden Fees</li>
            <li> 100+ Video Tutorials</li>
            <li> 2 Tools</li>
        </ul>
        <button className="btn get_started mt-2">Get Started</button>
        </div>
        <div className="col-12 col-md-3 card_border">
        <h2>Advance </h2>
        <h5>Unlimited Possibilites</h5>
         <h1 className='price'> $ 40</h1>
         <ul className='ul_tabs '>
            <li> Duration : 1 Year</li>
            <li> Unlimited Features</li>
            <li> No Hidden Fees</li>
            <li>Unlimited Videos</li>
            <li> Unlimited Tools</li>
        </ul>
        <button className="btn get_started mt-2">Get Started</button>
         </div>
      
        </div>    
    </div>
    </section>
   
     
    </>
  )
}

export default Pricing
