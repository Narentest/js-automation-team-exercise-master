'use strict';
require('chromedriver');
const { Builder, By, window} = require('selenium-webdriver');
const { Before, After, When, Then } = require ('@cucumber/cucumber');
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
    await driver.quit();
});

When('I navigate to the device dashboard', async function() {
driver.get('http://localhost');
});

When('I click the Reboot button of the device at the address {string}', async function(deviceAddress) {
    await driver.findElement(By.css('div.device-info-item>button')).click;
    return deviceAddress
    await driver.sleep(3000);
    
});

Then('The device status indicator becomes green', async function() {
    driver.wait(until.elementLocated(By.css('div.device-info-item-online')));
    //let atttibute = await driver.findElement(By.xpath("(//div[@class='device-info-item-online'])[1]")).getAttribute('value')
    console.log('device sucessfully rebooted')
});
