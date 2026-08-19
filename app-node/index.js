// index.js 
const express = require('express');
const Redis = require('ioredis');

// Configuracoes do Express e do Redis, configurando a porta e o host do Redis e tambem do tempo de expiração do cache
const app = express();
const NODE_PORT = process.env.NODE_PORT;
const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = process.env.REDIS_PORT;
const CACHE_EXPIRATION_SECONDS = 60;

// Configurando o lazyConnect para que a conexao com o Redis seja feita apenas quando for necessario
const redis = new Redis({
  host: REDIS_HOST,
  port: REDIS_PORT,
  lazyConnect: true
});

// Fazer a conexao com o Redis se nao estiver conectado retornar o erro
redis.connect().catch(err => console.error('Erro de conexao Redis:', err));

// Endpoint para retornar a mensagem de texto
app.get('/texto', (req, res) => {
  res.json({ mensagem: 'Oiii!! Essa e uma mensagem de texto do teste tecnico!! ' });
});

// Endpoint para retornar a hora do servidor com o Redis para cachear o resultado e evitar chamadas desnecessarias ao servidor
app.get('/horario', async (req, res) => {
  const cacheKey = 'node_server_time';
  try {
    const cachedTime = await redis.get(cacheKey);
    if (cachedTime) {
      return res.json({
        horario: cachedTime,
        origem: 'cache',
        expiracao_segundos: CACHE_EXPIRATION_SECONDS
      });
    }

    const currentTime = new Date().toISOString();
    await redis.set(cacheKey, currentTime, 'EX', CACHE_EXPIRATION_SECONDS);

    res.json({
      horario: currentTime,
      origem: 'servidor',
      expiracao_segundos: CACHE_EXPIRATION_SECONDS
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Manda mensagem no console para avisar que o app esta rodando na porta configurada
app.listen(NODE_PORT, '0.0.0.0', () => {
  console.log(`Node app rodando na porta ${NODE_PORT}`);
});