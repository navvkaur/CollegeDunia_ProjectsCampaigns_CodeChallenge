window.addEventListener('DOMContentLoaded', (event) => {
    getcampaign()
})


let flag = false;
function addcampaign(event){
    event.preventDefault();
    let id = document.getElementById('id').value;
    let projectId = document.getElementById('project_id').value ;
    let campaign_name = document.getElementById('campaignName').value ;
    let opens  = document.getElementById('opens').value || 0;
    let clicks  = document.getElementById('clicks').value  || 0;
    let status  = document.getElementById('status').value || 1;
    let details={
        id,
        projectId,campaign_name,clicks,opens,status
    };
    
    postRequest = async () => {
        try {
            if(flag==false){
            const response = await axios.post("http://localhost:3000/addcampaign_detail", {campaign_name:campaign_name,opens:opens,clicks:clicks,status:status,projectId:projectId});
            alert(response.data.message);
            window.reload();
           
            return;
            }
            else{
                
                    const response = await axios.post(`http://localhost:3000/editcampaign_detail/${details.id}`,details);
                    flag = false;
                    alert(response.data.message)
                    location.reload();
               }
            }
catch (err) {
   alert("Something went wrong !") 
    console.log(err);
}
}
postRequest();
}

function showNewProjectonScreen(Details){

    document.getElementById('table').innerHTML += `
        
    <tr>
    <th scope="col">${Details.id}</th>
    <th scope="col">${Details.campaign_name}</th>
    <th scope="col"> <button onclick = editcampaign('${ Details.id}','${ Details.projectId}','${ Details.campaign_name}','${ Details.opens}','${ Details.clicks}','${ Details.status}')   class="btn btn-dark"> 📝 </button>  </th>
    <th scope="col"> <button onclick = deletecampaign('${Details.id}') class="btn btn-dark"> 🗑 </button>   </th>
   `

}
   


  async function getcampaign(){
    try
    {
        const response = await axios.get("http://localhost:3000/getcampaign_detail");
        response.data.details.forEach(element => {
            showNewProjectonScreen(element)
        });
    }
    catch (err) {
        alert("Something went wrong !") 
        console.log(err);
    }
   }

   deletecampaign = async (id) => {
    try {
       
        const res = await axios.delete(`http://localhost:3000/deletecampaign_detail/${id}`);
        alert(res.data.message)
        location.reload();
    } catch (err) {

        alert("Something went wrong !") 
        console.log(err);
    }
}

function editcampaign(id,project_id,campaign_name,opens,clicks,status) {
    flag = true;
    let v = 0;
    if(status) v = 1;
    document.getElementById('id').value  = id
     document.getElementById('project_id').value  = project_id
     document.getElementById('campaignName').value = campaign_name
     document.getElementById('opens').value =opens
     document.getElementById('clicks').value = clicks
    
     document.getElementById('status').value= v

    }
