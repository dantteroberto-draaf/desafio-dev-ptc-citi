import { Request, Response } from "express";
import prisma from "@database";

import { findCalcadosByTamanho, findCalcadosByMarca, countTotalCalcados } from "src/repositorie/CalcadoRepositorie";

export const readAllCalcados = async (req: Request, res: Response) => {
    try {
        const calcados = await prisma.calcado.findMany();
        // utilizei a mesma lógica usada no readAllUsers, só que agora listando
        // os calçados ao invés dos usuários
        if (calcados.length == 0){
            return res.status(404).json({
                message: "Nenhum calçado registrado ainda."
            })
        }

        return res.status(200).json(calcados);

    } catch (error) {
        return res.status(400).json({
            "message": "Ocorreu um erro ao listar os calçados.",
            error,
        })
    }
}

// Registra um novo calçado no banco dados. Recebe o json no corpo da requisição e cria um novo objeto 'calcado' com essas informações no Prisma
export const registerCalcado = async (req: Request, res: Response) => {
    try {

        const calcado = req.body;

        if (Object.keys(calcado).length === 0){
            return res.status(404).json({
                message: "Preencha todas as informações."
            })
        }

        const calcadoCriado = await prisma.calcado.create({
            data: calcado,
        });

        return res.status(200).json(calcadoCriado);

    } catch (error) {
        return res.status(400).json({
            "message": "Ocorreu um erro ao registrar o calçado.",
            error,
        })
    }
}

// deleta um calçado pelo ID
export const deleteCalcado = async (req: Request, res: Response) => {
    try{

        const { idCalcado } = req.params;

        const calcadoDeletado = await prisma.calcado.delete({
            where: { id: Number(idCalcado)}
        })

        return res.status(200).json({
            message: "Calçado removido com sucesso!",
            calcadoDeletado,
        });


    } catch (error) {
        return res.status(400).json({
            "message": "Ocorreu um erro ao deletar o calçado.",
            error,
        })
    }
}


// atualiza as informações de um calçado pelo seu ID
export const updateCalcado = async (req: Request, res: Response) => {
    try {
        const { idCalcado } = req.params;

        const infoCalcado = req.body;

         if (!infoCalcado){
            return res.status(404).json({
                message: "Preencha corretamente as informações a serem atualizadas"
            })
        }

        const calcadoAtualizado = await prisma.calcado.update({
            data:  infoCalcado,
            where: { id: Number(idCalcado) },
        })


        return res.status(200).json({
            message: "Calçado atualizado com sucesso!",
            calcadoAtualizado,
        });

    } catch (error) {
        return res.status(400).json({
            "message": "Ocorreu um erro ao atualizar o calçado.",
            error,
        })
    }
}

// recebe o parâmetro com o tamanho e utiliza a função de CalcadoRepositorie para retornar apenas o tamanho que o usuário quer ver
export const findCalcadosPorTamanho = async (req: Request, res: Response) => {
    try {
        const { tamanho } = req.params;

        const calcados = await findCalcadosByTamanho(Number(tamanho));

        return res.status(200).json(calcados);

    } catch (error) {
        return res.status(400).json({
            "message": "Ocorreu um erro ao buscar os calçados.",
            error,
        })
    }
}

// recebe o parâmetro com a marca e utiliza a função de CalcadoRepositorie para retornar apenas a marca que o usuário quer ver
export const findCalcadosPorMarca = async (req: Request, res: Response) => {
    try {
        const { marca } = req.params;

        const calcados = await findCalcadosByMarca(marca);

        return res.status(200).json(calcados);

    } catch (error) {
        return res.status(400).json({
            "message": "Ocorreu um erro ao buscar os calçados.",
            error,
        })
    }
}

// Utiliza a função do repositorie para retornar a contagem de todas as ocorrências de calçados no banco de dados
export const countCalcados = async (req: Request, res: Response) => {
    try {
        const qtCalcados = await countTotalCalcados();

        return res.status(200).json(qtCalcados);

    } catch (error) {
        return res.status(400).json({
            "message": "Ocorreu um erro ao contar a quantidade de calçados.",
            error,
        })
    }
}