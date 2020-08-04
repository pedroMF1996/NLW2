import {Request, Response} from 'express';

import db from "../database/connection";
import convertHourToMinutes from "../utils/convertHourToMinutes";

interface SchaduleItem {
    week_day: number;
    from: string;
    to: string;
}

export default class ClassesController{
    async index(req: Request, res: Response){
        const filters = req.query;

        if(!filters.subject || !filters.week_day || !filters.time){
            return res.status(400).json(
                {
                    error: 'Missing filters to search classes'
                }
            )
        }

        const week_day = filters.week_day as string;
        const subject = filters.subject as string;
        const time = filters.time as string

        const timeInMinutes = convertHourToMinutes(time);

        const classes = await db('classes')
            .whereExists(function(){
                this.select('class_schadule.*')
                .from('class_schadule')
                .whereRaw('`class_schadule`.`class_id` = `classes`.`id`')
                .whereRaw('`class_schadule`.`week_day` = ??',[Number(week_day)])
                .whereRaw('`class_schadule`.`from` <= ??',[timeInMinutes])
                .whereRaw('`class_schadule`.`to` > ??',[timeInMinutes]);
            })
            .where('classes.subject','=',subject)
            .join('users', 'classes.user_id','=','users.id' )
            .select(['classes.*', 'users.*']);

        res.json(classes);
    }

    async create(req: Request, res: Response) {
        const {
                name, 
                avatar,
                whatsapp,
                bio,
                subject,
                cost,
                schadule
        }   =    req.body;
    
        const tr = await db.transaction();
        
        try {
            const insertedUserId = await tr('users').insert({
                name,
                avatar,
                whatsapp,
                bio
            });
        
            const insertedClassesId = await tr('classes').insert({
                subject,
                cost,
                user_id: insertedUserId
            });
        
            const classSchadule = schadule.map((schaduleItem: SchaduleItem) => {
                return {
                    week_day: schaduleItem.week_day,
                    from: convertHourToMinutes(schaduleItem.from),
                    to: convertHourToMinutes(schaduleItem.to),
                    class_id: insertedClassesId
                }
            });
        
            await tr('class_schadule')
            .insert(classSchadule);
        
            await tr.commit();
        
            return res.status(201).send();
        } catch (error) {
            tr.rollback();
            return res.status(400).json({
                error:'Unexpected error while creating new class'
            })
        }
    }
}