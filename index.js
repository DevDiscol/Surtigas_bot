  const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");
const XLSX = require("xlsx");
const http = require("http");

const hostname = "0.0.0.0";

const port = 3000; 

const server = http.createServer((req, res)=>{
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end('Bienvenid@s al canal de Surtigas');
});

server.listen(port, hostname, ()=>{
   console.log(`El servidor se esta ejecutando en el https://${hostname}:${port}/`);
});

const workbook = XLSX.readFile("base.xlsx");
const workbookSheets = workbook.SheetNames;
const sheet = workbookSheets[0];
const dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])


const bot = new Telegraf("7150347578:AAFylUyeWFDRCw6tPaMz3aYW6dvJ9n6MZgo");


bot.start((ctx) => {
  ctx.reply(
    `Bienvenidos ${ctx.from.first_name} a  SURTIGAS CONSULTAS, por favor ingrese la poliza a consultar `
  );
});

bot.on("text", (ctx) => {
  const polizaNumber = ctx.message.text;

  let polizasEncontradas = [];
  let respuesta = '';

  for (const itemFila of dataExcel) {
    if (itemFila["CONTRATO"] == polizaNumber) {
      // Construir la respuesta con todos los datos de la póliza
      respuesta = '';
      for (const [key, value] of Object.entries(itemFila)) {
        respuesta += `${key}: ${value}\n`;
      }
      polizasEncontradas.push(respuesta);
    }
  }

  if (polizasEncontradas.length > 0) {
    ctx.reply(`Se encontraron ${polizasEncontradas.length} contratos con el número ${polizaNumber}:`);
    polizasEncontradas.forEach(poliza => ctx.reply(poliza));
  } else {
    ctx.reply(`No se encontraron pólizas con el número ${polizaNumber}.`);
  }
});


bot.launch();
