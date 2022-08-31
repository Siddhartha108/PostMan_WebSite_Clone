console.log("Postman");

function getElementFromString(string){
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}


// nullmber of parameters
let addParamsCount = 0;



let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';

// Ager "Costom perameter" ko click kre, json hide ho jeya
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', ()=>{
   document.getElementById('requestJsonBox').style.display = 'none';
   document.getElementById('parametersBox').style.display = 'block';
});

// Ager "Json" ko click kre, Costom perameter hide ho jeya
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', ()=>{
   document.getElementById('parametersBox').style.display = 'none';
   document.getElementById('requestJsonBox').style.display = 'block';
});

// + button pr click krne pr or parameter add ho
let addParam = document.getElementById('addParam');
addParam.addEventListener('click', ()=>{
    let params = document.getElementById('params');
    let string = `<div class="row my-2">
    <label for="url" class="col-sm-2 col-form-label">Parameter ${addParamsCount + 2}</label>
     <div class="col-md-4">
        <input type="text" class="form-control" id="parameterKey${addParamsCount + 2}" placeholder="Enter parameter ${addParamsCount + 2} Key">
     </div>
    <div class="col-md-4">
        <input type="text" class="form-control" id="parameterValue${addParamsCount + 2}" placeholder="Enter parameter ${addParamsCount + 2} Value">
    </div>
    <button class="btn btn-primary deleteParam" id="addParam" style="width: 40px; position: relative;
    right: 10px;">-</button>
 </div>`;
let paramElement = getElementFromString(string);
params.appendChild(paramElement);

// - button pr click krne se delete ho
let deleteParam = document.getElementsByClassName('deleteParam');
for (item of deleteParam){
    item.addEventListener('click', (e)=>{
      e.target.parentElement.remove();
    })
}
 addParamsCount ++;
})





// submit button clickkrne  pr kya hoga
let submit = document.getElementById('submit');
submit.addEventListener('click', ()=>{
    document.getElementById('responceText').value = "plese wait..."

    // url se data fetch karna
    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contantType = document.querySelector("input[name='contantType']:checked").value;

    

    if (contantType == 'params'){
        data = {};
        for (i=0;i<addParamsCount+1;i++){
            if(document.getElementById('parameterKey' + (i+1))!= undefined){
            let key = document.getElementById('parameterKey' + (i+1)).value;
            let value = document.getElementById('parameterValue' + (i+1)).value;
            data[key]= value;
            }
        }
        data = JSON.stringify(data);
    }
    else{
        data = document.getElementById('requestJsonText').value;
    }

//    **All console**
    console.log('url is -', url);
    console.log('requestType is -', requestType);
    console.log('contantType is -', contantType);
    console.log('data is -', data);


    // request type is post
    if(requestType == 'GET'){
    fetch(url,{
        method:'GET',
    })
    .then((response)=> response.text())
    .then((text)=>{
        document.getElementById('responceText').value = text;
    });
    }
    else{
        fetch(url,{
            method:'POST',
            body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
        })
        .then((response)=> response.text())
        .then((text)=>{
            document.getElementById('responceText').value = text;
        });

    }
})
