const { ConfigServiceOrder } = require('../db.js');

const postConfigService = async (req,res) => {
    const newConfigService = { 
        document,
        title,
        requester,
        vobo,
        responsable,
    } = req.body;

    try {
        const [configservice, created] = await ConfigServiceOrder.create( newConfigService);
        return res.status(200).send('successfull:');
    } catch (error) {
        return res.send(error.message);
    }
}

const getConfigService = async(req,res)=> {
    const doc = req.params.doc;
    try {
        const configservice = await ConfigServiceOrder.findByPk( doc ); 
        return res.status(200).send(configservice);
    } catch (error) {
        return res.send(error.message);
    }
}
const getAllConfigService = async(req,res)=> {
    const doc = req.params.doc;
    try {
        const configservice = await ConfigServiceOrder.findAll(); 
        return res.status(200).send(configservice);
    } catch (error) {
        return res.send(error.message);
    }
}

const deleteConfigService = async(req,res)=> {
    const doc = req.params.doc;
    try {
        const response = ConfigServiceOrder.destroy({ where: { document:doc } });
        return res.status(200).send('ConfigService Deleted');
    } catch (error) {
        return res.send(error.message);
    }
}

const putConfigService = async(req, res)=> {
    const newConfigService = { 
        docToFind,
        document,
        title,
        requester,
        vobo,
        responsable,
    } = req.body;
    
    try {
        const response = await ConfigServiceOrder.update( 
            {
                title       : newConfigService.title,
                requester   : newConfigService.requester,
                vobo        : newConfigService.vobo,
                responsable : newConfigService.responsable,
            }, 
            {
                where: { document: docToFind }
            }
        )
        return res.status(200).send('Update successfull');
    } catch (error) {
        return res.send(error.message);
    }
}


module.exports = {
    postConfigService, 
    getConfigService,
    getAllConfigService,
    deleteConfigService,
    putConfigService,
}