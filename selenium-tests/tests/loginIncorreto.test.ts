import "chromedriver";
import { Builder, By, until } from "selenium-webdriver";
import { Options } from "selenium-webdriver/chrome";

(async () => {
  console.log("Iniciando teste de Login Incorreto");
  let chromeOptions = new Options();
  chromeOptions.addArguments("--log-level=3");

  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(chromeOptions)
    .build();


  try {
    await driver.get("http://localhost:5173/");
    await driver.sleep(3000);
    await driver.findElement(By.css("input[type='text']")).sendKeys("errado");
    await driver.sleep(3000);
    await driver.findElement(By.css("input[type='password']")).sendKeys("123456");

    await driver.findElement(By.css("button[type='submit']")).click();

    const msg = await driver.wait(
      until.elementLocated(By.css(".form-message.error")),
      5000
    );
    await driver.sleep(6000);

    console.log("✔ Login INCORRETO detectado:", await msg.getText());
  } catch (err) {
    console.error("❌ Erro:", err);
  } finally {
    await driver.quit();
  }
})();
