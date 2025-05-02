
export type FormData = {
  nome_empresa: string;
  area_atuacao: string;
  interesse: string;
  nome_cliente: string;
  telefone_cliente: string;
  email_cliente: string;
  valor_implementacao: string;
  envia_audio: boolean;
  servidor_dedicado: boolean;
};

export type FormStep = 1 | 2 | 3;
