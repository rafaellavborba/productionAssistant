import { useQuasar } from "quasar";

const notifyMixin = {
  data() {
    return {
      quasar: useQuasar(),
      mensagemNotificacao: "",
      colorNotificacao: "negative",
    };
  },
  methods: {
    notificando() {
      this.quasar.notify({
        message: this.mensagemNotificacao,
        color: this.colorNotificacao,
        icon: "check_circle_outline",
        position: "top-right",
      });
    },
  },
};

export default notifyMixin;
