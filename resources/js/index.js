const inputFieldEl = document.querySelector("#input__field");
const goBtn = document.querySelector("#go__btn");
const mainGameContainer = document.querySelector("#main__game__container");
const loaderEl = document.querySelector("#loader");
const sorryEl = document.querySelector("#sorry__text");

goBtn.addEventListener("click", getData);

async function getData() {
  if (inputFieldEl.value == "") {
    sorryEl.style.display = "block";
    sorryEl.innerText = "Please enter a videogame!"
  } else {
    mainGameContainer.innerHTML = "";
    sorryEl.style.display = "none";
    let link =
      "https://corsproxy.io/?https://www.giantbomb.com/api/search/?api_key=3fe3d85dfed048a636b145709d6402eae063a7c0&format=json&query=%22" +
      inputFieldEl.value +
      "%22&resources=game";

    console.log(link);
    loaderEl.style.display = "block";

    try {
      let response = await fetch(link);
      if (response.ok === false) {
        throw new Error(
          `HTTP error code: ${response.status}, HTTP error message: ${response.statusText}`
        );
      }

      data = await response.json();
    } catch (error) {
      console.log(error);
      sorryEl.textContent = "Looks like something went wrong!";
      sorryEl.style.display = "block";
    } finally {
      loaderEl.style.display = "none";
    }

    if (data.number_of_total_results == 0) {
      sorryEl.style.display = "block";
      sorryEl.textContent = "Sorry! No games were found :(";
    } else {
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
  }
}
