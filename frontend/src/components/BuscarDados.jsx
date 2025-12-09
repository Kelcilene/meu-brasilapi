import { useState } from "react";
import api from "../services/api";

export default function BuscarDados() {
  const [query, setQuery] = useState("");
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query.trim()) {
      setErro("Digite um termo para buscar.");
      return;
    }

    setErro("");
    setLoading(true);
    setResultados([]);

    try {
      const response = await api.get(`/api/dados?search=${query}`);
      setResultados(response.data);
    } catch (err) {
      const msg = err.response?.data?.error || "Erro ao buscar dados.";
      setErro(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "15px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h3>Buscar dados no banco</h3>

      <form onSubmit={handleSearch} style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Digite um nome, cidade ou categoria..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            padding: "8px",
            width: "250px",
            marginRight: "10px"
          }}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </form>

      {erro && (
        <p style={{ color: "red", fontWeight: "bold" }}>{erro}</p>
      )}

      {resultados.length > 0 && (
        <ul style={{ marginTop: "15px" }}>
          {resultados.map((item) => (
            <li key={item.id} style={{ marginBottom: "8px" }}>
              <strong>{item.nome}</strong> — {item.categoria} ({item.cidade})
            </li>
          ))}
        </ul>
      )}

      {resultados.length === 0 && !loading && !erro && (
        <p>Nenhum resultado para exibir.</p>
      )}
    </div>
  );
}

