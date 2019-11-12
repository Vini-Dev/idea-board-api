class IdeaController {

    async store(req, res) {
        return res.status(200).json('store')
    }

    async index(req, res) {
        return res.status(200).json('index')
    }

    async list(req, res) {
        return res.status(200).json('list')
    }

    async update(req, res) {
        return res.status(200).json('update')
    }

    async delete(req, res) {
        return res.status(200).json('delete')
    }

}

export default new IdeaController;
