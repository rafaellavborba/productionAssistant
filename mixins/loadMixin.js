import { useQuasar } from "quasar";

const loadMixin = {
  data() {
    return {
      load: useQuasar(),
    };
  },
  methods: {
    carregando() {
      let timer;
      this.load.loading.show({ message: "Aguarde carregando ...." });
      // hiding in 2s
      timer = setTimeout(() => {
        this.load.loading.hide();
        timer = void 0;
      }, 600);
    },

    processandoDados(i) {
      if (i === true) {
        this.load.loading.show({ message: "Aguarde carregando ...." });
      } else {
        this.load.loading.hide();
      }
    },
  },
};

export default loadMixin;
