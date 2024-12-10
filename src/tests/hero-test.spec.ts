import { test, expect } from '@playwright/test';

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
        await page.selectOption("xxxxxx", {
            label: "Choose…",
           value: "Yes",
           index: 0
       })
        const text = alert.message();
        console.log(text);
        await alert.accept();
        //await page.getByRole('button', { name: 'OK' }).click();
    })
    await page.locator('li').filter({ hasText: 'Megnta - 99 x' })
   
});

test('Verify searching for a hero works', async ({ page }) => {
    await page.getByLabel('Hero Search').click();
    await page.getByLabel('Hero Search').fill('Magneta');
    await page.locator('#search-component').getByRole('link', { name: 'Magneta' }).isVisible();
});

test('Verify deleting a hero removes them from the list', async ({ page }) => {
    await page.getByRole('link', { name: 'Heroes' }).click();
    //await page.getByRole('button', { name: 'OK' }).click();
    await page.locator('li').filter({ hasText: 'Megnta - 99 x' }).getByRole('button').click();
    await expect(page.locator('li').filter({ hasText: 'Megnta - 99 x' })).not.toBeVisible();
});

test("Verify a hero's name and score can be modified", async ({ page }) => {
    await page.locator('li').first().click
    await page.getByPlaceholder('Hero name').click();
    await page.getByPlaceholder('Hero name').fill('renamed');
    await page.getByRole('button', { name: 'save' }).click();
    page.locator('li').filter({ hasText: 'renamed x' }).isVisible();
  
});

test("Verify that the top heroes list contains either Hurricane or Tornado", async ({ page }) => {
    
    // Your code here
});

test("Verify adding a new hero with a score of 600 will add them to the Top Heroes display in the dashboard", async ({ page }) => {

    // Your code here
});

test("Verify the Add hero button is disabled once the list of heroes contains more than 12 heroes", async ({ page }) => {

    // Your code here
});

