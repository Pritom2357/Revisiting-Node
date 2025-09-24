const {Client, GatewayIntentBits} = require('discord.js');
const OpenAI = require('openai')
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]});


const aiclient = new OpenAI({
  baseURL: "https://api.x.ai/v1",
  apiKey: "",
});

client.on("messageCreate", async (message)=>{

    console.log("user message: " + message.content);
    
    const completion = await aiclient.chat.completions.create({
    model: "grok-4-0709",
    messages: [
        {
        role: "system",
        content: "You are a intelligent individual to discuss on any topic. You need to continue conversation on any topic. If the content is assertive, your response should be interogative and questions and vice versa. Message must be in string. Your main chat language should be Bangla and use English for any scientific term. Stricly keep the length of the reponse under 100 tokens."
        },
        {
        role: "user",
        content: message.content
        },
    ],
    temperature: 0.7,
    });

    console.log(completion.choices[0].message);
    
    message.reply({
        content: completion.choices[0].message.content
    })
});

client.login('')