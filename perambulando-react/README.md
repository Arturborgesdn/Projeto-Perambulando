# 🗺️ Perambulando — React

Versão React do projeto Perambulando, migrada do HTML/CSS/JS puro para React com Vite e React Router.

## ✅ O que foi migrado

| Página original      | Rota React        |
|----------------------|-------------------|
| index.html           | `/`               |
| cinema.html          | `/cinema`         |
| teatro.html          | `/teatro`         |
| restaurantes.html    | `/restaurantes`   |
| feiras.html          | `/feiras`         |
| shows.html           | `/shows`          |
| exposicoes.html      | `/exposicoes`     |
| lazer.html           | `/lazer`          |
| infantil.html        | `/infantil`       |
| eventos-do-dia.html  | `/eventos-do-dia` |
| roteiros_prontos.html| `/roteiros`       |
| painel.html          | `/painel`         |
| login.html           | `/login`          |
| cadastro.html        | `/cadastro`       |
| evento.html?id=X     | `/evento/:id`     |

## 🚀 Como rodar o projeto

### Requisitos
- Node.js 18+ instalado ([nodejs.org](https://nodejs.org))

### Passos

```bash
# 1. Entre na pasta do projeto
cd perambulando-react

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

O projeto vai abrir em **http://localhost:5173**

### Build para produção

```bash
npm run build
npm run preview
```

## 📁 Estrutura do projeto

```
src/
├── components/
│   ├── Header.jsx      ← Cabeçalho + menu hambúrguer
│   ├── Footer.jsx      ← Rodapé
│   └── EventCard.jsx   ← Card reutilizável de evento
├── pages/
│   ├── Home.jsx        ← Página inicial com filtros
│   ├── Cinema.jsx      ← Programação de cinemas
│   ├── Teatro.jsx      ← Peças de teatro
│   ├── Restaurantes.jsx
│   ├── Feiras.jsx
│   ├── Shows.jsx
│   ├── Exposicoes.jsx
│   ├── Lazer.jsx
│   ├── Infantil.jsx
│   ├── EventosDoDia.jsx
│   ├── RoteiroProntos.jsx
│   ├── Painel.jsx      ← Agenda pessoal (requer login)
│   ├── Login.jsx
│   ├── Cadastro.jsx
│   └── Evento.jsx      ← Detalhe de um evento
├── data/
│   └── data.js         ← Todos os dados (mockEventsData, cinemaData, etc.)
├── styles/
│   └── style.css       ← CSS global migrado do projeto original
└── App.jsx             ← Definição de todas as rotas
```

## 🖼️ Assets (imagens)

Coloque as imagens do projeto original (`logo.png`, `Perambulando.png`, etc.)
dentro da pasta `public/` para que fiquem acessíveis em produção.

## 💡 Próximos passos sugeridos

- [ ] Conectar a um backend real (Supabase, Firebase, etc.) para substituir o `localStorage`
- [ ] Adicionar autenticação real
- [ ] Implementar a página "Perto de Mim" com a API de geolocalização
- [ ] Adicionar sistema de avaliações nos eventos
- [ ] Deploy no Vercel ou Netlify (gratuito!)
