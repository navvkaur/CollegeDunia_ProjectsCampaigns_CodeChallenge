const Campaign_table = require('../Models/Campaign_table')
const sequelize = require('../Utils/database');
const Project_table = require('../Models/project_table')

exports.subpage = async (req,res,next)=>{
    try
    {
        let {campaign_name} = req.query
        let details = await Campaign_table.findAll({where:{campaign_name:campaign_name}})
       let detail = details[0].dataValues;
        if(!detail)
        {
           res.send({"statusCode": 404, "message": "Resource not found" })
        }
        else
        {
            res.status(200).json({Success:true,campaign:detail})
        }
    }
    catch(err)
   {
        console.log(err);
        res.status(500).json({error : err})
   }
}


exports.clicked = async (req,res,next)=>{
    try
    { 
      let campaign_id = req.body.id;
       let detail = await Campaign_table.findByPk(campaign_id);
       detail.clicks += 1;
       
       await Campaign_table.update({clicks:detail.clicks},{where:{id:detail.id}})
       res.status(200).json({Success:true, Count : detail.clicks});
    }
    catch(err)
   {
        console.log(err);
        res.status(500).json({error : err})
   }
}


exports.project_stats = async (req,res,next)=>{
    try
    { 
      let items_per_page = 5;
      let page = Number(req.query.page);
       let count = await Project_table.count()
      let detail = await Project_table.findAll(
      {
          attributes:['id','project_name',
          [sequelize.fn('COUNT',sequelize.col('campaign_name')),'TotalCampaigns'],
          [sequelize.fn('Sum',sequelize.col('target_opens')),'TotalOpensRequired'],
          [sequelize.fn('Sum',sequelize.col('opens')),'TotalOpensAchieved'],
          [sequelize.fn('Sum',sequelize.col('target_clicks')),'TotalclicksRequired'],
          [sequelize.fn('Sum',sequelize.col('clicks')),'TotalClicksAchieved'],
          [sequelize.fn('Sum',sequelize.col('open_cost')),'OpenCost'],
          [sequelize.fn('Sum',sequelize.col('opens')),'TotalOpenCost'],
          [sequelize.fn('Sum',sequelize.col('click_cost')),'ClickCost'],
          [sequelize.fn('Sum',sequelize.col('clicks')),'TotalClickCost'],
          'status'
      ]
      ,
          include : [
              {
                  model: Campaign_table,
                  attributes:[],
                  
              }
          ],

          group:['project.id'],
          offset:((page-1)*items_per_page),
          limit :items_per_page,
          subQuery:false

          
      }
  )
       
        res.status(200).json({details:detail,currentPage:page,      
         hasnextPage:items_per_page*page<count,
         nextPage:page+1,
         haspreviousPage:page>1,
         previousPage:page-1,
         lastPage:Math.ceil(count/items_per_page)});
    }
    catch(err)
   {
        console.log(err);
        res.status(500).json({error : err})
   }
}