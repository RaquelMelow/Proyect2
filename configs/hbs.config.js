const hbs = require("hbs");
const path = require("path");
const dayjs = require("../configs/dayjs.config");

hbs.registerPartials(path.join(__dirname, "../views/partials"));

hbs.registerHelper("formatDate", (date, format, options) => {
  const formatDate = dayjs(date).format("DD-MM-YYYY");
  return formatDate;
});

hbs.registerHelper("inSelection", function (arrayTypes, type) {
  return arrayTypes ? arrayTypes.includes(type) : false;
});

hbs.registerHelper("isEqual", function (value1, value2, options) {
  if (value1 === value2) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

hbs.registerHelper("creditCard", function (creditCard) {
  const card = creditCard.slice(-4)
  const fillCard = '*'.repeat(creditCard.length - 4)
  return `${fillCard}${card}`
})
