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
    button.classList = "btn1 btn btn-outline  text-base h-16 border-edge  rounded-lg font-extrabold";
    //click function on buttons
    button.onclick = () => loadCategoryPets(element.category)
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

  allPetContainer.innerHTML = "";
  const card = document.createElement("div");

  if(pets.length == 0){
    allPetContainer.classList.remove('grid');
    card.innerHTML = `
 <div class="card bg-base-100 w-full border-0">
  <figure class="px-10 pt-10">
    <img
      src="https://img.icons8.com/?size=80&id=igolVkTttqdp&format=png"
      alt="Oops"
      class="rounded-xl" />
  </figure>
  <div class="card-body items-center text-center border-0">
    <h2 class="card-title text-3xl text-barn-primary">Oops!</h2>
    <p class="text-xl text-zinc-800">No Information Available!</p>
  </div>
</div>
    `;
    
    allPetContainer.appendChild(card);
    return;
  } else{
    allPetContainer.classList.add('grid');

  }

  pets.forEach((item) => {
    // console.log(item);
    const card = document.createElement("div");
    card.classList = 'card bg-base-100 border-[1px] border-edge rounded-lg'
    card.innerHTML = `<figure class="px-3 pt-3 h-40">
    <img
      src= ${item.image}
      alt="Shoes"
      class="rounded-lg h-full w-full object-cover" />
  </figure>
  <div class="card-body px-3 pt-3 pb-3">
    <h2 class="card-title">${item.pet_name}</h2>
    <div class="flex gap-1" >
    <img class="w-4" src ="https://img.icons8.com/?size=48&id=bShzw12NoVBS&format=png"/>
    <p class="text-sm text-slate-600 leading-none">Breed: ${item.breed?item.breed:"Not available"}</p>
    </div>
    <div class="flex gap-1" >
    <img class="w-4 h-4" src ="https://img.icons8.com/?size=24&id=sLnSWPXgXnHw&format=png"/>
    <p class="text-sm text-slate-600 leading-none">Birth: ${item.date_of_birth?item.date_of_birth:"Not available"}</p>
    </div>
    <div class="flex gap-1" >
    <img class="w-4" src ="https://img.icons8.com/?size=48&id=19892&format=png"/>
    <p class="text-sm text-slate-600 leading-none">Gender: ${item.gender?item.gender:"Not available"}</p>
    </div>
    <div class="flex gap-1" >
    <img class="w-4" src ="https://img.icons8.com/?size=40&id=31090&format=png"/>
    <p class="text-sm text-slate-600 leading-none">Price: ${item.price?item.price:"Not available"}</p>
    </div>
    <div class="divider my-0"></div>
    <div class="flex gap-2 my-0 py-0">
      <button class="btn btn2 text-barn-primary" onclick="displaySelectedPets(${item.image})>
      <i class="fa-solid fa-thumbs-up"></i></button>
      <button class="btn btn2 text-barn-primary">Adopt</button>
      <button class="btn btn2 text-barn-primary">Details</button>
    </div>
  </div>`;
  allPetContainer.appendChild(card);
  });
};

const loadCategoryPets = (id) =>{
    // console.log(id);
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
    .then((res) => res.json())
    .then((data) => displayAllPets(data.data))
    // .then((data) =>  displayAllPets(data))
    .catch((error) => console.log(error));

   
};

const displaySelectedPets = () =>{

}


loadCategories();
loadPets();
