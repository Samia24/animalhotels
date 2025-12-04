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

        // 1. LOGIN
        await driver.findElement(By.css("input[name='nome']")).sendKeys("Admin"); // Ajuste se necessário
        await driver.findElement(By.css("input[name='senha']")).sendKeys("123");
        await driver.findElement(By.css("button[type='submit']")).click();

        // Espera chegar no dashboard
        await driver.wait(until.urlContains("dashboard"), 8000);

        // 2. IR PARA LISTA DE TUTORES (CLICANDO)
        // Clica no botão do dashboard para manter o login
        await driver.sleep(3000);
        await driver.wait(until.elementLocated(By.linkText("Gerenciar Tutores")), 8000);
        await driver.findElement(By.linkText("Gerenciar Tutores")).click();

        // 3. ESPERAR A LISTA CARREGAR
        // Importante: espera aparecer pelo menos uma linha na tabela antes de tentar clicar em Editar
        await driver.wait(until.elementLocated(By.css("table tbody tr")), 8000);
        await driver.sleep(3000);

        // 4. EDITAR O PRIMEIRO DA LISTA
        // O Selenium vai pegar o primeiro link com texto "Editar" que encontrar
        await driver.findElement(By.linkText("Editar")).click();

        // Espera a tela de edição carregar (verificando se o campo 'nome' apareceu)
        await driver.wait(until.elementLocated(By.name("nome")), 8000);

        // 5. ALTERAR O NOME
        await driver.sleep(3000);
        const campoNome = await driver.findElement(By.name("nome"));
        await campoNome.clear();
        await campoNome.sendKeys("Ana Editado Selenium");

        // Salvar
        await driver.sleep(3000);
        await driver.findElement(By.css("button[type='submit']")).click();

        // 6. VALIDAR SE VOLTOU PARA A LISTA E SE O TEXTO MUDOU
        // Espera voltar para a URL da lista
        await driver.wait(until.urlContains("/tutors"), 8000);

        // Espera recarregar a tabela
        await driver.sleep(3000);
        await driver.wait(until.elementLocated(By.css("table tbody tr")), 8000);

        // Verifica se o texto alterado está presente no corpo da página
        await driver.sleep(7000);
        const body = await driver.findElement(By.tagName("body")).getText();

        if (body.includes("Samia Editado Selenium")) {
            console.log("✔ Edição funcionando!");
        } else {
            console.log("❌ Falha na edição! O nome novo não apareceu.");
        }

    } catch (err) {
        console.error("❌ Erro:", err);
    } finally {
        await driver.quit();
    }
})();