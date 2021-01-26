const { Given, When, Then, AfterAll, After, Status } = require('cucumber')
const { Builder, By, Capabilities, until } = require('selenium-webdriver')
const { howItShouldWork } = require('../support/helpers')
const fs = require('fs')

// driver setup
require('chromedriver')
const capabilities = Capabilities.chrome()
capabilities.set('chromeOptions', { w3c: false })
const driver = new Builder().withCapabilities(capabilities).build()

const defaultTimeout = 2000

// ======================= LOCATORS =======================

const statusHeader = (text) => `//*[@id='status' and text()='${text}']`
const defaultTile = (num) => `//*[contains(@style,'/Symbol_') and position()=${num}]`
const btnRoll = `//div[@id='start']`

// ======================= GAME UI =======================

Then('game header message should contain text {string}', async function (text) {
  const element = driver.findElement(By.xpath(statusHeader(text)))
  await driver.wait(until.elementIsVisible(element), defaultTimeout)
})

Then('button spin should be present', async function () {
  await driver.findElement(By.xpath(btnRoll))
})

When('I click button spin', async function () {
  await driver.findElement(By.xpath(btnRoll)).click()
})

Then('tile number {int} should be present', async function (num) {
  await driver.findElement(By.xpath(defaultTile(num)))
})

// ======================= GAME LOGIC =======================

When(/I spin to get (not|two|all) matching tiles$/, async function (count) {
  let howMany
  switch (count) {
    case 'not':
      howMany = 'NO MATCHES'
      break
    case 'two':
      howMany = 'TWO MATCHES'
      break
    case 'all':
      howMany = 'ALL MATCHES'
      break
    default:
      throw new Error(`Unknown type ${count}`)
  }

  let reRoll = ''
  while (reRoll !== howMany) {
    await driver.findElement(By.xpath(btnRoll)).click()
    reRoll = howItShouldWork(
      // A helper function that holds condition matching logic
      await driver.findElement(By.xpath(defaultTile(1))).getAttribute('style'),
      await driver.findElement(By.xpath(defaultTile(2))).getAttribute('style'),
      await driver.findElement(By.xpath(defaultTile(3))).getAttribute('style')
    )
  }
})

// ======================= COMMON =======================

Given('I open {string} url', async function (string) {
  await driver.get(string)
})

When('I wait for {int} miliseconds', async function (time) {
  await driver.sleep(time)
})

When('I take a screenshot', async function () {
  await driver.takeScreenshot().then(function (data) {
    const base64Data = data.replace(/^data:image\/pngbase64,/, '')
    fs.writeFile('out.png', base64Data, 'base64', function (err) {
      if (err) console.log(err)
    })
  })
})

After(function (scenario) {
  if (scenario.result.status === Status.FAILED) {
    driver.takeScreenshot().then(function (data) {
      const base64Data = data.replace(/^data:image\/pngbase64,/, '')
      fs.writeFile('out.png', base64Data, 'base64', function (err) {
        if (err) console.log(err)
      })
    })
  }
})

AfterAll('end', async function () {
  await driver.quit()
})
