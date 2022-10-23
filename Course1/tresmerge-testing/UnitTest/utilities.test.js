let db = require("./db");
let email = require("./email");
const {
	add,
	greeting,
	isEven,
	ANIMALS,
	getOrders,
	applyDiscount,
	createOrder,
} = require("./utilities");
//test 1
describe("Sum", () => {
	it("Should Return Sum Of Two Numbers 2 + 3 = 5", () => {
		const result = add(2, 3);
		expect(result).toBe(5);
		expect(result).toBeGreaterThan(4);
		expect(result).toBeGreaterThanOrEqual(5);
		expect(add(0.104, 0.2)).toBeCloseTo(0.3);
	});
});
describe("greeting", () => {
	it("Should Return Hello + Name  Name=abdo", () => {
		expect(greeting("abdo")).toMatch(/abdo/);
	});
});

describe("isEven", () => {
	it("Should Return True Is Number Is Even Number = 4", () => {
		expect(isEven(4)).toBeTruthy();
	});
	it("Should Return False Is Number Is Odd Number = 5", () => {
		expect(isEven(5)).toBeFalsy();
	});
});

describe("validation", () => {
	it("Should Return True If  Is Valid  = 5", () => {
		let x;
		expect(x).toBeUndefined();
		x = null;
		expect(x).toBeNull();
	});
});
describe("Animals", () => {
	it("Should Return True For Cat", () => {
		expect(ANIMALS).toContain("cat");
	});
});

describe("GetOrderById", () => {
	it("Should Return Order OF Id = 1", () => {
		const order = db.getOrderById(1);
		expect(order).toMatchObject({ id: 1, price: 100 });
		expect(order).toHaveProperty("id", 1);
	});
	it("Should Throw Error OF Id Is Not Defined", () => {
		expect(() => db.getOrderById()).toThrow("id is not defined");
	});
});
describe("getOrders", () => {
	it("should return some orders", async () => {
		//    expect((await getOrders()).length).toBe(3)
		await expect(getOrders()).resolves.toContainEqual({ id: 1, price: 20 });
	});
});
describe("apply Discount", () => {
	it("should apply discount 10% for orderPrice = 10", () => {
		db.getOrderById = jest.fn().mockReturnValue({ id: 1, price: 20 });
		const order = applyDiscount();
		expect(order).toEqual({ id: 1, price: 18 });
		db.getOrderById.mockReset();
	});
});
describe("create Order", () => {
	it("should throw error if user id not found", async () => {
		await expect(createOrder()).rejects.toThrowError("user Id Not Found");
	});
	it("should create the order and send email", async () => {
		db.createOrder = jest.fn();
		db.getUser = jest.fn().mockResolvedValue({ email: "test@email.com" });
		email.sendEmail = jest.fn();
		const message = await createOrder(5, [{ price: 10 }, { price: 20 }]);
		expect(db.createOrder).toHaveBeenCalled();
		expect(db.createOrder).toHaveBeenCalledWith(5, [
			{ price: 10 },
			{ price: 20 },
		]);
		expect(db.getUser.mock.calls.length).toBe(1);
		expect(db.getUser.mock.calls[0][0]).toBe(5);
		expect(email.sendEmail.mock.calls.length).toBe(1);
		expect(email.sendEmail.mock.calls[0][0]).toMatch("test@email.com");
		expect(email.sendEmail.mock.calls[0][1]).toBe(30);
		expect(message).toMatch("order create successfully");
	});
});
