import RecipesRepository from '@/database/repository/RecipesRepository'
export default class RecipesController {
    constructor() {
        this.repository = new RecipesRepository();
    }

    // Adiciona receitas no banco de dados
    addRecipes(recipes) {
        return this.repository.addRecipes(recipes);
    }
    
    // Obtém receitas com validade
    async getRecipesWithExpiry(storeName, key) {
        try {
            console.log(111)
            // const item = await this.repository.getItemFromStore(storeName, key);

            // // Verifica se o item existe e não está expirado
            // if (item && Date.now() <= item.expiry) {
            //     return JSON.parse(item.value);
            // }

            // // Caso o item tenha expirado ou não exista, atualiza os dados
            // return await this.refreshRecipes(storeName, key);
        } catch (error) {
            console.error('Erro ao obter receitas com validade:', error);
            return [];
        }
    }

    // Atualiza as receitas caso necessário
    async refreshRecipes(storeName, key) {
        try {
            const fetchedData = await this.fetchRecipesFromApi(key);
            await this.repository.saveToSQLite(storeName, {
                key,
                value: fetchedData,
                expiry: Date.now() + 86400000, // 1 dia
            });
            return fetchedData;
        } catch (error) {
            console.error('Erro ao atualizar receitas:', error);
            return [];
        }
    }

    // Função fictícia para buscar receitas da API
    async fetchRecipesFromApi(key) {
        try {
            // Lógica para chamar a API e obter receitas
            const dados = await this.listagem();
            return dados.data;
        } catch (error) {
            console.error('Erro ao buscar receitas da API:', error);
            return [];
        }
    }
}
