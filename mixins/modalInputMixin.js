import { useQuasar } from "quasar";

const modalInputMixin = {
  data() {
    return {
      tituloModal: "",
      mensagemModal: "",
      obj: useQuasar(),
      funcaoOk: "",
      modal: "",
    };
  },
  methods: {
    async prompt() {
      const $q = this.obj;
      await $q
        .dialog({
          title: this.tituloModal,
          message: this.mensagemModal,
          // message: `
          // <em>${this.mensagemModal}</em>
          // <input type="number"
          // style="width:100%; font-size: 30px; text-align:right; border:none;
          // border-bottom: 1px solid yellow"
          // id="inputValor" />
          // `,
          html: true,
          ok: "Gravar",
          cancel: "Cancelar",
          prompt: {
            model: this.modal,
            type: "number", // opcional
          },
          cancel: true,
          persistent: true,
        })

        .onOk(async (data) => {
          //console.log(">>>> OK, received");
          await this.funcaoOk(data);
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    },
  },
};

export default modalInputMixin;
