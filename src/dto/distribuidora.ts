import { Usuario } from "./usuario"

export type DistribuidoraCreationProps = {
	nome_distribuidora: string
	qtd_licencas?: number
}

export type Distribuidora = {
	cod_distribuidora: number
	nome_distribuidora: string
	qtd_licencas: number
	dthr_criacao: Date
	dthr_atualizacao: Date
	usuarios?: Usuario[]
}
