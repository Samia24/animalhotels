import "chromedriver";
import { Builder, By, until } from "selenium-webdriver";
import { Options } from "selenium-webdriver/chrome";

(async () => {
  console.log("Iniciando teste de Login Correto");
  let chromeOptions = new Options();
  chromeOptions.addArguments("--log-level=3");

  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(chromeOptions)
    .build();

  try {
    await driver.get("http://localhost:5173/");

    await driver.findElement(By.css("input[type='text']")).sendKeys("samia@gmail.com");
    await driver.findElement(By.css("input[type='password']")).sendKeys("12345678");

    await driver.findElement(By.css("button[type='submit']")).click();

    await driver.wait(until.urlContains("dashboard"), 5000);

    console.log("✔ Login CORRETO funcionando");
  } catch (err) {
    console.error("❌ Erro:", err);
  } 
  
})();
