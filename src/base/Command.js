const { Collection, ApplicationCommand, CommandInteraction, CommandInteractionOptionResolver, Client, GuildMember, AutocompleteInteraction } = require("discord.js")

module.exports = class Command {
    static commands = new Collection();

    /**
     * @param {ApplicationCommand & {
        *  autocomplete?: (interaction: AutocompleteInteraction),
        *  execute: (interaction: {
        *       client: Client<true>,
        *        member: GuildMember,
        *        interaction: CommandInteraction,
        *       options: CommandInteractionOptionResolver,
        *   })
        * }} data 
     */

    constructor(data) {
        Command.commands.set(data.name, data);
    }

    /**
     * @param {(interaction: {
     *  client: Client<true>,
    *   interaction: CommandInteraction,
     *  options: CommandInteractionOptionResolver,
     * })} handler
     */
    set execute(handler) { this.run = handler; }
    execute() { return this.run; }
}