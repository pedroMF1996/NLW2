import React, { useState, useEffect } from 'react';

import {Link} from 'react-router-dom'

import logoIMG from '../../Downloads Dia 01/images/logo.svg';
import landingIMG from '../../Downloads Dia 01/images/landing.svg';
import studyIcon from '../../Downloads Dia 01/images/icons/study.svg';
import giveClassesIcon from '../../Downloads Dia 01/images/icons/give-classes.svg';
import purpleHeartIcon from '../../Downloads Dia 01/images/icons/purple-heart.svg';
import './style.css';
import api from '../../../services/api';


function Landing(){
    const [totalConnections,setTotalConnections] = useState(0);

    useEffect(()=>{
        api.get('connections')
        .then(res => {
            const {total}= res.data;
            setTotalConnections(total);
        })
    }, []);

    return (
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <div className="logo-container">
                    <img src={logoIMG} alt="Proffy"/>
                    <h2>Sua plataforma de estudos online</h2>
                </div>
                <img 
                    src={landingIMG} 
                    alt="plataforma de estudos" 
                    className="hero-image"
                />
                <div className="buttons-container">
                    <Link to="/study" className="study">
                        <img src={studyIcon} alt="estudar"/>
                        Estudar
                    </Link>
                    <Link to="/give-classes" className="give-classes">
                        <img src={giveClassesIcon} alt="dar aula"/>
                        Dar aula
                    </Link>
                </div>

                <span className="total-connections">
                    Total de {totalConnections} conexões já realizadas
                    <img src={purpleHeartIcon} alt="cração roxo"/>
                </span>
            </div>
        </div>
    );
}

export default Landing;
