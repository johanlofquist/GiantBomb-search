const inputFieldEl = document.querySelector("#input__field");
const goBtn = document.querySelector("#go__btn");
const mainGameContainer = document.querySelector("#main__game__container");

goBtn.addEventListener("click", getData);

async function getData() {
  mainGameContainer.innerHTML = "";
  let link =
    "https://corsproxy.io/?https://www.giantbomb.com/api/search/?api_key=3fe3d85dfed048a636b145709d6402eae063a7c0&format=json&query=%22" +
    inputFieldEl.value +
    "%22&resources=game";
  const response = await fetch(link, {
    cors: "no-cors",
  });
  const data = await response.json();
  console.log(link);

  for (let i = 0; i < data.results.length; i++) {
    let gameContainer = document.createElement("div");
    gameContainer.classList = "game__container";
    let gameImg = document.createElement("img");
    gameImg.classList = "game__img";
    let gameTextContainer = document.createElement("div");
    gameTextContainer.classList = "game__text__container";
    let gameName = document.createElement("h2");
    gameName.classList = "game__name";
    let gameDescription = document.createElement("p");
    gameDescription.classList = "game__description";
    let gameRelease = document.createElement("p");
    gameRelease.classList = "game__release";
    let gamePlatforms = document.createElement("p");
    gamePlatforms.classList = "game__platforms";

    gameImg.src = data.results[i].image.original_url;
    gameName.innerText = data.results[i].name;
    gameDescription.innerText = data.results[i].deck;
    gameRelease.innerText =
      "Release date: " + data.results[i].original_release_date;
    let platformsString = "Platforms: ";
    for (let r = 0; r < data.results[i].platforms.length; r++) {
      platformsString += data.results[i].platforms[r].name + ", ";
    }
    platformsString = platformsString.slice(0, -2);
    gamePlatforms.innerText = platformsString;

    mainGameContainer.append(gameContainer);
    gameContainer.append(gameImg, gameTextContainer);
    gameTextContainer.append(
      gameName,
      gameDescription,
      gameRelease,
      gamePlatforms
    );
  }
}
