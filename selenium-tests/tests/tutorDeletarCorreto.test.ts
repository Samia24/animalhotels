import "chromedriver";
import { Builder, By, until } from "selenium-webdriver";
import { Options } from "selenium-webdriver/chrome";

(async () => {
    console.log("✔ Iniciando teste: Exclusão de Tutor SEM Animais (Sucesso)...");

    let chromeOptions = new Options();
    chromeOptions.addArguments("--log-level=3");

    const driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(chromeOptions)
        .build();

    try {
        await driver.get("http://localhost:5173/");

        // --- 1. LOGIN ---
        await driver.findElement(By.css("input[name='nome']")).sendKeys("Admin");
        await driver.findElement(By.css("input[name='senha']")).sendKeys("123");
        await driver.findElement(By.css("button[type='submit']")).click();
        
        await driver.wait(until.urlContains("dashboard"), 8000);
        await driver.sleep(3000);
        console.log("✔ Login realizado");

        // --- 2. NAVEGAR PARA TUTORES ---
        await driver.wait(until.elementLocated(By.linkText("Gerenciar Tutores")), 8000);
        await driver.findElement(By.linkText("Gerenciar Tutores")).click();
        
        // Espera a tabela carregar
        await driver.wait(until.elementLocated(By.css("table tbody tr")), 8000);
        await driver.sleep(3000);
        console.log("✔ Lista de Tutores carregada");

        // --- 3. EXCLUIR "Joana Teste Selenium" ---
        const nomeTutor = "Joana Teste Selenium";
        console.log(`Tentando excluir: ${nomeTutor}...`);

        try {
            // Encontra o botão excluir na linha específica desse tutor
            const btnExcluir = await driver.findElement(
                By.xpath(`//tr[contains(., '${nomeTutor}')]//button[contains(text(), 'Excluir')]`)
            );
            await btnExcluir.click();

            // Espera a Confirmação do Navegador (window.confirm)
            await driver.sleep(3000);
            await driver.wait(until.alertIsPresent(), 5000);
            let confirm = await driver.switchTo().alert();
            
            console.log(`Confirmação recebida: "${await confirm.getText()}"`);
            await driver.sleep(3000);
            await confirm.accept(); // Clica em OK

            // Aguarda atualização da tabela
            await driver.sleep(5000);

            // Validação: O elemento deve ter sumido
            const pageSource = await driver.getPageSource();
            if (!pageSource.includes(nomeTutor)) {
                console.log(`✔ SUCESSO: O tutor '${nomeTutor}' foi removido.`);
            } else {
                console.error(`❌ FALHA: O tutor '${nomeTutor}' ainda aparece na lista.`);
            }

        } catch (error) {
            console.error(`❌ Erro: Não encontrei o tutor '${nomeTutor}' na tabela.`);
        }

    } catch (err) {
        console.error("❌ Erro Geral:", err);
    } finally {
        await driver.quit();
    }
})();