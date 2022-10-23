const getOrderById=(id)=>{
    if(!id)throw new Error("id is not defined");
    return {id:1,price:100}
}
module.exports={getOrderById}