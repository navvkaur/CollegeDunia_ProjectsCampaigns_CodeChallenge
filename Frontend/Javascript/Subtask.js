
async function search(event){
    event.preventDefault();
    try{
        let campaign_name = document.getElementById('name').value 
        let res = await axios.get(`http://localhost:3000/mytask/landing?campaign_name=${campaign_name}`)
        if(res){
            document.getElementById('clickkk').innerHTML = ` <button type="button" class="btn btn-warning btn-lg ms-2"  value = ${res.data.campaign.id} onclick = "clicked(this)">Click Me!</button>`

        }
    }
    catch(err){
        alert(err)
    }
}
async function clicked(event){
   try
   {
    let id = event.value;
    console.log(event.value)
    let obj = {id}
    let response = await axios.post('http://localhost:3000/mytask/landing/clicked',obj);
    alert(`The Count is now updated to ${response.data.Count}`)
   }
   catch(err){
    alert(err)
}

}

