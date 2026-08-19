import os
from zoneinfo import ZoneInfo
from datetime import datetime
from fastapi import FastAPI
import redis.asyncio as redis

# Configurações do FastAPI
app = FastAPI(title="Python - FastAPI com Redis", version="1.0")

# Configurações do Redis 
REDIS_HOST = os.getenv("REDIS_HOST", "redis")
REDIS_PORT = int(os.getenv("REDIS_PORT", 6379))
CACHE_EXPIRATION_SECONDS = 10

# Configura o cliente Redis
redis_client = redis.Redis(
    host=REDIS_HOST,
    port=REDIS_PORT,
    decode_responses=True
)