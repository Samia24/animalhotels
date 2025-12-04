import "chromedriver";
import { Builder, By, until, Key } from "selenium-webdriver";
import { Options } from "selenium-webdriver/chrome";

(async () => {
    console.log("Iniciando teste de Cadastro de Tutor");
    let chromeOptions = new Options();
    chromeOptions.addArguments("--log-level=3");

    const driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(chromeOptions)
        .build();

    try {
        await driver.get("http://localhost:5173/");

        // 1. LOGIN
        await driver.findElement(By.css("input[name='nome']")).sendKeys("Admin");
        await driver.findElement(By.css("input[name='senha']")).sendKeys("123");
        await driver.findElement(By.css("button[type='submit']")).click();

        // Espera chegar no dashboard
        await driver.wait(until.urlContains("dashboard"), 8000);

        // 2. NAVEGAR PARA TUTORES (VIA CLIQUE, NÃO VIA URL)
        // Clica no botão "Gerenciar Tutores" que está no Dashboard
        await driver.sleep(3000);
        await driver.wait(until.elementLocated(By.linkText("Gerenciar Tutores")), 8000);
        await driver.findElement(By.linkText("Gerenciar Tutores")).click();

        // Espera a URL mudar para /tutors
        await driver.wait(until.urlContains("/tutors"), 8000);

        // 3. CLICAR EM NOVO TUTOR
        await driver.sleep(3000);
        await driver.wait(until.elementLocated(By.linkText("Novo Tutor")), 8000);
        await driver.findElement(By.linkText("Novo Tutor")).click();

        console.log("Preenchendo formulário...");

        // 4. PREENCHER FORMULÁRIO
        // Espera o campo nome aparecer
        await driver.wait(until.elementLocated(By.name("nome")), 8000);

        await driver.findElement(By.name("nome")).sendKeys("Joana Teste Selenium");
        await driver.sleep(2000);
        await driver.findElement(By.name("sexo")).sendKeys("F");

        // DATA: Enviar apenas números limpos costuma funcionar melhor
        await driver.sleep(3000);
        await driver.findElement(By.name("nascimento")).sendKeys("01011990");
        await driver.sleep(2000);
        await driver.findElement(By.name("telefone")).sendKeys("11999999999");
        await driver.sleep(2000);
        await driver.findElement(By.name("endereco")).sendKeys("Rua Selenium 123");

        // 5. SALVAR
        await driver.sleep(3000);
        await driver.findElement(By.css("button[type='submit']")).click();

        // 6. VALIDAR RETORNO PARA A LISTA
        // Espera a URL ser exatamente a da lista (sem o /new)
        await driver.sleep(8000);
        await driver.wait(until.urlIs("http://localhost:5173/tutors"), 8000);

        // Espera o novo nome aparecer na tabela
        const novoTutor = await driver.wait(
            until.elementLocated(By.xpath("//td[contains(text(), 'Joana Teste Selenium')]")),
            8000
        );

        console.log("✔ Tutor cadastrado e encontrado na lista:", await novoTutor.getText());

    } catch (err) {
        console.error("❌ Erro:", err);
    } finally {
        await driver.quit();
    }
})();