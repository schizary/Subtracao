module.exports = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://calculadora-microservicos-zeta.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method === 'GET') return res.status(200).json({ message: 'servidor online' });
    if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido' });

    let body = '';

    req.on('data', chunk => {
        body += chunk;
    });

    req.on('end', () => {
        try {
            const { a, b } = JSON.parse(body);

            if (typeof a !== 'number' || typeof b !== 'number' || isNaN(a) || isNaN(b)) {
                return res.status(400).json({ error: 'Parâmetros inválidos' });
            }

            const result = a - b;
            res.status(200).json({ result });
        } catch (err) {
            res.status(400).json({ error: 'Erro ao processar requisição' });
        }
    });

    req.on('error', () => {
        res.status(400).json({ error: 'Erro na leitura da requisição' });
    });
};