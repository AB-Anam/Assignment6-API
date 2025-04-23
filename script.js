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
    card.innerHTML = `<figure class="px-3 pt-3 h-40">
    <img
      src= ${item.image}
      alt="Shoes"
      class="rounded-lg h-full w-full object-cover" />
  </figure>
  <div class="card-body px-3 pt-3">
    <h2 class="card-title">${item.pet_name}</h2>
    <div class="flex gap-1" >
    <img class="w-4" src ="https://img.icons8.com/?size=48&id=bShzw12NoVBS&format=png"/>
    <p class="text-sm text-slate-600 leading-none">Breed: ${item.breed}</p>
    </div>
    <div class="flex gap-1" >
    <img class="w-4 h-4" src ="https://img.icons8.com/?size=24&id=sLnSWPXgXnHw&format=png"/>
    <p class="text-sm text-slate-600 leading-none">Birth: ${item.date_of_birth}</p>
    </div>
    <div class="flex gap-1" >
    <img class="w-4" src ="https://img.icons8.com/?size=48&id=19892&format=png"/>
    <p class="text-sm text-slate-600 leading-none">Gender: ${item.gender}</p>
    </div>
    <div class="flex gap-1" >
    <img class="w-4" src ="https://img.icons8.com/?size=40&id=31090&format=png"/>
    <p class="text-sm text-slate-600 leading-none">Price: ${item.price}$</p>
    </div>
    <div class="divider my-0"></div>
    <div class="flex gap-2">
      <button class="btn btn-outline btn-success"><img class="w-5" src="https://img.icons8.com/?size=24&id=SVZUo0RhRuHJ&format=png"/> </button>
      <button class="btn btn-outline btn-success">Adopt</button>
      <button class="btn btn-outline btn-success">Details</button>
    </div>
  </div>`;
  allPetContainer.appendChild(card);
  });
};

loadCategories();
loadPets();
