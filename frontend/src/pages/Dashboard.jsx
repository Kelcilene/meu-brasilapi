import { CepProvider } from "../contexts/CepContext.jsx"; // Manter seu Contexto de CEP
import BuscarCEP from "../components/BuscarCEP";       // Seu componente de Busca
import InsertData from "../components/InsertData";     // Você precisará criar este

// O componente Dashboard recebe a função onLogout do App.jsx
function Dashboard({ onLogout }) {
  
  return (
    <div style={{ padding: "20px" }}>
      
      {/* Botão de Logout */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Área Restrita (Dashboard)</h1>
        <button onClick={onLogout} style={{ padding: '10px 20px', backgroundColor: '#f44336', color: 'white', border: 'none', cursor: 'pointer' }}>
          Sair (Logout)
        </button>
      </div>

      <hr />

      {/* Busca CEP */}
      <h2>🔍 Requisito Funcional 2: Busca</h2>
      
      <CepProvider>
        <BuscarDados/>
      </CepProvider>
      
      <hr />
      
      {/* Inserção */}
      <h2>➕ Requisito Funcional 3: Inserção</h2>
      <InsertData /> {/* Este componente você precisará criar */}
      
      {/* Você pode adicionar aqui as funcionalidades de Busca/Inserção dos "dados" do seu DataModel */}
      
    </div>
  );
}

export default Dashboard;