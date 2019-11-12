const dictionary = [
  {
    en: 'is not allowed to be empty',
    pt: 'não pode ser vazio',
  },
  {
    en: 'must be larger than or equal to',
    pt: 'deve ser maior ou igual a',
  },
  {
    en: 'must be less than or equal to',
    pt: 'deve ser menor ou igual a',
  },
  {
    en: 'is not allowed',
    pt: 'não está habilidado',
  },
  {
    en: 'length must be',
    pt: 'tem a quantidade de caracteres é inválida',
  },
];

const translate = errors => {
  return errors.details.map(detail => {
    const message = detail.message.replace(/[\\"]/g, '');

    const result = dictionary.filter(l => message.indexOf(l.en) > -1);

    if (result.length !== 0) {
      const { en, pt } = result[0];

      return `O parametro ${message.replace(en, pt)}`;
    }

    return message;
  });
};

export default { translate };
