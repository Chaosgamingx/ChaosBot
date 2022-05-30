const translate = require('@iamtraction/google-translate')

module.exports = {
    name: 'Translate',
    aliases: ['translate'],
    category: 'infos',
    utilisation: '{prefix}translate (what to translate from) (what to translate too) (words/sentences to translate)',
    async execute(client, message, args) {
        const LanguageToTranslateFrom = args[0]
        const LanguageToTranslateTo = args[1]
        if (!args[0]) return message.channel.send("please tell me what language to translate from (example: fr(french), en(english))")
        if (!args[1]) return message.channel.send("please tell me what language to translate to (example: fr(french, en(english))")
        const query = args.slice(2).join(" ")
        if (!query) return message.channel.send("please tell me what sentence/word you want me to translate")

        try {
            const translated = await translate(query, { from: LanguageToTranslateFrom, to: LanguageToTranslateTo })

            message.channel.send(translated.text)
        } catch (err) {
            message.channel.send("this language isn't supported. please make sure the 2 letters are correct for that language (example: en for english)")
        }
    }
}