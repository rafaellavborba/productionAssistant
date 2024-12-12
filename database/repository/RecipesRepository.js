import SQLiteManager from '../SQLiteManager';
import AcessoApi from '@/utils/acessoApi';

export default class RecipesRepository {
    constructor() {
        // Instancia a API para uso posterior
        const acessoApi = AcessoApi();
        this.listagem = acessoApi.listagem;
        this.gravacao = acessoApi.gravacao;
        this.atualizar = acessoApi.atualizar;
        this.setUri = acessoApi.setUri;
        this.setDadosEnvioApi = acessoApi.setDadosEnvioApi;
        this.setIdInstalacao = acessoApi.setIdInstalacao;
    }

    addRecipes(recipe) {
        return new Promise((resolve, reject) => {
            SQLiteManager.addRecipes(recipe)
                .then((sqlite) => {
                    resolve(sqlite);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    // Obtém receitas do banco com verificação de validade (expiração)
    async getRecipesWithExpiry(storeName, key) {
        try {
            const item = await this.repository.getItemFromStore(storeName, key);

            // Verifica se o item existe e não está expirado
            if (item && Date.now() <= item.expiry) {
                const value = JSON.parse(item.value);
                return value; // Retorna as receitas
            }

            // Caso o item tenha expirado ou não exista, atualiza os dados
            const updatedRecipes = await this.refreshRecipes(storeName, key);
            return updatedRecipes;
        } catch (error) {
            console.error('Erro ao obter receitas com validade:', error);
            return [];
        }
    }

    // Atualiza as receitas, caso necessário
    async refreshRecipes(storeName, key) {
        try {
            const fetchedData = await this.fetchRecipesFromApi(key);

            // Atualiza o banco com as novas receitas
            await this.repository.saveToSQLite(storeName, {
                key,
                value: fetchedData,
                expiry: Date.now() + 86400000, // 1 dia
            });

            return fetchedData;
        } catch (error) {
            console.error('Erro ao atualizar as receitas:', error);
            return [];
        }
    }

    // Função para buscar as receitas de uma API
    async fetchRecipesFromApi(key) {
        try {
            this.setUri(key);
            this.setDadosEnvioApi({ key: 'value' });
            const dados = await this.listagem();
            return dados.data;
        } catch (error) {
            console.error('Erro ao buscar receitas da API:', error);
            return [];
        }
    }
}
