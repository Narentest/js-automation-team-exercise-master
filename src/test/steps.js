'use strict';
require('chromedriver');
const { Builder, By, window, document, delay} = require('selenium-webdriver');
const { Before, After, Given, When, Then } = require ('@cucumber/cucumber');
const { assert } = require('console');
const until = require('selenium-webdriver/lib/until');

let driver;

Before(async function () {
    driver = new Builder()
        .forBrowser('chrome')
        .build();
});

After(async function () {
   if (!driver) {
        return;
     }
     await driver.close();
});

Given('I navigate to the device dashboard', async function() {
driver.get('http://localhost');
});

When('I click the Reboot button of the device at the address {string}', async function(deviceAddress) {
    const locator = By.xpath(`//*[@id="app"]/div/div/div[div[@class="device-info-address"] = "${deviceAddress}"]/button`);
    await driver.findElement(locator).click();
});

Then('The device status indicator becomes green', async function() {
    driver.wait(until.elementLocated(By.css('div.device-info-item-online')));
    console.log('device sucessfully rebooted')

});