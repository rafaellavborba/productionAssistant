import { useQuasar } from "quasar";

const modalMixin = {
  data() {
    return {
      tituloModal: "",
      mensagemModal: "",
      obj: useQuasar(),
    };
  },

  methods: {
    async alertando() {
      const $q = this.obj;
      await $q
        .dialog({
          title: this.tituloModal,
          message: this.mensagemModal,
        })
        .onOk(() => {
          //console.log('OK')
        })
        .onCancel(() => {
          // console.log('Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    },
  },
};

export default modalMixin;
