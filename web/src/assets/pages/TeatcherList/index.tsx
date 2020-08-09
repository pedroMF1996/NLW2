import React, { useState, FormEvent } from 'react';

import PageHeader from '../../../components/PageHeader';
import TeatcherItem, { Teatcher } from '../../../components/TeatcherItem';
import Input from '../../../components/input';
import Select from '../../../components/Select';
import api from '../../../services/api';

import './style.css';


function TeatcherList (){
    const [subject, setSubject] = useState('');
    const [weekDay, setweekDay] = useState('');
    const [time, setTime] = useState('');
    const [teatchers, setTeatchers] = useState([]);

    async function searchTeatchers(e: FormEvent){
        e.preventDefault();
        console.log({subject, weekDay, time})

        const response = await api.get('/classes', {params:{subject, week_day:weekDay, time}});
        
        setTeatchers(response.data);
    }

    return(
        <div id="page-teatcher-list" className="container">
            <PageHeader title="Esses são os proffys disponíveis.">
                <form id="search-teatchers" onSubmit={searchTeatchers}>
                    <Select 
                        name="subject" 
                        label="Matéria" 
                        value={subject}
                        onChange={e=>setSubject(e.target.value)}
                        options= {[
                            {value: 'Artes', label:'Artes'},
                            {value: 'Biologia', label:'Biologia'},
                            {value: 'Ciências', label:'Ciências'},
                            {value: 'História', label:'História'},
                            {value: 'Geografia', label:'Geografia'},
                            {value: 'Matemática', label:'Matemática'},
                            {value: 'Português', label:'Português'},
                            {value: 'Física', label:'Física'},
                            {value: 'Química', label:'Química'},
                            {value: 'Educação Física', label:'Educação Física'}
                        ]} 
                    />
                    <Select 
                        name="week_day" 
                        label="Dia da semana" 
                        value={weekDay}
                        onChange={e=>setweekDay(e.target.value)}
                        options= {[
                            {value: '0', label:'Domingo'},
                            {value: '1', label:'Segunda-feira'},
                            {value: '2', label:'Terça-feira'},
                            {value: '3', label:'Quarta-feira'},
                            {value: '4', label:'Quinta-feira'},
                            {value: '5', label:'Sexta-feira'},
                            {value: '6', label:'Sábado'}
                        ]} 
                    />
                    <Input 
                        name="time" 
                        label="Horário" 
                        type="time"
                        value={time}
                        onChange={e=>{
                            setTime(e.target.value);
                        }}
                    />
                    <button type="submit">
                        Buscar
                    </button>
                </form>
            </PageHeader>

            <main>
            {teatchers.map((teatcher:Teatcher,index)=>{
                return (
                    <TeatcherItem key={teatcher.id} teatcher={teatcher}/>
                );
            })}
            </main>
        </div>
    )
}

export default TeatcherList;