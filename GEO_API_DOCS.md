# 📍 API de Geolocalização - Guia Completo

## ✨ Melhorias Implementadas

### 1. **Backend (geoService.js)**

- ✅ **Cache inteligente** - Reduz chamadas à API Nominatim (TTL: 24 horas)
- ✅ **Retry com backoff exponencial** - Trata falhas de conexão automaticamente
- ✅ **Melhor tratamento de erros** - Logs mais detalhados
- ✅ **Validação de entrada** - Verifica se os dados são válidos antes de processar
- ✅ **Limite de resultados** - Máximo de 50 resultados para melhor performance

### 2. **Backend (server.js)**

- ✅ **Rota híbrida para eventos** - Suporta ID ou endereço como fallback
- ✅ **Mensagens de erro informativas** - Ajuda o usuário a resolver problemas
- ✅ **Raio personalizável** - Parâmetro `radius` em metros
- ✅ **Response estruturada** - Campo `sucesso` + `total` de resultados

### 3. **Frontend (Evento.jsx)**

- ✅ **Fallback inteligente** - Tenta ID do banco, depois endereço direto
- ✅ **Melhor tratamento de tipos de evento** - Funciona para API, mock e feira
- ✅ **UX aprimorada** - Erros mais claros e informações úteis
- ✅ **Dados enriquecidos** - Adiciona horário de funcionamento e telefone

---

## 🚀 Como Usar

### **Endpoint 1: Por ID do evento (se estiver no banco)**

```bash
GET /api/eventos/:id/proximidades
GET /api/eventos/1/proximidades?radius=2000
```

**Response:**

```json
{
  "sucesso": true,
  "evento": {
    "id": 1,
    "title": "Festa de Arte",
    "location": "Rua das Flores"
  },
  "coords": {
    "lat": -8.0647521,
    "lon": -34.8795952,
    "city": "Recife",
    "suburb": "Santo Antônio"
  },
  "proximidades": [
    {
      "id": 123456,
      "name": "Lanchonete Gelattus",
      "type": "fast_food",
      "lat": -8.065,
      "lon": -34.88,
      "address": "Rua das Flores, Santo Antônio",
      "cuisine": null,
      "website": null,
      "phone": null,
      "opening_hours": null
    }
  ],
  "total": 50
}
```

### **Endpoint 2: Por endereço direto (para eventos mock/feira)**

```bash
GET /api/proximidades?location=Rua%20das%20Flores%20Recife
GET /api/proximidades?location=Pátio%20de%20São%20Pedro&radius=1500
```

**Response:** Mesma estrutura acima, mas sem o objeto `evento`

---

## 🔧 Configuração Recomendada

### **Variáveis de Ambiente (.env)**

```env
# Nenhuma chave de API necessária!
# Nominatim (OpenStreetMap) e Overpass são free tier
# Respeite rate limits:
# - Nominatim: ~1 req/sec
# - Overpass: ~15-30 reqs por minuto
```

---

## 📊 Tipo de Dados Retornados

### **Tipos de Estabelecimentos:**

- 🍽️ `restaurant`, `cafe`, `bar`, `fast_food`, `pub`
- 🎭 `theatre`, `cinema`, `museum`, `arts_centre`
- 🌳 `park`, `viewpoint`
- 🎨 `gallery`, `attraction`, `artwork`

---

## ⚡ Performance

| Operação                | Tempo                   |
| ----------------------- | ----------------------- |
| Geocodificação (1ª vez) | ~500-1000ms             |
| Geocodificação (cache)  | ~0.1ms                  |
| Busca de proximidades   | ~2-5s (depende da rede) |
| Total (com cache)       | ~2-5s                   |

---

## 🐛 Troubleshooting

### **"Não foi possível geolocalizar o endereço"**

- ✅ Tente usar `?location=seu+endereco,Recife`
- ✅ Verifique se o endereço está correto
- ✅ Tente um endereço mais específico

### **Sem resultados nas proximidades**

- ✅ Aumente o `radius`: `?radius=2000` (2km)
- ✅ Pode ser uma área com poucos POIs mapeados
- ✅ Tente um bairro mais central (ex: Santo Antônio, Boa Vista)

### **API timeout**

- ✅ Verifique sua conexão com internet
- ✅ Tente novamente (tem retry automático)
- ✅ Reduzir raio pode ajudar

---

## 🧪 Testar Localmente

```bash
cd backend
node test_geo_api.js
```

Resultado esperado:

```
✅ Teste 1: Geocodificação ✓
✅ Teste 2: Busca de proximidades ✓ (50 locais)
✅ Teste 3: Cache ✓ (0.1ms)
✅ Teste 4: Sem contexto local ✓
```

---

## 🎯 Próximas Melhorias (Opcional)

- [ ] Filtrar por tipo de estabelecimento
- [ ] Ordenar por distância
- [ ] Salvar locais favoritos
- [ ] Integrar com Google Places para mais dados
- [ ] Suporte a rotas entre pontos
