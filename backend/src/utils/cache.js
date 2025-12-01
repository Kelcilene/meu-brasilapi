// Cache In-Memory simples para o Express
const cache = new Map();

/**
 * Middleware para cachear respostas GET por um tempo determinado.
 * @param {number} durationInSeconds Duração do cache em segundos.
 */
export function cacheMiddleware(durationInSeconds) {
    return (req, res, next) => {
        // Apenas faz cache em requisições GET
        if (req.method !== 'GET') {
            return next();
        }

        // Cria uma chave única com base na URL (ex: /api/buscar?q=teste)
        const key = req.originalUrl;
        const cachedResponse = cache.get(key);

        if (cachedResponse) {
            // Verifica se o cache existe e não expirou
            const { data, expiry } = cachedResponse;
            if (expiry > Date.now()) {
                console.log(`[Cache] Servindo resposta de cache para: ${key}`);
                return res.json(data);
            } else {
                // Cache expirou, remove e continua
                cache.delete(key);
            }
        }

        // Se não houver cache válido, sobrescreve o método .json() para cachear a resposta
        const originalJson = res.json;
        res.json = (body) => {
            console.log(`[Cache] Salvando resposta em cache para: ${key}`);
            const expiry = Date.now() + durationInSeconds * 1000;
            cache.set(key, { data: body, expiry });
            originalJson.call(res, body);
        };

        next();
    };
}