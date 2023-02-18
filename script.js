const express = require('express');
const path = require('path')
const dotenv=require('dotenv');
const cors = require('cors')
const sequelize = require('./Utils/database')
const project_table = require('./Models/project_table')
const campaign_table = require('./Models/Campaign_table')
const bodyParser = require('body-parser');


const app = express();
dotenv.config();
app.use(cors())
const projects_routes = require('./Routes/Project');
const Campaign_routes = require('./Routes/Campaigns');
const subtask_routes = require('./Routes/Subtask')

app.use(bodyParser.json({ extended: false}));

app.use(projects_routes);
app.use(Campaign_routes);
app.use(subtask_routes);
app.use((req,res)=>{
  res.sendFile(path.join(__dirname,`${req.url}`))
})


project_table.hasMany(campaign_table, {
    onDelete: "CASCADE",  
  });

campaign_table.belongsTo(project_table);

if (!process.env.PORT) {
    console.log(`Error to get ports`);
      process.exit(1);
   }


sequelize.sync().then((res)=>{
    app.listen(process.env.PORT,()=> {
      console.log(`Listening on port ${process.env.PORT}`);

  })
  })
  