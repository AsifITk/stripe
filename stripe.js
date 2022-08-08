let readlineSync = require("readline-sync");

let creditCardNumber = readlineSync.question("Enter your credit card number: ");
let expireMonth = readlineSync.question("Enter your expire month: ");
let expireYear = readlineSync.question("Enter your expire year: ");
let cvc = readlineSync.question("Enter your cvc: ");

let card = {
  creditCardNumber: creditCardNumber,
  expireMonth: expireMonth,
  expireYear: expireYear,
  cvc: cvc,
};
async function getCard() {
  const stripe = require("stripe")(
    "pk_test_51LUbn5Kvmh801fKLO0DuSJjEQmoPN9hDk7YQkCcOVJnyil5aQ0TeuZhlMC9UhqzqO5xG7GbOArz3CQp9imhuVJvq00yfCVQQgF"
  );

  const token = stripe.tokens
    .create({
      card: {
        number: card.creditCardNumber,
        exp_month: card.expireMonth,
        exp_year: card.expireYear,
        cvc: card.cvc,
      },
    })
    .then(function (token) {
      console.log("Created card token with id: " + token.id);
    })
    .catch(function (err) {
      console.log(err);
    });
}

async function charge() {
  const stripe = require("stripe")(
    "sk_test_51LUbn5Kvmh801fKLsGpn4dyIXXOyflTVEihgwbyk2GJKMBDh7CXKK38GSUncaADvhpHFSWrbGmGM5MtXPK5VrG9t00AtcjDz8J"
  );

  // `source` is obtained with Stripe.js; see https://stripe.com/docs/payments/accept-a-payment-charges#web-create-token
  const charge = await stripe.charges.create({
    amount: 2000,
    currency: "usd",
    source: "tok_amex",
    description:
      "My First Test Charge (created for API docs at https://www.stripe.com/docs/api)",
  });
  console.log("Created charge with id: " + charge.id);
}

getCard();
charge();
