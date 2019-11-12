import Joi from '@hapi/joi';
import Idea from '../Model/Idea';
import TranslateErrorsHelper from '../Utils/TranslateErrorsHelper';
import DateHelper from '../Utils/DateHelper';

class IdeaController {
  async store(req, res) {
    // Define os dados a serem recebidos e suas propriedades (tamanho, obrigatório...)
    const schema = Joi.object({
      title: Joi.string()
        .required()
        .min(1)
        .label('titulo'),
      text: Joi.string()
        .required()
        .min(1)
        .label('titulo'),
    });

    const validate = schema.validate(req.body, { abortEarly: false });

    // Verifica se os dados recebidos estão ok
    if (validate.error)
      return res.status(403).json({
        data: [],
        error: TranslateErrorsHelper.translate(validate.error),
      });

    // Cria o registro no banco
    const response = await Idea.create({
      ...req.body,
      created_at: DateHelper.now(),
      updated_at: DateHelper.now(),
    });

    return res.status(200).json({ data: response || [], error: [] });
  }

  async index(req, res) {
    // Define os dados a serem recebidos e suas propriedades (tamanho, obrigatório...)
    const schema = Joi.object({
      id: Joi.string()
        .required()
        .label('id'),
    });

    const validate = schema.validate(req.params, { abortEarly: false });

    // Verifica se os dados recebidos estão ok
    if (validate.error)
      return res.status(403).json({
        data: [],
        error: TranslateErrorsHelper.translate(validate.error),
      });

    const { id } = req.params;
    const response = await Idea.findById({ _id: id });

    return res.status(200).json({ data: response || [], error: [] });
  }

  async list(req, res) {
    // Define os dados a serem recebidos e suas propriedades (tamanho, obrigatório...)
    const schema = Joi.object({
      sort: Joi.string()
        .empty('')
        .label('ordenação'),
      order: Joi.string()
        .empty('')
        .label('ordenação'),
    });

    const validate = schema.validate(req.query, { abortEarly: false });

    // Verifica se os dados recebidos estão ok
    if (validate.error)
      return res.status(403).json({
        data: [],
        error: TranslateErrorsHelper.translate(validate.error),
      });

    // Tipo da ordenação e dado a ser considerado
    const { sort, order } = req.query;

    const sortOptions = [
      {
        param: 'updated',
        field: 'updated_at',
      },
      {
        param: 'title',
        field: 'title',
      },
      {
        param: 'text',
        field: 'text',
      },
    ];

    // Verifica se o parametro está dentro dos permitidos
    const sortParam = sortOptions.filter(so => so.param === sort);
    const sortedBy = sortParam.length !== 0 ? sortParam[0].param : 'updated_at';

    // Padrão de retorno é por data de atualização
    const response = await Idea.find({}).sort({
      [sortedBy]: order === 'desc' ? 'desc' : 'asc',
    });

    return res.status(200).json({ data: [...(response || [])], error: [] });
  }

  async update(req, res) {
    // Define os dados a serem recebidos e suas propriedades (tamanho, obrigatório...)
    const schema = Joi.object({
      id: Joi.string()
        .required()
        .length(24)
        .label('id'),
      title: Joi.string()
        .required()
        .min(1)
        .label('titulo'),
      text: Joi.string()
        .required()
        .min(1)
        .label('titulo'),
    });

    const validate = schema.validate(req.body, { abortEarly: false });

    // Verifica se os dados recebidos estão ok
    if (validate.error)
      return res.status(403).json({
        data: [],
        error: TranslateErrorsHelper.translate(validate.error),
      });

    const { id, title, text } = req.body;

    const params = {
      title,
      text,
      updated_at: DateHelper.now(),
    };

    const response = await Idea.findOneAndUpdate(
      { _id: id },
      {
        $set: { ...params },
      },
      { returnOriginal: false, useFindAndModify: false }
    ).catch(err => err);

    return res.status(200).json({ data: [response || []], error: [] });
  }

  async delete(req, res) {
    // Define os dados a serem recebidos e suas propriedades (tamanho, obrigatório...)
    const schema = Joi.object({
      id: Joi.string()
        .required()
        .length(24)
        .label('id'),
    });

    const validate = schema.validate(req.params, { abortEarly: false });

    // Verifica se os dados recebidos estão ok
    if (validate.error)
      return res.status(403).json({
        data: [],
        error: TranslateErrorsHelper.translate(validate.error),
      });

    const { id } = req.params;
    const response = await Idea.deleteOne({ _id: id }).catch(err => err);

    return res.status(200).json({ data: response, error: [] });
  }
}

export default new IdeaController();
