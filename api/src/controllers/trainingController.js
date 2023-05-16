const { Training} = require ('../db.js');

const postTraining = async(req,res) => {

    const newTraining = {
        training,
        speaker,
        level,
        dateTraining,
        mode,
    } = req.body;

    try {
        const training =  await Training.create( newTraining )
        return res.status(200).send('successfull:');
    } catch (error) {
        console.log(error.message)
        return res.send(error.message);
    }
}

const deleteTraining = async(req, res)=> {
    const id = parseInt(req.params.id);

    try {
        const training = await Training.destroy(
            {where : {id:id}, force:true}
        )
        return res.status(200).send('TrainingDeleted');
    } catch (error) {
        return res.send(error.message);
    }
}

const getTraining = async(req, res)=> {

}

const getTrainings = async(req, res)=> {
    try {
        const trainings = await Training.findAll();
        return res.status(200).send(trainings);
    } catch (error) {
        return res.send(error.message);
    }
}

const putTraining = async(req, res)=> {
    const newTraining = {
        id,
        training,
        speaker,
        level,
        dateTraining,
        mode,
    } = req.body;
    
    console.log(newTraining);

    try {
        const training = await Training.update (
           newTraining,{ where: {id}}
        );
        return res.status(200).send("Update-Successful");

    } catch (error) {
        console.log(error.message);
        return res.send(error.message);
    }
}

module.exports = {
    postTraining,
    putTraining,
    deleteTraining,
    getTraining,
    getTrainings,
}