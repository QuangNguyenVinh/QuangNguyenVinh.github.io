const API_GITHUB_PROFILE = "https://api.github.com/users/";
const USER_DEFAULT = "QuangNguyenVinh";

const content = document.getElementById("content");
const form = document.getElementById("form");
const search = document.getElementById("search");

showProfile(USER_DEFAULT);
//
async function getUser(username) {

    return await fetch(API_GITHUB_PROFILE + username).then(res => {
        if(res.status === 200){
            return res.json();
        }
    });
}

function createUserCard(user){
    const userCard = `
        <div class="profile">
            <div>
                <img class="avatar" src=${user.avatar_url} alt=${user.name} />
            </div>
            <div class="user-info">
                <h3>${user.name}</h3>
                <p>${user.bio}</p>
                <ul class="info">
                    <li>${user.followers}<strong> Followers</strong></li>
                    <li>${user.following}<strong> Following</strong></li>
                    <li>${user.public_repos}<strong> Repos</strong></li>
                    <li>${user.public_gists}<strong> Gists</strong></li>
                </ul>
                <div id="repos"></div>
            </div>
        </div>
    `;

    content.innerHTML = userCard;
}
async function getRepos(userName) {
    return await fetch(API_GITHUB_PROFILE + userName + "/repos").then(res => {
        if(res.status === 200){
            return res.json();
        }
    });
}
function addReposToCard(repos) {
    const reposEl = document.getElementById("repos");

    repos
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 10)
        .forEach((repo) => {
            const repoEl = document.createElement("a");
            repoEl.classList.add("repo");

            repoEl.href = repo.html_url;
            repoEl.target = "_blank";
            repoEl.innerText = repo.name;

            reposEl.appendChild(repoEl);
        });
}
function showProfile(userName)
{
    getUser(userName).then(res => {
        createUserCard(res);
    });

    getRepos(userName).then(res => {
        addReposToCard(res);
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const userName = search.value;

    if (userName) {
        showProfile(userName);

        search.value = "";
    }
});