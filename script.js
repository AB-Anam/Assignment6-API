// console.log("js file added")

//create loadcategories

const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};

const loadPets = () => {

  const spinner = document.getElementById("spinner");
  const container = document.getElementById("detailsSection");

  // Show spinner, hide content
  spinner.classList.remove("hidden");

 const fetchPromise= fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => data.pets  || [])
    .catch((error) => console.log(error));


    Promise.all([
      fetchPromise,
      new Promise((resolve) => setTimeout(resolve, 2000)),
    ]).then(([data]) => {
      spinner.classList.add("hidden");
      displayAllPets(data);
    });
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
 <div class="card bg-base-100 w-full border-0 mb-6">
  <figure class="px-10 pt-10">
    <img
      src="https://img.icons8.com/?size=80&id=igolVkTttqdp&format=png"
      alt="Oops"
      class="rounded-xl" />
  </figure>
  <div class="card-body items-center text-center border-0">
    <h2 class="card-title text-3xl text-barn-primary">Oops!</h2>
    <p class="text-xl text-zinc-800">No Information Available!</p>
    <p class="text-sm text-emerald-600">Sorry, the bird category is currently unavailable.
     We are working to bring our bunny friends back soon! Please check other adorable pets or try again later. 
     Thank you for your patience!</p>
  </div>
</div>
    `;
    
    allPetContainer.appendChild(card);
    return;
  } else{
    allPetContainer.classList.add('grid');

  }
  
  let array = []; 

  pets.forEach((item) => {
    
    array.push(item);
     console.log(item);
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
      <button onclick="diaplaySelectedpets('${item.image}')" class="btn btn2 text-barn-primary"><img class="h-8" src = "https://img.icons8.com/?size=60&id=wbdaZ6Dm6bFk&format=png"/></button>
      <button class="btn btn2 text-barn-primary" onclick="showCongratsModal()"
      onclick="this.classList.add('opacity-50', 'cursor-not-allowed', 'bg-[#0E7A81]', '!text-white', 'disabled');">Adopt</button>
      <button onclick="loadPetDetails('${item.petId}')" class="btn btn2 text-barn-primary">Details</button>
    </div>
  </div>`;
  allPetContainer.appendChild(card);
  });



  document.getElementById('sort').addEventListener('click', function (){
        
    // Note: We should handle the case of zero, when the value of both the objects is the same, to avoid unnecessary swaps.

    let sortedProducts = array.sort((p1, p2) => 


    // conditions and optional chaining used as well to move further
    // 
     (p1.price) < (p2.price) ? 1 : 
     (p1.price) > (p2.price) ? -1 : 0);

    // to display the sorted data, calling the diplayData function 
    // and sending the sorted array of objects in decending order of views
    // as a parameter

    displayAllPets(sortedProducts);
    // console.log("Products sorted based on descending order of their prices are:")
    // console.log(sortedProducts);

  });

};

const loadPetDetails = (id) => {
  const url = `https://openapi.programming-hero.com/api/peddy/pet/${id}`
  // console.log(url);
      fetch(url)
      .then((res) => res.json())
      .then((data) => displayPetDetails(data.petData));
 }

diaplaySelectedpets = (image) =>{
  console.log(image)
  const petImage = document.createElement('div');
  petImage.innerHTML = `<img class ="rounded-lg" src = ${image}/>`;
  petImage.classList.add('w-5/12')
  document.getElementById('selectedPetsContainer').appendChild(petImage);
  
}

const loadCategoryPets = (id) =>{
    // console.log(id);
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
    .then((res) => res.json())
    .then((data) => displayAllPets(data.data))
    // .then((data) =>  displayAllPets(data))
    .catch((error) => console.log(error));

   
};

const displayPetDetails = (details) => {
  console.log(details);

  // Remove old modal if it exists to avoid duplicates
  const oldModal = document.getElementById('my_modal_5');
  if (oldModal) oldModal.remove();

  const petDetails = document.createElement('div');
  petDetails.innerHTML = `
    <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
      <div class="modal-box p-5">
        <img class="w-full h-1/4 object-cover" src=${details.image}/>
        <h3 class="text-2xl lato-bold">${details.pet_name}</h3>
        <div class="flex  mt-3 gap-5">
              <div class="flex gap-1" >
          <img class="w-4" src ="https://img.icons8.com/?size=48&id=bShzw12NoVBS&format=png"/>
          <p class="text-sm text-slate-600 leading-none font-semibold">Breed: ${details.breed?details.breed:"Not available"}</p>
          </div>
          <div class="flex gap-1 " >
          <img class="w-4 h-4" src ="https://img.icons8.com/?size=24&id=sLnSWPXgXnHw&format=png"/>
          <p class="text-sm text-slate-600 leading-none font-semibold">Birth: ${details.date_of_birth?details.date_of_birth:"Not available"}</p>
          </div>

        </div>

        <div class="flex  mt-3 gap-5">
              <div class="flex gap-1" >
          <img class="w-4" src ="https://img.icons8.com/?size=48&id=19892&format=png"/>
          <p class="text-sm text-slate-600 leading-none font-semibold">Gender: ${details.gender?details.gender:"Not available"}</p>
          </div>
          <div class="flex gap-1 " >
          <img class="w-4 h-4" src ="https://img.icons8.com/?size=40&id=31090&format=png"/>
          <p class="text-sm text-slate-600 leading-none font-semibold">Price: ${details.price?details.price:"Not available"}</p>
          </div>

        </div>
        <div class="flex gap-1 mt-3" >
          <img class="w-4 h-4" src ="https://img.icons8.com/?size=48&id=3fhpUBEis65z&format=png"/>
          <p class="text-sm text-slate-600 leading-none font-semibold">Vaccinated status: ${details.vaccinated_status?details.vaccinated_status:"Not available"}</p>
          </div>
        
          <div class="divider my-0"></div>
         <h3 class="text-2xl lato-bold">Detailed Information</h3>
        <p class="py-4 text-sm">${details.pet_details}</p>
        <div class="modal-action">
          <form method="dialog">
            <button class="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  `;

  document.getElementById('detailsSection').appendChild(petDetails);

  // Show the modal immediately after adding to DOM
  const modal = document.getElementById('my_modal_5');
  modal.showModal();
};

const showCongratsModal = () => {
  // Remove old modal if it exists
  const oldModal = document.getElementById('congrats_modal');
  if (oldModal) oldModal.remove();

  // Create modal HTML
  const modalWrapper = document.createElement('div');
  modalWrapper.innerHTML = `
    <dialog id="congrats_modal" class="modal modal-bottom sm:modal-middle">
      <div class="modal-box text-center">
        <h3 class="text-4xl font-bold">🎉 Congratulations!</h3>
        <p class="py-4 text-3xl">Closing in <span id="countdown" class="text-6xl font-bold">3</span> seconds...</p>
      </div>
    </dialog>
  `;

  // Add to DOM
  document.body.appendChild(modalWrapper);

  const modal = document.getElementById('congrats_modal');
  const countdownEl = document.getElementById('countdown');

  modal.showModal();

  // Countdown logic
  let secondsLeft = 3;
  const countdown = setInterval(() => {
    secondsLeft--;
    if (secondsLeft > 0) {
      countdownEl.textContent = secondsLeft;
    } else {
      clearInterval(countdown);
      modal.close();
      modal.remove();
    }
  }, 1000);
};





loadCategories();
loadPets();
