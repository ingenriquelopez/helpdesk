const { Task } = require('../db.js');

const putStatus = async (req,res) => {
    const { 
            number,
            statusTask,
            dateReview,
            notes,
            dateRejected,
            reasonRejected,
            solution,
            dateSolution,
            orderService,
            orderMaterial,
     } = req.body;
     
    try {
        const response = await Task.update(
            {
                statusTask,
                dateReview,
                notes,
                dateRejected,
                reasonRejected,
                solution,
                dateSolution,
                orderService,
                orderMaterial,
            }, { where: {number} }
            ); 
        return res.status(200).send(response);
        
    } catch (error) {
        console.log("ERROR: ",error.message)
        return res.send(error.message);
    }
}

const getStatus = async(req,res)=> {
    const p_number = req.params.number;
    try {
        const response = await Task.findByPk( p_number );
        return res.status(200).send(response);
    } catch (error) {
        return res.send(error.message);
    }
}

module.exports = {
    putStatus, 
    getStatus,
}