let Pagination = document.getElementById('btn-group')

async function Product_stats()
{
   
    try
    {   let params = new URLSearchParams(window.location.search);
        page = params.get('page');
        if(page == null){
            page = 1;
        }
          await axios.get(`http://localhost:3000/mytask/projectstats?page=${page}`).then(({
            data:{details, ...pagedata}}) =>{
                console.log(details)
                listProjects(details)
                showPagination(pagedata)
            }).catch(err=>{
            alert(err)
            })      
    }
    catch(err)
    {
        alert(err)
    }


}
window.addEventListener('DOMContentLoaded',(event)=>{
    Product_stats();
})

function listProjects(Projects)
{
    for(var i = 0;i<Projects.length;i++){
          DisplayTable(Projects[i]);
    }

}

function showPagination({
    count,currentPage,nextPage,hasnextPage,previousPage,haspreviousPage,lastPage
 }){
     
   for(let i = 1;i<=lastPage;i++){
    Pagination.innerHTML += `<li class="page-item"><a class="page-link" href="?page=${i}">${i}</a></li>`
   }

 }


 function DisplayTable(details){
    try
    {
        document.getElementById('table').innerHTML += `
        
        <tr>
        <th scope="col">${details.id}</th>
        <th scope="col">${details.project_name}</th>
        <th scope="col">${details.TotalCampaigns}</th>
        <th scope="col">${details.TotalOpensRequired}</th>
        <th scope="col">${details.TotalOpensAchieved || 0}</th>
        <th scope="col">${details.TotalclicksRequired}</th>
        <th scope="col">${details.TotalClicksAchieved || 0}</th>
        <th scope="col">${details.OpenCost}</th>
        <th scope="col">${details.TotalOpenCost || 0}</th>
        <th scope="col">${details.ClickCost}</th>
        <th scope="col">${details.TotalClickCost || 0}</th>
        <th scope="col">${details.status}</th>`
         
        
    }
    catch(err)
    {
     alert(err);
    }
 }
