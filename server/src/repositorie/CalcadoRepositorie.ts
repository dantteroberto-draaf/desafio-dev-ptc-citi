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

export const countTotalCalcados = async() => { // função de contar a quantidade total de calçados cadastrados
    let totalCalcados = 0;
    const calcados = await prisma.calcado.findMany()

    for (const calcado of calcados) {
        totalCalcados += calcado.quantidade_em_estoque;
    }
    return totalCalcados;
}