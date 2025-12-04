import "chromedriver";
import { Builder, By, until } from "selenium-webdriver";
import { Options } from "selenium-webdriver/chrome";

(async () => {
    console.log("Iniciando teste: Exclusão de Tutor COM Animais (Bloqueio)...");

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
        await driver.sleep(5000);
        console.log("✔ Lista de Tutores carregada");

        // --- 3. TENTAR EXCLUIR "Tutor Editado Selenium" ---
        const nomeTutor = "Tutor Editado Selenium";
        console.log(`Tentando excluir: ${nomeTutor} (deve ser bloqueado)...`);

        try {
            // Encontra o botão excluir na linha específica desse tutor
            await driver.sleep(3000);
            const btnExcluir = await driver.findElement(
                By.xpath(`//tr[contains(., '${nomeTutor}')]//button[contains(text(), 'Excluir')]`)
            );
            await btnExcluir.click();

            // Espera o Alerta de Erro/Aviso (window.alert)
            await driver.sleep(3000);
            await driver.wait(until.alertIsPresent(), 5000);
            let alert = await driver.switchTo().alert();
            const textoAlerta = await alert.getText();

            console.log(`Alerta recebido: "${textoAlerta}"`);

            // Validação: Mensagem de bloqueio
            if (textoAlerta.includes("Não é possível excluir") || textoAlerta.includes("animais cadastrados")) {
                console.log("✔ SUCESSO: O sistema bloqueou a exclusão corretamente!");
            } else {
                console.error("❌ FALHA: Mensagem de alerta inesperada ou exclusão permitida indevidamente.");
            }
            await driver.sleep(7000);
            await alert.accept(); // Fecha o alerta (OK)

        } catch (error) {
            console.error(`❌ Erro: Não encontrei o tutor '${nomeTutor}' ou o alerta não apareceu.`);
        }

    } catch (err) {
        console.error("❌ Erro Geral:", err);
    } finally {
        await driver.quit();
    }
})();