import React from 'react';
import  whatsappIcon  from '../../assets/Downloads Dia 01/images/icons/whatsapp.svg';
import './style.css';

function TeatcherItem(){
    return (
        <article className="teatcher-item">
        <header>
            <img src="https://avatars0.githubusercontent.com/u/32961778?s=460&u=106e18d188d6023b7d1efc00240dfe63b4f0cfc9&v=4" alt="Pedro Martins Falleiros"/>
            <div>
                <strong>Pedro Martins Falleiros</strong>
                <span>Cálculo</span>
            </div>
        </header>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.  <br/> Aperiam quae fugiat officiis modi. Tempora omnis repudiandae consequatur quia voluptatum at recusandae. Accusamus, explicabo tempore laborum consectetur magni quaerat repudiandae quisquam.</p>
        <footer>
            <p>Preço por hora <strong>R$20,00</strong></p>
            <button type="button">
                <img src={whatsappIcon} alt="whatsapp"/>
                Entrar em contato
            </button>
        </footer>
    </article>
    );
}

export default TeatcherItem;