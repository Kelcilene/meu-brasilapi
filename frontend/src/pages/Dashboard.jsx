import { CepProvider } from "../contexts/CepContext.jsx"; // Manter seu Contexto de CEP
import BuscarCEP from "../components/BuscarCEP";       // Seu componente de Busca
import InsertData from "../components/InsertData";     // Você precisará criar este

// O componente Dashboard recebe a função onLogout do App.jsx
function Dashboard({ onLogout }) {
  
  return (
    <div style={{ padding: "20px" }}>
      
      {/* 1. Botão de Logout */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Área Restrita (Dashboard)</h1>
        <button onClick={onLogout} style={{ padding: '10px 20px', backgroundColor: '#f44336', color: 'white', border: 'none', cursor: 'pointer' }}>
          Sair (Logout)
        </button>
      </div>

      ---

      {/* 2. Funcionalidade de Busca (Requisito 2) */}
      <h2>🔍 Requisito Funcional 2: Busca</h2>
      
      {/* Manter o CepProvider, mas você pode ter que movê-lo 
        para o Dashboard, dependendo de onde o estado é necessário.
        Se os dados do CEP não precisam ser compartilhados, você pode remover o Provider. 
        Mantive para compatibilidade com o seu código anterior. 
      */}
      <CepProvider>
        <BuscarCEP />
      </CepProvider>
      
      ---
      
      {/* 3. Funcionalidade de Inserção (Requisito 3) */}
      <h2>➕ Requisito Funcional 3: Inserção</h2>
      <InsertData /> {/* Este componente você precisará criar */}
      
      {/* Você pode adicionar aqui as funcionalidades de Busca/Inserção dos "dados" do seu DataModel */}
      
    </div>
  );
}

export default Dashboard;