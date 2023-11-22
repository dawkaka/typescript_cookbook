/**
 * Because typescript  types are structural (which means two different values with the same properties are compatible)
 * If we  want types w
 */

type Student = { name: string, age: number }
type Person = { name: string, age: number }

/**
 * Any where we use Studen with can also use person
 * In rare cases where you don't want that, you wrap the values in classes
 */

class Balance {
    private _nominal: void = undefined;
    value: number;

    constructor(value: number) {
        this.value = value;
    }
}

class AccountNumber {
    private _nominal: void = undefined;
    value: number;

    constructor(value: number) {
        this.value = value;
    }
}

/**
 * Now even though AccountNumber and Balance have the same properties, they are not compatible becaues of the private _nominal property
 * And we can't mistkenly use _nomimal within our class because it's undefiend which is falsy
 */

const account0 = new AccountNumber(12345678);
const balance0 = new Balance(10000);

function acceptBalance(balance: Balance) {
    // ...
}
acceptBalance(balance0); // ok
acceptBalance(account0);

/**
 * This only works with if the property is private, otherwise it behaviour is structural
 */

type Credits = number & { _kind: "credits" };

type Account = number & { _kind: "accountNumber" };

const account = 12345678 as Account;
let balance = 10000 as Credits;
const amount = 3000 as Credits;

function increase(balance: Credits, amount: Credits): Credits {
    return (balance + amount) as Credits;
}

balance = increase(balance, amount);
balance = increase(balance, account);