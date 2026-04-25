// No controller basicamente damos a interação devida do que está escrito no Repositories com o banco de dados
// basicamente um declara funções e o outro realmente as utiliza.
import { Request, Response } from "express";
import prisma from "@database";
import Message from "src/global/Message";
import CalcadoRepository from "../repositorie/UserRepositorie";

export const createProduct = async (req:Request, res:Response) =>{
    try{
        // Pegando tudo que irá ser escrito no Body.
        const data = req.body;
        // Verificação para ver se está com todas as infos.
        if (!data.nome_produto || !data.cor || !data.marca || !data.tamanho || !data.preco || !data.quantidade_em_estoque)
            {
                return res.status(404).json({
                    Message: "Preencha todas as informações obrigatórias",
                });
            }
        
        const shoe = await CalcadoRepository.create(data)

        return res.status(201).json({
            message: "Produto criado com sucesso"
        }
            
        )
    } catch(error){
        return res.status(400).json({
            message:"Erro ao tentar criar Produto.",
            error,
        })
    }
}


export const readAllProducts = async(req: Request, res: Response) => {
    try{
        const shoes = await CalcadoRepository.readAllProducts();

        // Verificação pra se caso nada seja encontrado.
        if(!shoes){
            return res.status(404).json({
                message:"Nenhum produto criado ainda."
            })
        }
        return res.status(200).json(shoes)
    }
    catch(error){
        return res.status(400).json({
            message: "Erro ao buscar produtos.",
            error
        })

    }
}

export const updateProduct = async(req: Request, res: Response) => {
    try{
        // ID é parâmetro.
        const {id} = req.params;
        // Enquanto data é conteúdo do body.
        const data = req.body;

        const shoe = await CalcadoRepository.updateProduct(Number(id), data);

        return res.status(200).json({
            message:"Produto atualizado com sucesso!"
        })
    }
    catch(error)
    {
        return res.status(400).json({
            message: "Erro ao tentar atualizar produto",
            error
        })
    }
}

export const deleteProduct = async(req: Request, res: Response) => {
    try{
        const {id} = req.params;
        // Filtrando pra ver se o ID desejado existe.
        if(!id){
            return res.status(404).json({
                message: "Produto não encontrado."
            })
        }

        const shoe = await CalcadoRepository.deleteProduct(Number(id))

        return res.status(200).json({
            message: "Produto deletado com sucesso!"
        })
    }
    catch(error){
        return res.status(400).json({
            message: "Erro ao deletar usuário",
            error
        })
    }
}

export const getByTamanho = async(req:Request, res: Response ) => {
    try{
        const{tamanho} = req.params;
        if(!tamanho){
            return res.status(404).json({
                message:"Não há produto do tamanho especificado!"
            })
        }

        const shoes = await CalcadoRepository.getBySize(Number(tamanho))
        return res.status(200).json(shoes)
    }
    catch(error){
        return res.status(400).json({
            message: "Erro ao procurar produtos desse tamanho",
            error
        })
    }
}

export const getByMarca = async(req:Request, res: Response ) => {
    try{
        const{marca} = req.params;
        if(!marca){
            return res.status(404).json({
                message:"Não há produto dessa marca especifica!"
            })
        }

        const shoes = await CalcadoRepository.getByMarca(marca)
        return res.status(200).json(shoes)
    }
    catch(error){
        return res.status(400).json({
            message: "Erro ao procurar produtos dessa marca",
            error
        })
    }
}

export const countOfPares = async (req:Request, res: Response) => {
    try{
        const shoes = await CalcadoRepository.countOfPares();

        // Basicamente vê se a conta deu algo ou deu nada.
        const total = shoes._sum.quantidade_em_estoque || 0;

        if(total == 0){
            return res.status(200).json({
                message:"Estoque vazio",
                // Achei legal pois após pesquisar descobri que facilmente posso editar o json do jeito que eu quero.
                // Eu tinha certeza que esse message era uma palavra reservada, bom saber do controle que temos.
                total_estoque: 0
            })
        }
        return res.status(200).json({
            message: "Contagem realizada com sucesso",
            total_estoque:total
        })
    }
    catch(error){
        return res.status(400).json({
            message: "Erro ao contar pares",
            error
        })

    }
}