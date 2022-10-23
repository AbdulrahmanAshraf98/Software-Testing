const getOrderById=(id)=>{
    if(!id)throw new Error("id is not defined");
    return {id:1,price:100}
}
const createOrder = async (uid, products) => {};
const getUser = async (uid) => ({ uid: 1, email: "aaa" });
module.exports = { getOrderById, createOrder, getUser };