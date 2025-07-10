function no_video(){
    const main=document.getElementById('videos-container');
    main.classList.remove('grid');
    main.innerHTML = `  <div class="flex flex-col items-center justify-center h-[350px] w-[100vw]">
                            <img src="images/Icon.png">
                            <p class="font-bold text-4xl mt-3 text-center">Oops!!<br>Sorry,There is no content here</p>
                        </div>
    `;
}
async function load_details(video_id){
    console.log(video_id);
    const res=await fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${video_id}`);
    const data=await res.json();
    console.log(data);
    showmodal(data);
}
function showmodal(data){
    console.log(data)
    document.getElementById('modal-content').innerHTML = `
                                                            <div class="flex flex-col items-center">
                                                                <img src="${data.video.thumbnail}" class="w-full">
                                                                <p class="mt-2">${data.video.description}</p>
                                                            </div>
    `;
    document.getElementById("custom_modal").showModal();
}
function card(thumbnail,profile_picture,title,profile_name,views,verified,date,id) {
    const div=document.getElementById('videos-container');
    div.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 m-5';
    const div1=document.createElement('div');
    if(verified=== true) {
        div1.innerHTML = `<div class="flex flex-col">
                            <div class="relative">
                                <img src="${thumbnail}" class="h-[200px] w-full rounded-xl">
                                ${date===0?"":`<span class="absolute right-2 bottom-4 bg-[black] text-white">${date}</span>`}
                            </div>
                            <div class="flex mt-3 gap-2">
                                <img src="${profile_picture}" class="w-[30px] h-[30px] rounded-full">
                                <p class="font-bold text-[rgb(23,23,23)]">${title}</p>
                            </div>
                            <div class="ml-[36px]">
                                <p class="flex items-center gap-2">${profile_name} <img src="images/verified.png" class="h-[10px] w-[10px]"></p>
                                <p>${views} views</p>
                            </div>
                            <button class="btn btn-error" onclick="load_details('${id}');">Details</button>
                        </div>
        `;
    }
    else {
        div1.innerHTML = `<div class="flex flex-col">
                            <div class="relative">
                                <img src="${thumbnail}" class="h-[200px] w-full rounded-xl">
                                ${date===0?"":`<span class="absolute right-2 bottom-4 bg-[black] text-white px-[3px]">${date}</span>`}
                            </div>
                            <div class="flex mt-3 gap-2">
                                <img src="${profile_picture}" class="w-[30px] h-[30px] rounded-full">
                                <p class="font-bold text-[rgb(23,23,23)]">${title}</p>
                            </div>
                            <div class="ml-[36px]">
                                <p class="flex items-center gap-2">${profile_name}</p>
                                <p>${views} views</p>
                            </div>
                            <button class="btn btn-error" onclick="load_details('${id}')">Details</button>
                        </div>
        `;
    }
    div.appendChild(div1);
}
function category1(video){
    let thumbnail=video.thumbnail;
    let profile_picture=video.authors[0].profile_picture;
    let title=video.title;
    let profile_name=video.authors[0].profile_name;
    let views=video.others.views;
    let verified=video.authors[0].verified;
    let date;
    let id=video.video_id;
    if(video.others.posted_date > 0) {
        date=inttohms(video.others.posted_date);
    }
    else{
        date=0;
    }
    card(thumbnail,profile_picture,title,profile_name,views,verified,date,id);
}
async function fetchCategories() {
    const res=await fetch('https://openapi.programming-hero.com/api/phero-tube/categories');
    const data = await res.json();
    const main= document.getElementById('videos-container');
    const div=document.getElementById('category');
    for (let category of data.categories){
        const button = document.createElement('button');
        button.id=category.category;
        button.className = 'btn px-5 py-2 bg-[#d9d9d9] rounded-md mx-2 hover:text-white hover:bg-[rgb(255,31,61)]';
        button.textContent = category.category;
        if (category.category === 'Music') {
            button.addEventListener('click',async function(){
                const res=await fetch('https://openapi.programming-hero.com/api/phero-tube/videos');
                const data=await res.json();
                console.log(data);
                main.innerHTML = '';
                let i=0;
                for(let video of data.videos) {
                    console.log(video.category_id)
                    if(video.category_id===category.category_id){
                        category1(video);
                        i++;
                    }
                }
                if(i===0){
                    no_video();
                }
            });
        }
        else if (category.category === 'Comedy') {
            button.addEventListener('click',async function(){
                const res=await fetch('https://openapi.programming-hero.com/api/phero-tube/videos');
                const data=await res.json();
                console.log(data);
                main.innerHTML = '';
                let i=0;
                for(let video of data.videos) {
                    console.log(video.category_id)
                    if(video.category_id===category.category_id){
                        category1(video);
                        i++;
                    }
                }
                if(i===0){
                    no_video();
                }
            });
        }
        else if (category.category === 'Drawing') {
            button.addEventListener('click',async function(){
                const res=await fetch('https://openapi.programming-hero.com/api/phero-tube/videos');
                const data=await res.json();
                console.log(data);
                main.innerHTML = '';
                let i=0;
                for(let video of data.videos) {
                    console.log(video.category_id)
                    if(video.category_id===category.category_id){
                        i++;
                        category1(video);
                    }
                }
                if(i===0){
                    no_video();
                }
            });
        }
        div.appendChild(button);
    }
}
fetchCategories();
function inttohms(num) {
    let s="";
    year = Math.floor(num / 31536000);
    if(year > 0){
        s += `${year}years `;
    }
    let mnth = Math.floor((num % 31536000) / 2592000);
    if(mnth > 0){
        s += `${mnth}months `;
    }
    let day= Math.floor((num % 2592000) / 86400);
    if(day > 0){
        s += `${day}days `;
    }
    let hours = Math.floor((num%86400) / 3600);
    if(hours > 0){
        s += `${hours}hrs `;
    }
    let minutes = Math.floor((num % 3600) / 60);
    if(minutes > 0){
        s += `${minutes}mins `;
    }
    return s+ "ago";
}
document.getElementById('all').addEventListener('click',async function() {
    const res=await fetch('https://openapi.programming-hero.com/api/phero-tube/videos');
    const data=await res.json();
    const main= document.getElementById('videos-container');
    main.innerHTML = '';
    console.log(data);
    let i=0;
    for(let video of data.videos) {
        let thumbnail=video.thumbnail;
        let profile_picture=video.authors[0].profile_picture;
        let title=video.title;
        let profile_name=video.authors[0].profile_name;
        let views=video.others.views;
        let verified=video.authors[0].verified;
        let id=video.video_id;
        console.log(id);
        let date;
        if(video.others.posted_date > 0) {
            date=inttohms(video.others.posted_date);
        }
        else{
            date=0;
        }
        card(thumbnail,profile_picture,title,profile_name,views,verified,date,id);
        i++;
    }
    if(i===0){
        no_video();
    }
})

document.getElementById('search').addEventListener('keyup',async function(e) {
    let srch= e.target.value.toLowerCase();
    const res=await fetch('https://openapi.programming-hero.com/api/phero-tube/videos?title='+srch);
    const data=await res.json();
    console.log(srch);
    if(srch === '') {
        const main=document.getElementById('videos-container');
        main.innerHTML = '';
        return;
    }
    main=document.getElementById('videos-container');
    main.innerHTML = '';
    let i=0;
    for(let video of data.videos) {
        category1(video);
        i++;
    }
    if(i===0){
        no_video();
    }
})