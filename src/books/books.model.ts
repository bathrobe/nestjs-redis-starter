import * as mongoose from 'mongoose'

export const BookSchema= new mongoose.Schema({
    //these are pure JS types, not TS
    title: 
    {type: String, required: true},
    author:
    {type: String, required:true},
    published: 
    {type: Number, required:true}
})

export interface Book extends mongoose.Document {
id: string;
title: string; 
author: string;
published: number;
}