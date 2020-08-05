import React, {useState, FormEvent} from 'react';
import {useHistory} from 'react-router-dom';
import warningIcon from '../../Downloads Dia 01/images/icons/warning.svg';

import PageHeader from '../../../components/PageHeader';
import Input from '../../../components/input';
import Textarea from '../../../components/Textarea';
import Select from '../../../components/Select';

import './style.css'
import api from '../../../services/api';

function TeatcherFrom (){

    const history = useHistory();

    const [schaduleItems, setSchadleItems] = useState([{week_day: 1, from: '', to:''}]);
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');
    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');


    function addNewSchaduleItem(){
        setSchadleItems([
            ...schaduleItems,
            {
                week_day: 0, from: '', to:''
            }
        ]);
    }

    function setScheduleItemValue(position: number, field: string, value:string){
        const updatedSchaduleItems = schaduleItems.map((schaduleItem, index) => {
            if(index === position){
                return {...schaduleItem, [field]: value}
            }

            return schaduleItem;
        });

        setSchadleItems(updatedSchaduleItems);
    }

    function handleCreateClass(e: FormEvent){
        e.preventDefault();
        api.post('classes',{name, avatar, whatsapp, bio, subject, cost: Number(cost), schadule:schaduleItems})
        .then( ( )  => {
            alert('Cadastro realizado com sucesso');
            history.push('/');
        } )
        .catch(()=>{alert('Erro no cadastro');})
        
        
    }
    return (
        <div id="page-teatcher-form" className="container">
            <PageHeader 
                title="Que incrível que você quer dar aulas!"
                description="O primeiro passo é preencher esse formulário de inscrição"
            />
            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>
                            Seus dados
                        </legend>
                        <Input 
                            name="name" 
                            label="Nome completo" 
                            type="text" 
                            value={name}
                            onChange={(e)=>{
                                setName(e.target.value);
                            }}/>
                        <Input 
                            name="avatar" 
                            label="Avatar" 
                            type="text"
                            value={avatar}
                            onChange={(e)=>{
                                setAvatar(e.target.value);
                            }}
                        />
                        <Input 
                            name="whatsapp" 
                            label="Whatsapp" 
                            type="text"
                            value={whatsapp}
                            onChange={(e)=>{
                                setWhatsapp(e.target.value);
                            }}
                        />
                        <Textarea 
                            name="bio" 
                            label="Biografia"
                            value={bio}
                            onChange={(e)=>{
                                setBio(e.target.value);
                            }}
                        />
                    </fieldset>
                    <fieldset>
                        <legend>
                            Sobre aula
                        </legend>
                        <Select 
                            name="subject" 
                            label="Matéria" 
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
                            value={subject}
                            onChange={(e) => {
                                setSubject(e.target.value);
                            }}
                        />
                        <Input 
                            name="cost" 
                            label="Custo da sua hora/aula" 
                            type="text"
                            value={cost}
                            onChange={(e)=>{
                                setCost(e.target.value);
                            }}
                        />
                    </fieldset>
                    <fieldset>
                        <legend>
                            Horários disponíveis
                            <button type="button" onClick={addNewSchaduleItem}>
                                + Novo horário
                            </button>
                        </legend>
                        {schaduleItems.map((schaduleItem, index) => {
                            return (
                                <div key={schaduleItem.week_day}  className="schadule-item">
                                    <Select 
                                        name="week_day" 
                                        label="Dia da semana" 
                                        options= {[
                                            {value: '0', label:'Domingo'},
                                            {value: '1', label:'Segunda-feira'},
                                            {value: '2', label:'Terça-feira'},
                                            {value: '3', label:'Quarta-feira'},
                                            {value: '4', label:'Quinta-feira'},
                                            {value: '5', label:'Sexta-feira'},
                                            {value: '6', label:'Sábado'}
                                        ]} 
                                        value={schaduleItem.week_day}
                                        onChange={ e => {
                                            setScheduleItemValue(index, 'week_day', e.target.value);
                                        }}
                                    />
                                    <Input 
                                        name='from' 
                                        label='Das' 
                                        type='time'
                                        value={schaduleItem.from}
                                        onChange={ e => {
                                            setScheduleItemValue(index, 'from', e.target.value);
                                        }}
                                    />
                                    <Input 
                                        name='to' 
                                        label='Até' 
                                        type='time'
                                        value={schaduleItem.to}
                                        onChange={ e => {
                                            setScheduleItemValue(index, 'to', e.target.value);
                                        }}
                                    />
                                </div>
                            );
                        })}
                    </fieldset>
                    <footer>
                        <p>
                            <img src={warningIcon} alt="aviso importante"/>
                            Importante! <br/>
                            Preencha todos os dados
                        </p>
                        <button type="submit">
                            Salvar cadastro
                        </button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default TeatcherFrom;