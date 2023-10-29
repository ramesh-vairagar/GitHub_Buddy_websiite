const APIURL = "https://api.github.com/users/";
const main = document.getElementById("main");
const searchInput = document.getElementById("search");

async function getUser(username) {
  // 1) make an api call and get the details.
  const resp = await fetch(APIURL + username);
  const data = await resp.json();

  console.log(APIURL + username);
  console.log(data);

  if (data.message && data.message == "Not Found") {
    alert("Invalid username!");
    return;
  }

  // 2) dynamically create the card and add the details in it.
  const card = `<div class="card">
  <div>
    <img
      class="avatar"
      src=${data.avatar_url}
      alt="Starkk"
    />
  </div>

  <div class="user-info">
    <h2>${data.name}</h2>
    <p>${data.bio}</p>

    <ul class="info">
      <li>${data.followers} <strong>Followers</strong></li>
      <li>${data.following} <strong>Following</strong></li>
      <li>${data.public_repos} <strong>Repos</strong></li>
    </ul>

    <div id="repos">
    </div>
  </div>
</div>`;

  // 3) append the created card in the main
  main.innerHTML = card;

  getRepos(username);
}

async function getRepos(username) {
  const resp = await fetch(APIURL + username + "/repos");
  const data = await resp.json();
  const repos = document.querySelector("#repos");

  data.forEach((eRepo) => {
    const elem = document.createElement("a");
    elem.classList.add("repo");
    elem.href = eRepo.html_url;
    elem.innerText = eRepo.name;
    elem.target = "_blank";

    repos.appendChild(elem);
  });
}


function formSubmit() {
  if (searchInput.value != "") {
    getUser(searchInput.value);
  }
  return false;
}
