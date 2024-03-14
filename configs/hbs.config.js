const hbs = require('hbs');
const path = require('path');
const dayjs = require=('../configs/dayjs.config');

hbs.registerPartials(path.join(__dirname, '../views/partials'));

hbs.registerHelper('dateFormat', (options) => {
    const { date, format } = options.hash;
    return dayjs(date).format(format || 'DD-MM-YYYY HH:mm');
  });

hbs.registerHelper('inSelection', function (arrayTypes, type) {
    return arrayTypes ? arrayTypes.includes(type) : false;
});

hbs.registerHelper('isEqual', function (value1, value2, options) {
  if (value1 === value2) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

