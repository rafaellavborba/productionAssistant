const dataHoraMixin = {
  data() {
    return {
      atual: "",
    };
  },
  created() {
    this.atual = new Date();
  },
  methods: {
    atualDataHoraBR() {
      //const options = { dateStyle: "short" };
      //return event.toLocaleString("pt-BR", options);
      //data hora atual
      return this.atual.toLocaleString("pt-BR");
    },
    atualDataBR() {
      const options = { dateStyle: "short" };
      return this.atual.toLocaleString("pt-BR", options);
    },
    atualHoraBR() {
      const options = { timeStyle: "medium" };
      return this.atual.toLocaleString("pt-BR", options);
    },
    atualDataBD() {
      const options = { dateStyle: "short" };
      return this.atual.toLocaleString("en-CA", options);
    },
  },
};

export default dataHoraMixin;
