// Utilizando Repositorie por motivos de organização e encapsulamento do código
import prisma from "@database"

class CalcadoRepository{
    // Passando todos os dados como parâmetro, necessário para se criar
    async create(data:any){
        return await prisma.calcado.create({data})
    }

    async readAllProducts(){
        return await prisma.calcado.findMany()
    }

    async updateProduct(id: number, data:any){
        return await prisma.calcado.update({
            // Utilizando se o ID como meio de filtragem, útil já que ele é exclusivo por produto
            where:{id},
            data:{
                // Campo do BDD : Informação informada no body sobre tal campo
                nome_produto: data.nome_produto,
                cor: data.cor,
                marca: data.marca,
                tamanho: data.tamanho,
                preco: data.preco,
                quantidade_em_estoque: data.quantidade_em_estoque
            }})
    }

    async deleteProduct(id:number){
        return await prisma.calcado.delete({
            where:{id}
        })
    }

    // Fazer o getBySize basicamente foi só usar um Where pra filtrar a função readAllProducts
    async getBySize(tamanho:number){
        return await prisma.calcado.findMany({
            where:{tamanho}
        })
    }
    async getByMarca(marca:string){
        return await prisma.calcado.findMany({
            where:{marca}
        })
    }

   
    async countOfPares(){
        // Basicamente a função aggregate interage com um campo específico, neste precisavamos da soma toda em geral
        return await prisma.calcado.aggregate({
            _sum:{
                quantidade_em_estoque:true
            }
        // Após pesquisar caso quisesse uma soma filtrada por exemplo por marca também era só colocar um Where logo aqui
        // e pedir no começo da função o parâmetro de filtragem
        })
    }
}

// Necessita se exportar a classe, pra poder ser usada no Controller
export default new CalcadoRepository();