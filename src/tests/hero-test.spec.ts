import { test, expect } from '@playwright/test';
test.describe('Invoke Application',() => {

})



test('Add a new hero and verify they appear in the hero list', async ({ page }) => {
    await page.goto('http://localhost:4200/dashboard');
     expect(page).toHaveTitle('Tour of Heroes');
    await page.getByRole('link', { name: 'Heroes' }).click();
    await page.getByLabel('Hero name:').click();
    await page.getByLabel('Hero name:').fill('Megenta');
    await page.locator('#hero-score').click();
    await page.locator('#hero-score').fill('99');
    await page.getByRole('button', { name: 'Add hero' }).click();
    await page.waitForTimeout(1000)
    page.on("dialog", async (alert) => {
        const text = alert.message();
        console.log(text);
        await alert.accept();
        //await page.getByRole('button', { name: 'OK' }).click();
    })
    await page.locator('li').filter({ hasText: 'Megnta - 99 x' })
   
});

test('Verify searching for a hero works', async ({ page }) => {
    await page.goto('http://localhost:4200/dashboard');
    expect(page).toHaveTitle('Tour of Heroes');
    await page.getByLabel('Hero Search').click();
    await page.getByLabel('Hero Search').fill('Magneta');
    await page.locator('#search-component').getByRole('link', { name: 'Magneta' }).isVisible();
});

test('Verify deleting a hero removes them from the list', async ({ page }) => {
    await page.goto('http://localhost:4200/dashboard');
    expect(page).toHaveTitle('Tour of Heroes');
    await page.getByRole('link', { name: 'Heroes' }).click();
    await page.waitForTimeout(1000);
    // await page.getByRole('button', { name: 'OK' }).click();
    await page.locator('li').filter({ hasText: 'Dr Nice - 10 x' }).getByRole('button').click();
    await expect(page.locator('li').filter({ hasText: 'Dr Nice - 10 x' })).not.toBeVisible();
});

test("Verify a hero's name and score can be modified", async ({ page }) => {
    await page.goto('http://localhost:4200/dashboard');
    expect(page).toHaveTitle('Tour of Heroes');
    await page.getByRole('link', { name: 'Heroes' }).click();
    await page.waitForTimeout(1000);
    await page.getByRole('link', { name: 'Dr Nice - 10' }).click();
    await page.getByPlaceholder('Hero name').click();
    page.on("dialog", async (alert) => {
        const text = alert.message();
        console.log(text);
        await alert.accept();
        //await page.getByRole('button', { name: 'OK' }).click();
    })
    await page.waitForTimeout(1000);
    await page.getByPlaceholder('Hero name').fill('Renamed');
    await page.getByRole('button', { name: 'save' }).click();
    await page.waitForTimeout(1000);
    page.locator('li').filter({ hasText: 'renamed x' }).isVisible();
  
});

test("Verify that the top heroes list contains either Hurricane or Tornado", async ({ page }) => {
    await page.goto('http://localhost:4200/dashboard');
    expect(page).toHaveTitle('Tour of Heroes');
    if (await page.getByRole('link', { name: 'Hurricane' }).isVisible()) {
       console.log("Top heroes list contains Hurricane");
      }else if(await page.getByRole('link', { name: 'Tornado' }).isVisible()){
        console.log("Top heroes list contains Tornado");
      }
});

test("Verify adding a new hero with a score of 600 will add them to the Top Heroes display in the dashboard", async ({ page }) => {
    await page.goto('http://localhost:4200/dashboard');
    expect(page).toHaveTitle('Tour of Heroes');
    await page.getByLabel('Hero name:').click();
    await page.getByLabel('Hero name:').fill('test');
    await page.getByLabel('Hero name:').press('Tab');
    await page.locator('#hero-score').fill('600');
    await page.getByRole('button', { name: 'Add hero' }).click();
    await page.getByRole('link', { name: 'Dashboard' }).click()
    await page.getByRole('link', { name: 'test' }).isVisible()
    
});

test("Verify the Add hero button is disabled once the list of heroes contains more than 12 heroes", async ({ page }) => {

    // Your code here
});

