import { Router } from "express";

export const router = Router();

// Rota para consultar CEP usando BrasilAPI
router.get("/:cep", async (req, res) => {
  const cep = req.params.cep;

  try {
    const apiURL = `https://brasilapi.com.br/api/cep/v1/${cep}`;
    const resposta = await fetch(apiURL);

    if (!resposta.ok) {
      return res.status(404).json({ erro: "CEP não encontrado" });
    }

    const dados = await resposta.json();
    res.json(dados);

  } catch (erro) {
    res.status(500).json({ erro: "Erro ao consultar CEP" });
  }
});
