const {REST, Routes, bold} = require('discord.js');

const commands = [
    {
        name: "ping",
        description: "Replies with pong!"
    }
]

const rest = new REST({version: "10"}).setToken(
    ''
)

(async()=>{
    try {
        console.log("Started refreshing applicatin (/) commands.");
        
        await rest.put(Routes.applicationCommands('1417753091033403402'), {
            body: commands
        });

        console.log("Successfully reloaded application (/) commands");
        
    } catch (error) {
        console.error(error);
        
    }
});

client.on("interactionCreate", (interaction)=>{
    console.log(interaction);
    
})