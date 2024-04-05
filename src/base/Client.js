const chalk = require("chalk");
const Event = require("./Event");
const Command = require("./Command");

const { default: consola } = require("consola");
const { Client, version } = require("discord.js");

const { join } = require("path");
const { glob } = require("fast-glob");

/**
 * Crie um cliente Discord.js com manipulação de eventos e comandos.
 * @param {import("discord.js").ClientOptions} clientOptions - Opções do client.
 * @returns {import("discord.js").Client} O cliente criado.
 */
function createClient(clientOptions) {
  const client = new Client(clientOptions);

  client.run = async function () {
    this.once("ready", (client) => onClientReady(client));

    await loadFiles();
    registerEvents(client);

    this.on("interactionCreate", async (interaction) => {
      if (interaction.isChatInputCommand())
        handleCommandInteraction(interaction);
    });

    this.login(process.env.BOT_TOKEN)
      .then(() => consola.success(`Conectado em: ${client.user.username}`))
      .catch(handleLoginError);
  };

  return client;

  function handleLoginError(error) {
    consola.error(
      new Error(`Ocorreu um erro ao tentar conectar ao bot: ${error.message}`)
    );

    process.exit(1);
  }

  /**
   * Carrega arquivos de eventos e comandos de forma assíncrona.
   */
  async function loadFiles() {
    const paths = await glob(["commands/**/*.js", "events/**/*.js"], {
      cwd: join(__dirname, ".."),
    });

    const promises = paths.map((path) => require(join(__dirname, "..", path)));
  }

  function registerEvents(client) {
    Event.all.forEach(({ execute, name, once }) =>
      once ? client.once(name, execute) : client.on(name, execute)
    );
  }
}

/**
 * Logs a success message when the client is ready.
 * @param {Client<true>} readyClient - The ready client.
 */
async function onClientReady(client) {
  const clientName = "Aplicação iniciada";
  const libraryName = "@discord.js";
  const versionMessage = `${version}`;

  const successMessage = `${chalk.green(clientName)} 📦 ${chalk.white(
    libraryName
  )} | ${chalk.yellow(versionMessage)}`;

  consola.success(successMessage);
  console.log(" ")

  await client.application.commands
    .set(Array.from(Command.commands.values()))
    .then(() =>
      consola.success(
        chalk.green("Todos comandos foram registrados com sucesso!")
      )
    )
    .catch(consola.error);
}

/**
 * Lida com uma interação de comando.
 *
 * @param {import("discord.js").CommandInteraction} interaction - O objeto de interação.
 * @return {void}
 */
function handleCommandInteraction(interaction) {
  const command = Command.commands.get(interaction.commandName);

  if (!command) {
    return interaction.reply({
      content: `O comando \`${interaction.commandName}\` nao existe.`,
      ephemeral: true,
    });
  }

  const { client, options, member } = interaction;

  command.execute({
    client,
    options,
    interaction,
    member,
  });
}

module.exports = { createClient };
