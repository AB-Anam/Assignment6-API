// console.log("js file added")

//create loadcategories

const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};

const loadPets = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => displayAllPets(data.pets))
    .catch((error) => console.log(error));
};

const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("pet-categories");
  //add data in html
  categories.forEach((element) => {
    // console.log(element);
    //create button
    const button = document.createElement("button");
    //create img
    const icon = document.createElement("img");
    //set icon
    icon.src = element.category_icon;
    icon.classList = " mr-2 h-12";
    //add tailwind class
    button.classList =
      "btn1 btn btn-outline  text-base h-16 border-edge  rounded-lg font-extrabold";
    //add category name to button
    const textNode = document.createTextNode(element.category);
    //append icon to button
    button.appendChild(icon);
    button.appendChild(textNode);
    //set inner text
    categoryContainer.appendChild(button);
  });
};

const displayAllPets = (pets) => {
  const allPetContainer = document.getElementById("displayAllpets");
  pets.forEach((item) => {
    console.log(item);
    const card = document.createElement("div");
    card.classList = 'card bg-base-100 border-[1px] border-edge rounded-lg'
    card.innerHTML = `<figure class="px-2 pt-2 h-auto">
    <img
      src= ${item.image}
      alt="Shoes"
      class="rounded-lg" />
  </figure>
  <div class="card-body items-center">
    <h2 class="card-title">Shoes!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>`;
  allPetContainer.appendChild(card);
  });
};

loadCategories();
loadPets();
