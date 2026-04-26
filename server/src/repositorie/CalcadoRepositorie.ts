import prisma from "@database";

export const findCalcadosByTamanho = async (tamanhoBusca: Number) => {
    const calcados = await prisma.calcado.findMany({
        where: { tamanho: Number(tamanhoBusca) } // filtro de busca por tamanho
    });

    return calcados;
}

export const findCalcadosByMarca = async (marcaBusca: string) => {
    const calcados = await prisma.calcado.findMany({
        where: { marca: marcaBusca } // filtro de busca por marca
    });

    return calcados;
}

export const countTotalCalcados = async() => {
    const totalCalcados = await prisma.calcado.count(); // função de contar todas as linhas de calçados no banco de dados

    return totalCalcados;
}