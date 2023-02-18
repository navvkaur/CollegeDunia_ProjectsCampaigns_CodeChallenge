const Campaign_table = require('../Models/Campaign_table')

exports.addCampaignDetail = async(req,res,next)=>{
 try  
 {  
     if(req.body.projectId)
    {
       const detail = await Campaign_table.create(req.body);
       res.status(200).json({Success : true,message:'Detail Added' });
    }
    else
       throw new Error('Project Id does not exists!');
 }
catch(err)
{
    console.log(err);
    res.status(500).json({error : err})
}
}  



exports.getCampaignDetail = async (req,res,next)=>{
    try
    {
        const detail = await Campaign_table.findAll();
        res.status(200).json({ details:detail});
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({error : err})
    }
}

exports.deleteCampaignDetail= async (req,res,next)=>{
    try
    {
        const id = req.params.id;
       const detail = await Campaign_table.findByPk(id)
       if(!detail)
       {
             throw new Error('This Project does not exist.');
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

exports.editCampaignDetail= async (req,res,next)=>{
    try
    {
        const id = req.params.id;
        let detail = await Campaign_table.update(req.body,{where:{id:id}})
        return res.status(201).json({Success : true,message:'Detail Editted'}); 
    }
    catch(err){
        console.log(err);
        res.status(500).json({error : err})
    }
}