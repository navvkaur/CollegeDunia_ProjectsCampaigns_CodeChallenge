window.addEventListener('DOMContentLoaded', (event) => {
    getProjects()
})
let flag = false;
function addProject(event){
    event.preventDefault();
    let id = document.getElementById('id').value;
    let project_name = document.getElementById('Project_name').value ;
    let open_cost = document.getElementById('OpenCosts').value || 5 ;
    let target_opens  = document.getElementById('TargetOpens').value || 100;
    let click_cost  = document.getElementById('Clicks').value || 10;
    let target_clicks  = document.getElementById('TargetClicks').value  || 50;
    let status  = document.getElementById('status').value || 1;
    let details={
        id,
       project_name,open_cost,click_cost,target_clicks,target_opens,status
    };
    
    postRequest = async () => {
        try {
            if(flag==false){
            const response = await axios.post("http://localhost:3000/addproject_detail", {project_name:project_name,open_cost:open_cost,click_cost:click_cost,target_clicks:target_clicks,target_opens:target_opens, status:status});
            alert(response.data.message);
            window.reload();
           
            return;
            }
            else{
                
                    const response = await axios.post(`http://localhost:3000/editproject_detail/${details.id}`,details);
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

function showNewProjectonScreen(details){
    document.getElementById('table').innerHTML += `
        
        <tr>
        <th scope="col">${details.id}</th>
        <th scope="col">${details.project_name}</th>
        <th scope="col"> <button onclick = editUser('${ details.id}','${ details.project_name}','${ details.open_cost}','${ details.target_opens}','${ details.click_cost}','${ details.target_clicks}','${ details.status}')   class="btn btn-dark"> 📝 </button> </th>
        <th scope="col"> <button onclick = deleteUserfromapi('${details.id}') class="btn btn-dark"> 🗑 </button>  </th>
       `
   
   }


  async function getProjects(){
    try
    {
        const response = await axios.get("http://localhost:3000/getproject_detail");
        response.data.details.forEach(element => {
            showNewProjectonScreen(element)
        });
    }
    catch (err) {
        alert("Something went wrong !") 
        console.log(err);
    }
   }

   deleteUserfromapi = async (id) => {
    try {
       
        const res = await axios.delete(`http://localhost:3000/deleteproject_detail/${id}`);
        alert(res.data.message)
        location.reload();
    } catch (err) {

        alert("Something went wrong !") 
        console.log(err);
    }
}

function editUser(id,project_name,open_cost,target_opens,click_cost,target_clicks,status) {
    flag = true;
    let v = 0;
    if(status) v = 1;
    document.getElementById('id').value  = id
     document.getElementById('Project_name').value  = project_name 
     document.getElementById('OpenCosts').value = open_cost 
     document.getElementById('TargetOpens').value =target_opens
     document.getElementById('Clicks').value = click_cost 
     document.getElementById('TargetClicks').value =target_clicks 
     document.getElementById('status').value= v

    }
