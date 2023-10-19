import fs from 'fs';
import chalk from 'chalk';

/* extrair links de um texto */
function extraiLinks(texto) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm; /* form: /reg exp/gm; */
    const capturas = [...texto.matchAll(regex)];
    const resultados = capturas.map((captura) => ({
        [captura[1]]: captura[2],
    }));

    return resultados.length !== 0 ? resultados : 'não há links no arquivo';
}
/* tratar erros */
function trataErro(erro) {
    console.log(erro);
    throw new Error(chalk.red(erro.code, 'Não há arquivo no diretório!'));
}
/* async/await */
async function pegaArquivo(caminhoDoArquivo) {
    const encoding = 'utf-8';
    try {
        const texto = await fs.promises.readFile(caminhoDoArquivo, encoding);
        return extraiLinks(texto);
    } catch (erro) {
        trataErro(erro);
    }
}

export default pegaArquivo;
