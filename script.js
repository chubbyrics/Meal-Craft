const recipes = [
  {name:'Sinigang na Baboy',category:'Pork',time:'55 min',tag:'Comfort bowl',serves:'4–6',difficulty:'Easy',image:'/assets/hero.jpg',ingredients:'Pork belly · tomatoes · tamarind · kangkong',procedure:'Simmer the pork until tender, add the souring base and vegetables, then season gently before serving.'},
  {name:'Caldereta sa Gata',category:'Beef',time:'1 hr 20',tag:'Slow & rich',serves:'4',difficulty:'Weekend',image:'/assets/beef.jpg',ingredients:'Beef chuck · coconut milk · potatoes · bell pepper',procedure:'Brown the beef, build the aromatics, and braise low and slow until the sauce turns silky.'},
  {name:'Chicken Adobo',category:'Chicken',time:'45 min',tag:'Family classic',serves:'4',difficulty:'Easy',image:'/assets/chicken.jpg',ingredients:'Chicken thighs · soy sauce · cane vinegar · garlic',procedure:'Marinate briefly, simmer until tender, then reduce the sauce until glossy and deeply savory.'},
  {name:'Garlic Butter Prawns',category:'Seafood',time:'25 min',tag:'Weeknight win',serves:'2–3',difficulty:'Easy',image:'/assets/seafood.jpg',ingredients:'Prawns · garlic · butter · calamansi · spring onion',procedure:'Sear the prawns quickly, toss through garlic butter, and finish with citrus just before plating.'},
  {name:'Kinilaw na Isda',category:'Fish',time:'25 min',tag:'Fresh & bright',serves:'3–4',difficulty:'Easy',image:'/assets/hero.jpg',ingredients:'Fresh fish · cane vinegar · cucumber · ginger · chili',procedure:'Cure the fish in vinegar, fold through the aromatics, and chill until bright and clean.'},
  {name:'Atchara & Greens',category:'Side dishes',time:'20 min',tag:'Crisp side',serves:'6',difficulty:'Easy',image:'/assets/greens.jpg',ingredients:'Green papaya · carrot · vinegar · herbs',procedure:'Salt the vegetables, rinse well, then toss with the sharp-sweet dressing for a crisp counterpoint.'},
  {name:'Lumpiang Gulay',category:'Appetizers',time:'35 min',tag:'Shareable',serves:'4–6',difficulty:'Easy',image:'/assets/spring-roll.jpg',ingredients:'Spring roll wrappers · cabbage · carrot · green beans',procedure:'Sauté the filling until just tender, roll tightly, and fry until the wrappers turn golden.'},
  {name:'Tinola Verde',category:'Soups',time:'50 min',tag:'Restorative',serves:'4',difficulty:'Easy',image:'/assets/soup.jpg',ingredients:'Chicken · ginger · green papaya · malunggay',procedure:'Bloom the ginger, simmer the chicken gently, and add greens at the very end for freshness.'},
  {name:'Ube Coconut Halo',category:'Desserts',time:'20 min',tag:'Sweet finish',serves:'4',difficulty:'Easy',image:'/assets/dessert.jpg',ingredients:'Ube · coconut cream · shaved ice · toasted pinipig',procedure:'Layer the ube and coconut cream over ice, then finish with crunch for a cool, joyful bowl.'},
  {name:'Calamansi Cooler',category:'Beverages',time:'10 min',tag:'Citrus lift',serves:'4',difficulty:'Easy',image:'/assets/cooler.jpg',ingredients:'Calamansi · sparkling water · cane sugar · mint',procedure:'Stir the citrus and sugar until dissolved, top with bubbles, and serve over plenty of ice.'}
];
const categories=['All','Pork','Beef','Chicken','Seafood','Fish','Side dishes','Appetizers','Soups','Desserts','Beverages'];
const team=[['MA','Mara Alonzo','Menu Architect','coral','Turns busy schedules into calm, colorful weekly menus.'],['JR','Jules Reyes','Recipe Curator','sage','Keeps Filipino comfort food at the heart of every plan.'],['KC','Kyla Cruz','Nutrition Guide','gold','Makes balanced choices feel practical, never prescriptive.'],['IA','Ira Aquino','Budget Planner','plum','Finds smarter swaps that keep the grocery list grounded.'],['NL','Nico Lim','Kitchen Coach','blue','Brings prep flow, storage know-how, and a little joy.']];
let activeCategory='All';
const $=selector=>document.querySelector(selector);
const $$=selector=>Array.from(document.querySelectorAll(selector));
function renderCategories(){ $('#categoryTabs').innerHTML=categories.map(category=>`<button class="${category===activeCategory?'active':''}" data-category="${category}">${category}</button>`).join(''); $$('#categoryTabs button').forEach(button=>button.addEventListener('click',()=>{activeCategory=button.dataset.category;renderCategories();renderRecipes()})); }
function renderRecipes(){const query=$('#recipeSearch').value.trim().toLowerCase();const visible=recipes.filter(recipe=>(activeCategory==='All'||recipe.category===activeCategory)&&`${recipe.name} ${recipe.category}`.toLowerCase().includes(query));$('#recipeGrid').innerHTML=visible.length?visible.map((recipe,index)=>`<article class="recipe-card reveal visible" data-index="${recipes.indexOf(recipe)}"><div class="recipe-image"><img src="${recipe.image}" alt="${recipe.name}" loading="lazy"><span class="recipe-tag">${recipe.tag}</span><button aria-label="Open ${recipe.name}">↗</button></div><div class="recipe-card-body"><div><span class="recipe-category">${recipe.category}</span><h3>${recipe.name}</h3></div><span class="recipe-time">◷ ${recipe.time}</span></div></article>`).join(''):'<div class="empty-state">No recipes yet — try a softer search.</div>';$$('.recipe-card').forEach(card=>card.addEventListener('click',()=>openRecipe(recipes[Number(card.dataset.index)])));}
function openRecipe(recipe){$('#modalImage').src=recipe.image;$('#modalImage').alt=recipe.name;$('#modalCategory').textContent=`${recipe.category} / Demo recipe`;$('#modalTitle').textContent=recipe.name;$('#modalMeta').innerHTML=`<span>◷ ${recipe.time}</span><span>Serves ${recipe.serves}</span><span>${recipe.difficulty}</span>`;$('#modalProcedure').textContent=`${recipe.procedure} This demo page shows how the full MealCraft recipe library will pair clear steps with a little context.`;$('#modalIngredients').textContent=recipe.ingredients;$('#recipeModal').hidden=false;document.body.style.overflow='hidden';}
function closeRecipe(){ $('#recipeModal').hidden=true;document.body.style.overflow=''; }
function initReveals(){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});$$('.reveal,.reveal-scale').forEach(element=>observer.observe(element));}
function init(){renderCategories();renderRecipes();$('#recipeSearch').addEventListener('input',renderRecipes);$('#modalClose').addEventListener('click',closeRecipe);$('#modalSave').addEventListener('click',closeRecipe);$('#recipeModal').addEventListener('click',event=>{if(event.target.id==='recipeModal')closeRecipe()});$('#menuButton').addEventListener('click',()=>$('#navLinks').classList.toggle('open'));$$('.nav-links a').forEach(link=>link.addEventListener('click',()=>$('#navLinks').classList.remove('open')));$('#inquiryForm').addEventListener('submit',event=>{event.preventDefault();$('#formSuccess').hidden=false;event.target.querySelector('button').innerHTML='Inquiry noted ✓'});const bowl=$('#scrollBowl');window.addEventListener('scroll',()=>{const y=window.scrollY;bowl.style.transform=`translate3d(${Math.sin(y/170)*24}px,${Math.min(y*.08,42)}px,0) rotate(${Math.sin(y/230)*7}deg)`},{passive:true});initReveals();}
document.addEventListener('DOMContentLoaded',init);

const reveals = document.querySelectorAll('.reveal');

    // Create an intersection observer
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add the visible class to trigger CSS transition
          entry.target.classList.add('visible');
          // Unobserve once revealed so it doesn't repeat every scroll
          observer.unobserve(entry.target); 
        }
      });
    }, {
      root: null, // viewport
      threshold: 0.15, // Trigger when 15% of the card is visible
      rootMargin: "0px 0px -50px 0px" 
    });

    // Observe each team card
    reveals.forEach(reveal => {
      revealObserver.observe(reveal);
    });
  
