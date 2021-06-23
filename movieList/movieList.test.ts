import { Builder, Capabilities, By } from 'selenium-webdriver';

const chromedriver = require('chromedriver');
const driver = new Builder().withCapabilities(Capabilities.chrome()).build();

beforeAll(async () => {
    await driver.get('http://localhost:5500/movieList/index.html');
    await driver.sleep(2000);
});

afterAll(async () => {
    await driver.sleep(2000);
    await driver.quit();
});

describe('Messages say the right thing', () => {
    test('Adds a movie to the page', async () => {
        await driver.findElement(By.tagName('input')).sendKeys("The Goonies");
        await driver.sleep(2000);
        await driver.findElement(By.tagName('button')).click();
        await driver.sleep(2000);
    });

    test('Crosses off and un-crosses off a movie on the page', async () => {
        const crossMovie = await driver.findElement(By.xpath('(//*[text()="The Goonies"])'));
    
        const unCrossMovie = await driver.findElement(By.xpath('(//*[text()="The Goonies"])'));

       crossMovie.click();

       await driver.sleep(2000);

        unCrossMovie.click();
    });

    test('Deletes a movie from the page', async () => {
       await driver.sleep(2000);
       await driver.findElement(By.xpath('(//*[text()="x"])')).click();
    });
});
