const localBd = {
  data() {
    return {
      nomeTabela: "", //tabela a ser usada
      dadosLocal: [], //Dados a serem inclusos
      onde: "", //valor de busca
      nomeCampo: "", // parametro onde buscar
    };
  },
  methods: {
    async gravar() {
      let dadosnobanco = await this.ler();
      dadosnobanco.push(this.dadosLocal);
      localStorage[this.nomeTabela] = JSON.stringify(dadosnobanco);
    },

    async ler() {
      if (this.nomeTabela in localStorage) {
        return JSON.parse(localStorage[this.nomeTabela]).reverse();
      } else {
        return [];
      }
    },

    async lerOnde() {
      let dadosnobanco = await this.ler();
      let exp = new RegExp(this.onde, "i");
      return dadosnobanco.filter((dado) => exp.test(dado[0][this.nomeCampo]));
    },

    apagarTabela() {
      this.nomeTabela.forEach((nome) => {
        localStorage.removeItem(nome);
      });
    },
  },
};

export default localBd;
