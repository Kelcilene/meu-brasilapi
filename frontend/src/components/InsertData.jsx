import { useState } from 'react';
import api from '../services/api'; // Importa a instância segura do Axios

export function InsertData() {
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('');
  const [cidade, setCidade] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Limpa mensagens anteriores
    setIsError(false);

    try {
      // 1. Envia os dados para a rota POST /api/inserir
      // O middleware 'auth' do Back-end garante que apenas logados podem acessar.
      const response = await api.post('/api/inserir', {
        nome,
        categoria,
        cidade,
      });

      // 2. Sucesso: Exibe mensagem e limpa o formulário
      setMessage(response.data.message || 'Dados inseridos com sucesso!');
      setNome('');
      setCategoria('');
      setCidade('');

    } catch (err) {
      // 3. Trata erros do Back-end (Ex: Validação de campo vazio)
      const errorMessage = err.response?.data?.error || 'Erro ao comunicar com o servidor. Verifique o console.';
      setMessage(errorMessage);
      setIsError(true);
      console.error(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome (Obrigatório):</label>
          <input
            id="nome"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label htmlFor="categoria">Categoria:</label>
          <input
            id="categoria"
            type="text"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          />
        </div>
        
        <div>
          <label htmlFor="cidade">Cidade:</label>
          <input
            id="cidade"
            type="text"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
          />
        </div>

        <button type="submit" style={{ marginTop: '15px' }}>
          Inserir Dados
        </button>
      </form>

      {/* Exibe a mensagem de retorno */}
      {message && (
        <p style={{ color: isError ? 'red' : 'green', marginTop: '15px', fontWeight: 'bold' }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default InsertData; // Exportação padrão