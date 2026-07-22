const { test: base, expect } = require('@playwright/test');

const test = base.extend({});

module.exports = { test, expect };