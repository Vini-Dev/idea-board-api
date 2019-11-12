import Joi from '@hapi/joi';
import Idea from '../Model/Idea';
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
      return res.status(403).json({ data: [], error: validate.error });

    // Cria o registro no banco
    const response = await Idea.create({
      ...req.body,
      created_at: DateHelper.now(),
      updated_at: DateHelper.now(),
    });

    return res.status(200).json({ data: response, error: [] });
  }

  async index(req, res) {
    const { id } = req.params;
    const response = await Idea.findById({ _id: id });

    return res.status(200).json({ method: 'index', response });
  }

  async list(req, res) {
    const response = await Idea.find({}).sort('title');

    return res.status(200).json({ method: 'list', response });
  }

  async update(req, res) {
    const { id } = req.body;
    const response = await Idea.findOneAndUpdate(
      { _id: id },
      { $set: { ...req.body } },
      { returnOriginal: false }
    );

    return res.status(200).json({ method: 'update', response });
  }

  async delete(req, res) {
    const { id } = req.params;
    const response = await Idea.deleteOne({ _id: id });

    return res.status(200).json({ method: 'delete', response });
  }
}

export default new IdeaController();
