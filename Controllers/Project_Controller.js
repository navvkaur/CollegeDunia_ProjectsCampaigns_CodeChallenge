const Project_table = require('../Models/project_table')

exports.addProjectDetail = async(req,res,next)=>{
 try
 {
    const detail = await Project_table.create(req.body);
    res.status(200).json({Success : true,message:'Detail Added' });
 }
catch(err)
{
    console.log(err);
    res.status(500).json({error : err})
}
}  



exports.getProjectDetail = async (req,res,next)=>{
    try
    {
        const detail = await Project_table.findAll();
        res.status(200).json({ details:detail});
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error : err})
    }
}

exports.deleteProjectDetail= async (req,res,next)=>{
    try
    {
       const id = req.params.id;
       const detail = await Project_table.findByPk(id)
       if(!detail)
       {
             throw new Error('This user does not exist.');
       }
       await detail.destroy({where: {id:id}});
       res.status(200).json({Success : true,message:'Detail Deleted'});
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error : err})
    }
}

exports.editProjectDetail= async (req,res,next)=>{
    try
    {
        const id = req.params.id;
        console.log(id);
        let detail = await Project_table.update(req.body,{where:{id:id}})
        return res.status(201).json({Success : true,message:'Detail Editted'}); 
    }
    catch(err){
        console.log(err);
        res.status(500).json({error : err})
    }
}