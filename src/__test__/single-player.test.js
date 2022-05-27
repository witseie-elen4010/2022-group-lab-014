/* eslint-env jest */
"use strict";
const request=require ('supertest');
const express=require('express');
const router=require("../mainRoutes");
const dict = require('../dictionary.js')
const app=express();
app.use('/', router)

describe('When Requests to /api/answer ', () => {
  it("returns a text of length 9",async()=>{
    const answer=await request(app).get("/api/answer");
    expect(answer.statusCode).toBe(200);
    expect(answer.header['content-type']).toBe('text/html; charset=utf-8');
    expect(answer.text.length).toBe(9)   
  });
});

describe('When Requests to /api/isValid ', () => {
  it("returns a text containing all the 5 letter valid words in the dictionary ",async()=>{
    const answer=await request(app).get("/api/isValid");
    expect(answer.statusCode).toBe(200);
    expect(answer.header['content-type']).toBe('text/html; charset=utf-8');
    expect(answer.text).toBe(JSON.stringify(dict.getJSON()))   
  });
});