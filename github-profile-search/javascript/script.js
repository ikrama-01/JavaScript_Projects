const APIURL = "https://api.github.com/users/";
const main = document.querySelector("#main");
const username = document.querySelector("#search");

const formSubmit = () => {
    
    if(username.value != ""){
        getUser(username.value);
        username.value = "";
    }
    return false;
}

const getUser = async (username) => {

    const response = await fetch(APIURL + username);
    const data = await response.json();
    console.log(response);

    const noUser =  `
    <div class="errorcard">
    <h3> User Not Found </h3>
    <p> Please Enter Correct Userame</p>
    </div>

    `

    const card = `
    <div class="card">
        <div>
            <img class="avatar" src="${data.avatar_url}" alt="Florin Pop">
        </div>
        <div class="user-info">
            <h2>${data.login}</h2>
            <p>${data.bio}</p>

            <ul class="info">
                <li>${data.followers}<strong>Followers</strong></li>
                <li>${data.following}<strong>Following</strong></li>
                <li>${data.public_repos}<strong>Repos</strong></li>
            </ul>

            <div id="repos">
            </div>

        </div>
    </div>
    `
    if(response.status == "200"){
        main.innerHTML = card;
        getRepos(username);
    } else{
        main.innerHTML = noUser;
    }

}

const getRepos = async(username) => {
    const repos = document.querySelector("#repos");
    const response = await fetch(APIURL+username+"/repos");
    const data = await response.json();
    
    data.forEach(item => {
        const elem = document.createElement("a");
        elem.classList.add("repo");
        elem.href = item.html_url;
        elem.innerText = item.name;
        elem.target = "blank";
        repos.appendChild(elem);
        
    });
}

username.addEventListener(
    "focusout",
    function() {
        formSubmit();
    }
)