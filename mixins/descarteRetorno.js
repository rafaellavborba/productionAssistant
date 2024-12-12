import { mapMutations, mapState } from "vuex";
import acessoApi from "./acessoApi";
import dataHoraAtual from "../mixins/dataHoraMixin";
import getItensMixin from "src/mixins/getItensMixin";
import notifyMixin from "../mixins/notifyMixin";
import localBd from "./localBd";
import modalMixin from "./modalMixin";
import loadMixin from "./loadMixin";

export default {
    name: 'DescarteRetorno',
    mixins: [
      acessoApi, 
      dataHoraAtual, 
      getItensMixin, 
      notifyMixin, 
      localBd, 
      modalMixin, 
      loadMixin
    ],
    props: {
      cuba: {
          type: Object,
          default: () => {}
      }
    },
    data(){
      return {
        descarteModal: 0,
        ingredienteReceita: [],
        ingredienteReceitaReq: [],
        preparoReceita: [],
        dataProducao: "",
        naoConectadoLocal: "",
        itemLista: 0,
        comandoBotao: "Avança",
        visivel: false,
        proximo: false,
        copiaFixo: [],
        nProduzir: false,
        qtde_receitas: 0,
        showDialogModal: false,
        janelinhaBotao: '',
        mensagemJanelinha: '',
        step: 1,
        quantidade: '',
        motivo : null,
        isVisible: false,
        confirmado: false,
        vinculado: [],

      }
    },
   
    computed: {
        ...mapState({
            S_RECEITA: state => state.produzir.S_RECEITA,
            S_INGREDIENTE: state => state.produzir.S_INGREDIENTE
        }),
        podeFundo(){
          return this.ingredienteReceita.some(ing => ing.qtde_fixa)
        },
    },
    watch:{
        showDialogModal(v){
          if(!v && this.descarteModal === 1){
              this.$router.push({name: 'home'})
          }
        }
    },
    methods: {
      ...mapMutations({
        M_INGREDIENTE: 'produzir/M_INGREDIENTE'
      }),
      parseReal(val) {
          return this.parseNumber(val).toLocaleString('pt-br', {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
          })
      },
      parseNumber(val, tofixed) {
          val = `${val || '0'}`.replace(',', '.')
          return +(Number(val).toFixed(tofixed || 2))
      },
      async carregarVinculo(uuidoi) {
        let servidorLocal = JSON.parse(localStorage.config)[0][0]
        .enderecoServidor;
        this.idinstalacao = JSON.parse(localStorage.config)[0][0].idInstalacao;
        let servidorWeb = this.url;
        this.url = servidorLocal;
        this.uri = "/produtos/" + uuidoi;

        let id = "";

        await this.listagem().then(async (dados) => {
        if (dados.data.body.length > 0) {
            id = dados.data.body[0].id_produto;
        }
        });
        this.url = servidorWeb;
        return id;
      },
      calcularDescarte(descarte){
          if (parseFloat(descarte) < 0) {
              this.mensagemNotificacao = "Peso produzido é maior que o peso das cubas";
              this.colorNotificacao = "negative";
              this.notificando();
              return false;
          }
          if (parseFloat(descarte) > parseFloat(this.returnKG?.replace(',', '.'))) {
              this.mensagemNotificacao = "Descarte é maior que o peso produzido";
              this.colorNotificacao = "negative";
              this.notificando();
              return false;
          }
          console.log(this.cuba.receita?.uuid_receita)
          const uuid = this.cuba?.receita?.uuid_receita || this.S_INGREDIENTE?.uuid_ingrediente || this.S_RECEITA?.uuid_receita
          this.marcarDescarte(uuid, descarte)
          
      },
      async marcarDescarte(uuid, descarte) {

          let dadinhos = await this.carregarVinculo(uuid).catch((erro) => {
              this.mensagemNotificacao = "Não conectado ao servidor da loja!";
              this.colorNotificacao = "negative";
              this.notificando();
              return false;
          });
          if (dadinhos === false) {
              return "";
          }

          if (!dadinhos) {
              this.mensagemNotificacao = "Receita não vinculada";
              this.colorNotificacao = "negative";
              this.notificando();
              return;
          }
          this.M_INGREDIENTE({...this.S_INGREDIENTE, id_produto: dadinhos})
          this.baixaDeDescarte(descarte)
      },
      async baixaDeDescarte(descarte) {
          let servidorLocal = JSON.parse(localStorage.config)[0][0]
              .enderecoServidor;
          this.idinstalacao = JSON.parse(localStorage.config)[0][0].idInstalacao;
          let servidorWeb = this.url;
          this.url = servidorLocal;

          this.uri = "/estoque/"; // + element.uuid;
          const motivo = this.motivo?.value != 1 && this.motivo?.value != 2 ? this.motivo.label : 'PRODUTORA DE GELATO'
          const dadosDaBaixa = {
              id_destino: "-3",
              id_produto: this.cuba?.receita?.id_produto || this.S_INGREDIENTE?.id_produto || this.S_RECEITA.id_produto,
              tipo: "1",
              historico: `BAIXA DE DESCARTE-${motivo}`,
              datamov: this.atualDataBD(),
              id_origem: "1",
              quantidade: descarte.toString(),
          };

          this.dadosEnvioApi = dadosDaBaixa;
          if(navigator.onLine){
              try{
              const data = await this.gravacao()

              if (data.data.ok == true) {
                  this.mensagemNotificacao = "Baixa de descarte realizada com sucesso!";
                  this.colorNotificacao = "positive";
              } else {
                  this.mensagemNotificacao =
                  "Baixa não realizada.!" + element.nm_receita;
                  this.colorNotificacao = "negative";
              }
              }  catch (e){
              this.mensagemNotificacao = "Erro ao processar baixa";
              this.colorNotificacao = "negative";
              }

          } else {
              // this.guardarRequisiçãoOffline(dadosDaBaixa, "/estoque/")
              this.mensagemNotificacao = "Baixa de descarte pendente!";
              this.colorNotificacao = "positive";
          }
          this.notificando();
          this.url = servidorWeb;
          this.msgJanelinha = `Você está descartando ${parseFloat(descarte).toFixed(3).replace('.',',')} KG`
          this.janelinhaBotao = 'Confirmo'
          this.showDialogModal = true;
          this.descarteModal = 1
      },
      async baixaDeIngredientes() {
          let servidorLocal = JSON.parse(localStorage.config)[0][0]
            .enderecoServidor;
          this.idinstalacao = JSON.parse(localStorage.config)[0][0].idInstalacao;
    
          let servidorWeb = this.url;
          this.url = servidorLocal;
    
          for (const element of this.ingredienteReceita) {
            this.uri = "/estoque/";
            const dadosDaBaixa = {
              id_destino: "-8",
              id_produto: element.id_produto,
              tipo: "1",
              historico: "BAIXA DE PRODUÇÃO",
              datamov: this.atualDataBD(),
              id_origem: "1",
              quantidade: element.qtde_ingrediente,
            };
    
            this.dadosEnvioApi = dadosDaBaixa;
    
            if (navigator.onLine) {
              try {
                const response = await this.gravacao();
                if (response.data.ok) {
                  this.mensagemNotificacao = "Baixa de ingredientes realizada com sucesso!";
                  this.colorNotificacao = "positive";
                } else {
                  this.mensagemNotificacao = `Baixa não realizada: ${element.tb_ingrediente.nm_ingrediente}`;
                  this.colorNotificacao = "negative";
                }
              } catch (error) {
                this.mensagemNotificacao = `Erro na baixa: ${element.tb_ingrediente.nm_ingrediente}`;
                this.colorNotificacao = "negative";
              }
            } else {
              // this.guardarRequisiçãoOffline(dadosDaBaixa, "/estoque/")
              this.mensagemNotificacao = "Baixa de ingredientes pendente!";
              this.colorNotificacao = "positive";
            }
          }
          this.notificando();
    
          this.url = servidorWeb;
      },
      async entradaProducao() {
        let servidorLocal = JSON.parse(localStorage.config)[0][0]
          .enderecoServidor;
        this.idinstalacao = JSON.parse(localStorage.config)[0][0].idInstalacao;
        let servidorWeb = this.url;
        this.url = servidorLocal;
  
        //incluindo quantidade fixa ao lançamento de produção ....
        var totalFixo = 0;
        this.ingredienteReceita.map(async (ingrediente) => {
          totalFixo += ingrediente.qtde_fixa
            ? parseFloat(ingrediente.qtde_ingrediente)
            : 0;
        });
        const isGelato = (this.S_RECEITA?.gelato && this.S_RECEITA.gelato === 'S') || 
          (this.cuba?.receita?.gelato && this.cuba?.receita?.gelato === 'S')
        const dadosDaBaixa = {
            id_destino: "1",
            id_produto: await this.carregarVinculo(this.$route.params.uuid || this.cuba?.receita?.uuid_receita),
            tipo: "0",
            historico: "ENTRADA DE PRODUÇÃO",
            datamov: this.atualDataBD(),
            id_origem: "-8",
            quantidade: parseFloat(isGelato ? (this.cuba?.receita ? this.returnKG : this.cubasKG + this.rebateKG) : this.quantidade) + totalFixo,
          };
          this.uri = "/estoque/"; // + this.$route.params.uuid;
          this.dadosEnvioApi = dadosDaBaixa;
        if(navigator.onLine){
          try {
            await this.gravacao().then((data) => {
              if (data.data.ok == true) {
                this.mensagemNotificacao =
                  "Entrada de receita realizada com sucesso!";
                this.colorNotificacao = "positive";
              } else {
                this.mensagemNotificacao = "Entrada de receita não realizada.!";
                this.colorNotificacao = "negative";
              }
            });
          } catch (error) {}
        } else {
          // this.guardarRequisiçãoOffline(dadosDaBaixa, "/estoque/")
          this.mensagemNotificacao = "Entrada de receita pendente!";
          this.colorNotificacao = "positive";
        }
        this.notificando();
  
  
        this.url = servidorWeb;
      },
      async tranferir(produto, materiaPrima, qtde) {
        let servidorLocal = JSON.parse(localStorage.config)[0][0]
          .enderecoServidor;
        this.idinstalacao = JSON.parse(localStorage.config)[0][0].idInstalacao;
        let servidorWeb = this.url;
        this.url = servidorLocal;
  
        this.uri = "/estoque/"; // + element.uuid;
  
        //baixa da produção para estoque
        let dadosDaBaixa = {
          id_destino: "-8",
          id_produto: produto,
          tipo: "1",
          historico: "TRANSFERENCIA DE PRODUTO",
          datamov: this.atualDataBD(),
          id_origem: "1",
          quantidade: qtde,
        };
  
        this.dadosEnvioApi = dadosDaBaixa;
        if(navigator.onLine){
          await this.gravacao().then((data) => {
          if (data.data.ok == true) {
            this.mensagemNotificacao =
              "Baixa de Transferência realizada com sucesso!";
            this.colorNotificacao = "positive";
          } else {
            this.mensagemNotificacao =
              "Baixa não realizada.!" + element.nm_receita;
            this.colorNotificacao = "negative";
          }
        });
        } else {
          // this.guardarRequisiçãoOffline(dadosDaBaixa, "/estoque/")
          this.mensagemNotificacao = "Baixa de Transferência pendente!";
          this.colorNotificacao = "positive";
        }
        this.notificando();
  
        // //entrada da produção para estoque
        dadosDaBaixa = {
          id_destino: "1",
          id_produto: materiaPrima?.id_produto || materiaPrima[0].id_produto,
          tipo: "0",
          historico: "TRANSFERÊNCIA DE MATERIA PRIMA",
          datamov: this.atualDataBD(),
          id_origem: "-8",
          quantidade: qtde,
        };
  
        this.dadosEnvioApi = dadosDaBaixa;
        if(navigator.onLine){
          await this.gravacao().then((data) => {
            if (data.data.ok == true) {
              this.mensagemNotificacao =
                "Entrada de Transferência realizada com sucesso!";
              this.colorNotificacao = "positive";
            } else {
              this.mensagemNotificacao =
                "Baixa não realizada.!" + element.nm_receita;
              this.colorNotificacao = "negative";
            }
          });
        } else {
          // this.guardarRequisiçãoOffline(dadosDaBaixa, "/estoque/")
          this.mensagemNotificacao = "Baixa de Transferência pendente!";
          this.colorNotificacao = "positive";
        }
  
        this.notificando();
  
        this.url = servidorWeb;
        // setTimeout(() => {
        //   this.$router.go();
        // }, 700);
      },
      async carregarVinculoDescricao(descricao) {
        let servidorLocal = JSON.parse(localStorage.config)[0][0]
          .enderecoServidor;

        this.idinstalacao = JSON.parse(localStorage.config)[0][0].idInstalacao;
        let servidorWeb = this.url;
        this.url = servidorLocal;
        // this.uri = "/produto/" + descricao;
        let dadinhos = "";
        const dados = getItemWithExpiry('vinculoDesc/' + descricao, "/produto/" + descricao)
        if (dados.data.body.length > 0) {
          dadinhos = dados.data.body;
        }
        this.url = servidorWeb;
        return dadinhos;
      },
      async transferirEstoque(uuid_receita, nm_receita) {
        //verifica destino antes

        let materiaPrima = await this.carregarVinculoDescricao(nm_receita).catch(
          () => {
            this.mensagemNotificacao = "Não conectado ao servidor local!";
            this.colorNotificacao = "negative";
            this.notificando();
            return "erro";
          }
        );
        if (materiaPrima?.length && materiaPrima != "erro") {
          let produto = await this.carregarVinculo(uuid_receita);
          const isGelato = (this.S_RECEITA.gelato && this.S_RECEITA.gelato === 'S') || 
            (this.cuba?.receita.gelato && this.cuba.receita.gelato === 'S')
          const qtd = isGelato ? (this.cuba?.receita ? this.returnKG : this.cubasKG + this.rebateKG)  : this.quantidade
  
          await this.tranferir(
            produto,
            materiaPrima,
            qtd
          );
        } else {
          this.mensagemNotificacao = "Não existe um ingrediente de destino.";
          this.colorNotificacao = "negative";
          materiaPrima != "erro" ? this.notificando() : "";
        }
      },
      
    }
}