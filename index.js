const loadAllPosts = async (category) =>{

    const response = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts${category ? `?category=${category}` : ''}`);
    const data = await response.json();
    displayAllPosts(data.posts);
}


const displayAllPosts = (posts) =>{ 
    const postContainer = document.getElementById("post-container");
    postContainer.innerHTML = '';
    posts.forEach(post => {
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="bg-[#f3f3f5] px-6 md:px-12 py-5 md:py-8 rounded-3xl md:grid grid-cols-12">
            <div class="indicator">
                <span class="indicator-item badge ${post.isActive ? "bg-green-600" : "bg-red-500"}"></span>
                <div class="avatar">
                    <div class="w-24" rounded-xl>
                        <img src="${post.image}" alt="image"/>
                    </div>
                </div>
            </div>
            <div class="col-span-2">
                <img  class=" rounded-md" src="images/jdkie" alt="">
            </div>
            <div class="col-span-10">
                <div class="flex gap-3 mb-4">
                    <p>${post.category}</p>
                    <p>Author: ${post?.author?.name}</p>
                </div>
                <h2 class="text-3xl font-semibold mb-4">${post.title}</h2>
                <p class="pb-4 border-dashed border-gray-400 border-b-2 mb-6">${post.description}</p>
                <div class="md:flex  gap-2">
                    <div class="flex gap-4 items-center">
                        <i class="fa-regular fa-comment"></i>
                        <p id="comment-count">${post?.comment_count}</p>
                    </div>
                    <div class="flex gap-4 items-center">
                        <i class="fa-regular fa-eye"></i>
                        <p id="view-count">${post?.view_count}</p>
                    </div>
                    <div class="flex gap-4 items-center">
                        <i class="fa-regular fa-clock"></i>
                        <p id="time-count">${post.posted_time} Min</p>
                    </div>
                    <div class="opacity-100">
                        <button id="addToList" onclick="markAsRead('${post?.description}', ${post?.view_count})" data-post='${JSON.stringify(post)}' class="addToList btn btn-sm cursor-pointer btn-circle bg-green-500">
                            <i class="fa-solid fa-envelope-open text-white"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        `;

        postContainer.appendChild(div);
    });
}

loadAllPosts();

const markAsRead = (description, view_count) =>{
    const markAsReadContainer = document.getElementById("markAsReadContainer");
    const div = document.createElement("div");

    div.innerHTML = `
        <div class="flex justify-between p-2 lg:p-3 bg-white rounded-2xl items-center gap-3">
            <div class="lg:w-4/5 w-11/12">
                <p>${description}</p>
            </div>
            <div class="lg:w-1/5 w-4/12 flex justify-end items-center">
                <i class="fa-regular fa-eye"></i>${view_count}
            </div>
        </div>
    `;

    markAsReadContainer.appendChild(div);
    markAsReadCounter();
}

const markAsReadCounter = () =>{
    let markAsReadCounter = document.getElementById("markAsReadCounter").innerText;
    let increase = parseInt(markAsReadCounter);
    document.getElementById("markAsReadCounter").innerText = increase += 1;
}

const handleSearchByCategory = () =>{
    const searchText = document.getElementById("searchPosts").value;
    loadAllPosts(searchText);
    document.getElementById("searchPosts").value = "";
}
