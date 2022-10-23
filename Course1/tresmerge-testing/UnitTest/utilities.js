const db = require("./db");

// numbers 
 const add =(num1,num2)=>num1+num2;
//strings
const greeting=(name)=>`hello ${name}`
//boolean
const isEven=(num)=>num%2===0?true:false;
//object
;
//async 
const getOrders=async()=>{
    return [{id:1,price:20},{id:2,price:20},{id:3,price:20}]
}
const applyDiscount=()=>{
    const order=db.getOrderById(1);
    if(order.price>=10){
        order.price-=order.price*.1;
    }
    return order;
}
const ANIMALS=["cat","dog","monkey"];
module.exports={add,greeting,isEven,ANIMALS,applyDiscount,getOrders};