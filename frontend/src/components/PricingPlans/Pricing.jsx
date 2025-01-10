import React from 'react';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
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
     <div className="row mt-5">
        <div className="col-12 col-md-3 card_border">
        <h2>Beginner </h2>
        <h5>Start a Trial</h5>
        <h1 className='price'> $ 0</h1>
        <ul className='ul_tabs '>
            <li><DoneIcon style={{ color: '#097969' }}/> Duration : 7 Days</li>
            <li><DoneIcon style={{ color: '#097969' }}/> Daily 10 emails free</li>
            <li><CloseIcon style={{color: '#C6011F'}}/> No Hidden Fees</li>
            <li><CloseIcon style={{color: '#C6011F'}}/> 100+ Video Tutorials</li>
            <li><CloseIcon style={{color: '#C6011F'}}/> No Tools</li>
        </ul>
        <button className="btn get_started  mt-2">Get Started</button>
        </div>
        <div className="col-12 col-md-3 card_border" style={{backgroundColor:'#e9edf0'}}>
        <button className='btn Popular_btn '>Popular</button>
        <h2>  Intermediate </h2>
        <h5>For Small Bussiness Team</h5>
        <h1 className='price'> $ 12.9 </h1>
        <ul className='ul_tabs '>
            <li><DoneIcon style={{ color: '#097969' }}/> Duration : 3 Month</li>
            <li><DoneIcon style={{ color: '#097969' }}/> Daily 100 emails </li>
            <li><DoneIcon style={{ color: '#097969' }}/> No Hidden Fees</li>
            <li><CloseIcon style={{color: '#C6011F'}}/> 100+ Video Tutorials</li>
            <li><CloseIcon style={{color: '#C6011F'}}/> 2 Tools</li>
        </ul>
        <button className="btn get_started mt-2">Get Started</button>
        </div>
        <div className="col-12 col-md-3 card_border">
        <h2>Advance </h2>
        <h5>Unlimited Possibilites</h5>
         <h1 className='price'> $ 40</h1>
         <ul className='ul_tabs '>
            <li><DoneIcon style={{ color: '#097969' }}/> Duration : 1 Year</li>
            <li><DoneIcon style={{ color: '#097969' }}/> Unlimited Features</li>
            <li><DoneIcon style={{ color: '#097969' }}/> No Hidden Fees</li>
            <li><DoneIcon style={{ color: '#097969' }}/> Unlimited Videos</li>
            <li><DoneIcon style={{ color: '#097969' }}/> Unlimited Tools</li>
        </ul>
        <button className="btn get_started mt-2">Get Started</button>
         </div>
      
        </div>

        {/* <Link></Link> */}
      
    </div>
    </section>
   
     
    </>
  )
}

export default Pricing
