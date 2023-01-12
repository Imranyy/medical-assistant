
//first text
document.querySelector('.small-first-text').innerText='Our goal is ensuring healthy living and protect sick people from developing diseases. Your feedback will help us improve.'

//clear screen
document.querySelector('.clear-screen').addEventListener('click',()=>{
    document.querySelector('.text-response').innerHTML=''
    document.querySelector('.small-first-text').innerText='Our goal is ensuring healthy living and protect sick people from developing diseases. Your feedback will help us improve.'
})
//sending request to api
const playgroundSubmitBtn=document.querySelector('.playground-submit-btn');
playgroundSubmitBtn.innerHTML='<i class="fa fa-send"></i>'
let req='';
const sendRequest=document.querySelector('.handle-submit');
sendRequest.addEventListener('submit',async(e)=>{
    const request=sendRequest.request.value
    e.preventDefault();
    try {
        document.querySelector('.small-first-text').innerText=''
        playgroundSubmitBtn.innerHTML='<i class="fa fa-planet"></i>';
        playgroundSubmitBtn.disabled=true;
        const url='/api';
        const response=await fetch(url,{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({
                prompt:request
            })
        })
        playgroundSubmitBtn.innerHTML='<i class="fa fa-send"></i>';
        playgroundSubmitBtn.disabled=false;
        sendRequest.reset()
        const parseRes=await response.json();
        let i=``
        req=request
        // display user question
        const textResponse=document.querySelector('.text-response');
        if(parseRes.error){
            i=`
            <div class='text-error'>
                <p style="color:red;">Error: ${parseRes.msg}</p>
            </div>
            `
            textResponse.innerHTML+=i
            setTimeout(()=>{
                textResponse.innerHTML=``
            },1500)
        }else{
            // let data=JSON.parse(parseRes.ans);
            let data=parseRes.ans;
            i=`
            <p class="req"> ${req}  <small> <i>AI's response: "${parseRes.msg}"</i></small></p>
            <div class='text' title="${req} 's response">
                ${data.organic.map(item=>(
                    `
                    <div key=${item.position}>
                        <p>${item.title}</p>
                        <p>${item.snippet}</p>
                        <a href=${item.link} target='_blank' rel='noreferrer'>View more...</a><br/>
                        <div style='display:flex;'>
                        ${item.sitelinks&&item.sitelinks.map(res=>(
                            `
                            <div key=${res.title}>
                                <a href=${res.link} target='_blank' rel='noreferrer'>${res.title.slice(0,8)}.. </a>
                            </div>
                            `
                        ))}
                        </div>
                        <br/>
                    </div>
                    `
                ))}
                <h2>People Also Ask</h2>
                ${data.peopleAlsoAsk.map(res=>(
                    `
                    <div>
                        <p>${res.question}</p>
                        <p>${res.snippet}</p>
                        <a href=${res.link} target='_blank' rel='noreferrer'>${res.title.slice(0,10)}</a>
                        <br/>
                    </div>
                    `
                ))}
                <div class="down"></div>
            </div>
            `
            textResponse.innerHTML+=i
            document.querySelector('.down').scrollIntoView()
        }
    } catch (error) {
        document.querySelector('.small-first-text').innerText='Our goal is ensuring healthy living and protect sick people from developing diseases. Your feedback will help us improve.'
        sendRequest.reset();
        playgroundSubmitBtn.innerHTML='<i class="fa fa-send"></i>';
        playgroundSubmitBtn.disabled=false;
        // display error message
        const textResponse=document.querySelector('.text-response');
        let i=`
        <div class='text-error'>
            <p style="color:red;">Error: No Internet</p>
        </div>
        `
        textResponse.innerHTML=i
        setTimeout(()=>{
            textResponse.innerHTML=``
        },1500)
    }
})