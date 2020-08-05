import React from 'react';
import  whatsappIcon  from '../../assets/Downloads Dia 01/images/icons/whatsapp.svg';
import './style.css';
import api from '../../services/api';

export interface Teatcher{
        id: number,
        subject: string,
        cost: number,
        user_id: number,
        name: string,
        avatar: string,
        whatsapp: string,
        bio: string
}
    
interface TeatcherItemProps{
    teatcher:Teatcher
}

const TeatcherItem:React.FC<TeatcherItemProps> = ({teatcher}) => {
    async function createNewConnection(){
        await api.post('/connections',{user_id: teatcher.id});
    }

    return (
        <article className="teatcher-item">
        <header>
            <img src={teatcher.avatar} alt={teatcher.name}/>
            <div>
                <strong>{teatcher.name}</strong>
                <span>{teatcher.subject}</span>
            </div>
        </header>
        <p>{teatcher.bio}</p>
        <footer>
            <p>Preço por hora <strong>R${teatcher.cost}</strong></p>
            <a 
                target="_blank"
                href={`https://wa.me/${teatcher.whatsapp}`}
                onClick={createNewConnection}>
                <img src={whatsappIcon} alt="whatsapp"/>
                Entrar em contato
            </a>
        </footer>
    </article>
    );
}

export default TeatcherItem;