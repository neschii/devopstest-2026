# 🚀 Desafio DevOps 2026

Solução completa contendo duas APIs em ecossistemas distintos (Python e Node.js), integradas a uma camada de cache distribuído em memória (Redis) e orquestradas via Docker Compose com foco em execução simplificada, desacoplamento e boas práticas de DevOps (12-Factor App).

---

## 📌 Visão Geral da Arquitetura

O projeto é composto por 3 microsserviços rodando em uma rede isolada via Docker:

* **App 1 (Python / FastAPI):** Expõe rota com texto fixo e rota de horário com cache Redis de **10 segundos**.
* **App 2 (Node.js / Express):** Expõe rota com texto fixo e rota de horário com cache Redis de **60 segundos (1 minuto)**.
* **Cache Distribuído (Redis):** Gerenciador de cache centralizado para otimização de requisições temporais e redução de processamento.

---

## 🛠️ Tecnologias Utilizadas

* **Linguagens & Frameworks:** Python 3.11 (FastAPI, Uvicorn) e Node.js 20 (Express).
* **Camada de Cache:** Redis 7 (Alpine).
* **Containerização & Orquestração:** Docker e Docker Compose (v2).

---

## ⚙️ Pré-requisitos

* [Docker](https://docs.docker.com/get-docker/) instalado.
* [Docker Compose](https://docs.docker.com/compose/) instalado (recomendado Docker CLI v2).

---
