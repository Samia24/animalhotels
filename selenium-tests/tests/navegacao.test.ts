import "chromedriver";
import { Builder, By, until } from "selenium-webdriver";
import { Options } from "selenium-webdriver/chrome";

(async () => {
    let chromeOptions = new Options();
    chromeOptions.addArguments("--log-level=3");

    const driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(chromeOptions)
        .build();

    try {
        await driver.get("http://localhost:5173/");

        // --- LOGIN ---
        // Ajustei para o usuário Admin padrão do seu README, 
        // ou use o que você sabe que funciona no seu banco
        await driver.findElement(By.css("input[name='nome']")).sendKeys("Admin"); 
        await driver.findElement(By.css("input[name='senha']")).sendKeys("123"); 
        await driver.findElement(By.css("button[type='submit']")).click();

        // Espera chegar no dashboard
        await driver.wait(until.urlContains("dashboard"), 5000);
        console.log("✔ Login realizado");

        // --- NAVEGAÇÃO VIA CLIQUES ---
        
        // 1. Ir para Tutores
        console.log("Navegando para Tutores...");
        // O link no dashboard tem o texto "Gerenciar Tutores" ou href="/tutors"
        await driver.findElement(By.css("a[href='/tutors']")).click();
        
        // Validação: Espera tabela carregar
        await driver.wait(until.elementLocated(By.css("table tbody tr")), 5000);
        console.log("✔ Lista de Tutores carregada");
        await driver.sleep(3000); // Pausa visual

        // Voltar para Dashboard (Botão 'Voltar' na página de tutores)
        await driver.findElement(By.xpath("//button[contains(text(), 'Voltar')]")).click();
        await driver.wait(until.urlContains("dashboard"), 5000);


        // 2. Ir para Animais
        console.log("Navegando para Animais...");
        await driver.findElement(By.css("a[href='/animals/list']")).click();
        
        await driver.wait(until.elementLocated(By.css("table tbody tr")), 5000);
        console.log("✔ Lista de Animais carregada");
        await driver.sleep(3000);

        // Voltar
        await driver.findElement(By.xpath("//button[contains(text(), 'Voltar')]")).click();
        await driver.wait(until.urlContains("dashboard"), 5000);


        // 3. Ir para Usuários
        console.log("Navegando para Usuários...");
        await driver.findElement(By.css("a[href='/users']")).click();
        
        await driver.wait(until.elementLocated(By.css("table tbody tr")), 5000);
        console.log("✔ Lista de Usuários carregada");
        await driver.sleep(3000);

        // Voltar
        await driver.findElement(By.xpath("//button[contains(text(), 'Voltar')]")).click();
        
        console.log("✔ Ciclo de navegação completo!");

    } catch (err) {
        console.error("❌ Erro:", err);
    } finally {
        await driver.quit();
    }
})();