import React from 'react';


import './style.css';
import PageHeader from '../../../components/PageHeader';
import TeatcherItem from '../../../components/TeatcherItem';

function TeatcherList (){
    return(
        <div id="page-teatcher-list" className="container">
            <PageHeader title="Esses são os proffys disponíveis.">
                <form id="search-teatchers" action="">
                    <div className="input-block">
                        <label htmlFor="subject">Matéria</label>
                        <input type="text" id="subject" />
                    </div>
                    <div className="input-block">
                        <label htmlFor="week_day">Dia da semana</label>
                        <input type="text" id="week_day" />
                    </div>
                    <div className="input-block">
                        <label htmlFor="time">Horário</label>
                        <input type="text" id="time" />
                    </div>
                </form>
            </PageHeader>

            <main>
            <TeatcherItem />
            </main>
        </div>
    )
}

export default TeatcherList;