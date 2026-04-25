import prisma from "@database"
import { deleteProduct } from "src/controllers/UserController"

// createProduct, deleteProduct, readAllProducts, updateProduct

class CalcadoRepository{
    async create(data:any){
        return await prisma.calcado.create({data})
    }

    async readAllProducts(){
        return await prisma.calcado.findMany()
    }

    async updateProduct(id: number, data:any){
        return await prisma.calcado.update({
            where:{id},
            data:{
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
        return await prisma.calcado.aggregate({
            _sum:{
                quantidade_em_estoque:true
            }
        })
    }
}


export default new CalcadoRepository();