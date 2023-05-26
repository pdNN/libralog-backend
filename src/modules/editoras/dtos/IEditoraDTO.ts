export type IUpdateEditoraDTO = {
  cod_editora: number;
  nome_editora?: string;
  des_razao_social?: string;
  des_contato?: string;
  des_endereco?: string;
  nr_endereco?: string;
  des_bairro?: string;
  des_cidade?: string;
  nr_cep?: string;
  nr_telefone?: string;
  cod_cnpj?: string;
  cod_insc_estadual?: string;
  des_email?: string;
};

export type ICreateEditoraDTO = {
  nome_editora: string;
  des_razao_social: String;
  des_contato: String;
  des_endereco: String;
  nr_endereco: String;
  des_bairro: String;
  des_cidade: String;
  nr_cep: String;
  nr_telefone: String;
  cod_cnpj: String;
  cod_insc_estadual: String;
  des_email: String;
};

export type IEditoraDTO = {
  cod_editora: number;
  nome_editora: string;
  dthr_criacao: Date;
  dthr_atualizacao: Date;
  des_razao_social: String;
  des_contato: String;
  des_endereco: String;
  nr_endereco: String;
  des_bairro: String;
  des_cidade: String;
  nr_cep: String;
  nr_telefone: String;
  cod_cnpj: String;
  cod_insc_estadual: String;
  des_email: String;
};
