# 🔄 WiseTraining BFF (Backend for Frontend)

Backend for Frontend do sistema WiseTraining Platform.

## 🛠️ Tecnologias
- Node.js 18
- Express
- Axios

## 🚀 Como Executar

### Local
```bash
npm install
npm run dev
```

### Docker
```bash
docker build -t athonbilbao/wisetraining-bff:latest .
docker run -p 3000:3000 athonbilbao/wisetraining-bff:latest
```

## 📦 Docker Hub
- Imagem: `athonbilbao/wisetraining-bff:latest`
- https://hub.docker.com/r/athonbilbao/wisetraining-bff

## 📚 Endpoints

### Health Check
- `GET /health`

### Agregação
- `GET /api/aggregation/dashboard` - Dashboard com dados agregados
- `GET /api/aggregation/users/:id/details` - Usuário com cursos
- `GET /api/aggregation/courses/:id/details` - Curso com usuários

### Proxy
- `/api/courses/*` - Proxy para Courses Microservice
- `/api/users/*` - Proxy para Users Microservice

## ⚙️ Configuração

Crie arquivo `.env`:
```env
PORT=3000
COURSES_SERVICE_URL=http://localhost:5001
USERS_SERVICE_URL=http://localhost:5002
NODE_ENV=development
```

## 🏗️ Estrutura do Projeto

```
WiseTraining.BFF/
├── src/
│   ├── routes/
│   │   ├── courses.routes.js      # Rotas de cursos
│   │   ├── users.routes.js        # Rotas de usuários
│   │   └── aggregation.routes.js # Rotas de agregação
│   ├── services/
│   │   └── api.service.js         # Cliente HTTP
│   └── server.js                  # Servidor Express
├── package.json
├── Dockerfile
└── .gitignore
```

## 🔗 Links
- **Repositório Principal**: https://github.com/victorhtanaka/WiseTraining-API
- **Courses Microservice**: https://github.com/athonbil/microservice1
- **Users Microservice**: https://github.com/athonbil/microservice2

## 📄 Licença
Este projeto é desenvolvido para fins educacionais.
