const postData = async (url = '', data = {}) => {

const request = await fetch(url,{
method:'POST',
body:JSON.stringify(data),
headers:{'Content-Type':'application/json'},
mode: 'cors',
 credentials: 'same-origin',

}) 

return request.json()

}

// مينفعش أعتمد على الكود بتاع فايربيز عشان مينفعش الدومين يبقى فيه أندرسكور

postData('https://ibn-samy-short-links.firebaseio.com/links.json',{'ffe':{domain:'ibnsant.com'}}).then((res)=>{console.log(res)}).catch(err=>console.log(err))


const getData = async (url = '') => {

    const request = await fetch(url,{mode:'cors',method:'GET'})

    return request.json()

}


getData('https://ibn-samy-short-links.firebaseio.com/links.json?orderBy="$key"&equalTo="-ML5zs-NNARGHnLRbzne"&print=pretty')
.then((data)=>{
    console.log(data['-ML5zs-NNARGHnLRbzne'].domain)
return(data['-ML5zs-NNARGHnLRbzne'].domain)
})
.then(data=>{
    window.open(data, '_blank');
})
.catch(data=>console.log(data));



const link = document.querySelector('#link');
const result = document.querySelector('#result'); 

function generateShortLink () {

    const domain = link.value;
    console.log(domain);
    postData('https://ibn-samy-short-links.firebaseio.com/links.json',{domain:domain})
    .then((res)=>{
        console.log(res)
    return(res.name)
    })
    .then(
(slug)=>
        {
            result.innerText=slug;
        }
    )
    .catch(err=>console.log(err))
}