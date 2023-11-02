const inputFieldEl = document.querySelector("#input__field");
const goBtn = document.querySelector("#go__btn");

goBtn.addEventListener("click", getData);

async function getData() {
  let link =
    "https://corsproxy.io/?https://www.giantbomb.com/api/search/?api_key=3fe3d85dfed048a636b145709d6402eae063a7c0&format=json&query=%22" +
    inputFieldEl.value +
    "%22&resources=game";
  const response = await fetch(link, {
    cors: "no-cors"
})
  const data = await response.json();
  console.log(data);
}
