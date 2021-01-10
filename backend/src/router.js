const { Router } = require('express')
const router = Router()
const nodemailer = require('nodemailer')
require('dotenv').config()

router.post('/send-email', async (req, res) => {
    const { 
        pagamento, 
        investimento,
        mudanca,
        estado_do_imovel,
        tipo_do_imovel,
        localizacao,
        name,
        logradouro,
        bairro,
        cidade,
        code, phone,
        email,
        checkbox } = req.body

    contentHTML = `
        <h2>Informação do Imóvel do Usuário</h2>
        <ul>
            <li>Pagamento: ${pagamento}</li>
            <li>Investimento: ${investimento}</li>
            <li>Mudança: ${mudanca}</li>
            <li>Estado do Imóvel: ${estado_do_imovel}</li>
            <li>Tipo do Imóvel: ${tipo_do_imovel}</li>
            <li>Localização: ${localizacao}</li>
            <li></li>
        </ul>
        </br>
        <h2>Informarmação do Usuário</h2>
        <ul>
            <li>Usuário: ${name}</li>
            <li>Logradouro: ${logradouro}</li>
            <li>Bairro: ${bairro}</li>
            <li>Cidade: ${cidade}</li>
            <li>Phone: (${code}) ${phone}</li>
            <li>Email: ${email}</li>
            <li>Checkbox: ${checkbox}</li>
        </ul>
    `

    const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        port: process.env.PORT,
        secure: false,
        auth: { user: process.env.USER, pass: process.env.PASS },
        tls: { rejectUnauthorized: false },
    })

    const info = await transporter.sendMail({
        from: process.env.USER,
        to: process.env.USER,
        replyTo: 'swolv.lith@gmail.com',
        subject: 'Website contact form',
        text: contentHTML
    })

    console.log(contentHTML)
    console.log('Message sent', info.messageId)

    res.redirect('/success.html')
})

module.exports = router