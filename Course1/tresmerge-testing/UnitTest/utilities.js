const db = require("./db");
const email = require("./email");

// numbers
const add = (num1, num2) => num1 + num2;
//strings
const greeting = (name) => `hello ${name}`;
//boolean
const isEven = (num) => (num % 2 === 0 ? true : false);
//object
//async
const getOrders = async () => {
	return [
		{ id: 1, price: 20 },
		{ id: 2, price: 20 },
		{ id: 3, price: 20 },
	];
};
const applyDiscount = () => {
	const order = db.getOrderById(1);
	if (order.price >= 10) {
		order.price -= order.price * 0.1;
	}
	return order;
};
const ANIMALS = ["cat", "dog", "monkey"];
//final Example
const createOrder = async (userId, products) => {
	if (!userId) throw new Error("user Id Not Found");
	let totalPrice = 0;
	products.forEach((product) => (totalPrice += product.price));
	await db.createOrder(userId, products);
	const user = await db.getUser(userId);
	email.sendEmail(user.email, totalPrice);
	return `order create successfully with total price = ${totalPrice} `;
};
module.exports = {
	add,
	greeting,
	isEven,
	ANIMALS,
	applyDiscount,
	getOrders,
	createOrder,
};