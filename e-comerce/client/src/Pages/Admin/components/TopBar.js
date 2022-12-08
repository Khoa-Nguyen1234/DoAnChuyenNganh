import React from 'react'
import '../index.css'


function TopBar(props) {
    return (
        <div>
            <div className="topbar">
                <div className="topbar-name">
                    <h3>{props.name}</h3>
                    
                </div>
                <div className="topbar-account-navigation">
                    <a href="#" className="topbar-account-avatar">
                        <img src={process.env.PUBLIC_URL + '/mens.jpg'} className="userPic"/>
                        <h4>Lucile Bush</h4>
                        <img src={process.env.PUBLIC_URL + '/arrow.svg'}/>
                    </a>
                    <a href="#">
                        <img src={process.env.PUBLIC_URL + '/mail.svg'} />
                        <span className='myBadge my-badge-warning' id='lblCartCount'>5</span>
                    </a>
                    <a href="#">
                    <img src={process.env.PUBLIC_URL + '/notification.svg'} ></img>
                    <span className='myBadge my-badge-warning' id='lblCartCount'>7</span>
                    </a>
                </div>
                
            </div>
            <p className="topbar-subname">{props.subName}</p>
        </div>
        
    )
}

export default TopBar
