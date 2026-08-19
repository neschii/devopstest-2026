// index.js 
const express = require('express');
const Redis = require('ioredis');

// Configuracoes do Express e do Redis, configurando a porta e o host do Redis e tambem do tempo de expiração do cache
const app = express();
const PORT = process.env.PORT || 8002;
const REDIS_HOST = process.env.REDIS_HOST || 'redis';
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const CACHE_EXPIRATION_SECONDS = 60;

// Configurando o lazyConnect para que a conexao com o Redis seja feita apenas quando for necessario
const redis = new Redis({
  host: REDIS_HOST,
  port: REDIS_PORT,
  lazyConnect: true
});

// Fazer a conexao com o Redis se nao estiver conectado retornar o erro
redis.connect().catch(err => console.error('Erro de conexao Redis:', err));