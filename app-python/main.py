import os
from zoneinfo import ZoneInfo
from datetime import datetime
from fastapi import FastAPI
import redis.asyncio as redis

# Configurações do FastAPI
app = FastAPI(title="Python - FastAPI com Redis", version="1.0")

# Configurações do Redis 
PORT = int(os.getenv("PYTHON_PORT"))
CACHE_EXPIRATION_SECONDS = int(os.getenv("PYTHON_CACHE_TTL"))
REDIS_HOST = os.getenv("REDIS_HOST", "redis")
REDIS_PORT = int(os.getenv("REDIS_PORT"))

# Configura o cliente Redis
redis_client = redis.Redis(
    host=REDIS_HOST,
    port=REDIS_PORT,
    decode_responses=True
)
# endpoint retornando o texto
@app.get("/texto")
async def get_fixed_text():
    return {"mensagem": "Oiii, eu sou um teste com Python!!"}

# endpoint retornando o horário atual com cache 
@app.get("/horario")
async def get_current_time():
    cache_key = "python_server_time"
    cached_time = await redis_client.get(cache_key)

    if cached_time:
        return {
            "horario": cached_time,
            "origem": "cache",
            "expiracao_segundos": CACHE_EXPIRATION_SECONDS
        }

# rodar o arquivo diretamente lendo a porta dinâmica 
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=PORT, reload=True)