const categories = ['All','Pork','Beef','Chicken','Seafood','Fish','Side dishes','Appetizers','Soups','Desserts','Beverages'];
const categoryImages = {Pork:'assets/hero.jpg',Beef:'assets/beef.jpg',Chicken:'assets/chicken.jpg',Seafood:'assets/seafood.jpg',Fish:'assets/hero.jpg','Side dishes':'assets/greens.jpg',Appetizers:'assets/spring-roll.jpg',Soups:'assets/soup.jpg',Desserts:'assets/dessert.jpg',Beverages:'assets/cooler.jpg'};
let recipes = [];
let guidance = {documents: []};
let activeCategory = 'All';
const $ = selector => document.querySelector(selector);
const $$ = selector => Array.from(document.querySelectorAll(selector));
const pad = number => String(number).padStart(2, '0');
function recipeImage(recipe) {
  if (recipe.category === 'Pork' && recipe.number <= 20) return `assets/recipe-photos/mm_50_filipino_pork_recipes_stan-${pad(recipe.number)}.jpg`;
  if (recipe.category === 'Chicken' && recipe.number <= 20) return `assets/recipe-photos/mm_50_filipino_chicken_recipes_s-${pad(recipe.number)}.jpg`;
  return categoryImages[recipe.category] || 'assets/hero.jpg';
}
function displayTime(recipe) { return [recipe.prepTime, recipe.cookTime].filter(Boolean).join(' + ') || 'See recipe'; }
function renderCategories() {
  $('#categoryTabs').innerHTML = categories.map(category => `<button class="${category === activeCategory ? 'active' : ''}" data-category="${category}">${category}</button>`).join('');
  $$('#categoryTabs button').forEach(button => button.addEventListener('click', () => { activeCategory = button.dataset.category; renderCategories(); renderRecipes(); }));
}
function renderRecipes() {
  const query = $('#recipeSearch').value.trim().toLowerCase();
  const visible = recipes.filter(recipe => (activeCategory === 'All' || recipe.category === activeCategory) && `${recipe.name} ${recipe.category} ${recipe.description}`.toLowerCase().includes(query));
  $('#recipeGrid').innerHTML = visible.length ? visible.slice(0, 24).map(recipe => `<article class="recipe-card reveal visible" data-id="${recipe.id}"><div class="recipe-image"><img src="${recipeImage(recipe)}" alt="${recipe.name}" loading="lazy"><span class="recipe-tag">${recipe.category} · ${recipe.number}/50</span><button aria-label="Open ${recipe.name}">↗</button></div><div class="recipe-card-body"><div><span class="recipe-category">${recipe.category}</span><h3>${recipe.name}</h3></div><span class="recipe-time">${displayTime(recipe)}</span></div></article>`).join('') : '<div class="empty-state">No recipes yet — try a softer search.</div>';
  $$('#recipeGrid .recipe-card').forEach(card => card.addEventListener('click', () => { const recipe = recipes.find(item => item.id === card.dataset.id); if (recipe) openRecipe(recipe); }));
  const footer = $('.recipe-footer span');
  if (footer) footer.innerHTML = `<i class="green-dot"></i> Showing ${visible.length} of ${recipes.length} recipes from the NourishNest library`;
}
function openRecipe(recipe) {
  $('#modalImage').src = recipeImage(recipe); $('#modalImage').alt = recipe.name;
  $('#modalCategory').textContent = `${recipe.category} / Recipe ${recipe.number} of 50`;
  $('#modalTitle').textContent = recipe.name;
  $('#modalMeta').innerHTML = `<span>${displayTime(recipe)}</span><span>${recipe.serving || 'Flexible serving'}</span>`;
  $('#modalProcedure').innerHTML = `<strong>${recipe.description}</strong><br><br>${recipe.steps.map((step, index) => `<b>${index + 1}.</b> ${step}`).join('<br>')}`;
  $('#modalIngredients').innerHTML = recipe.ingredients.map(item => `<span>• ${item}</span>`).join('');
  const tips = recipe.tips.length ? `<div class="recipe-tips"><strong>Kitchen tips</strong>${recipe.tips.map(tip => `<span>• ${tip}</span>`).join('')}</div>` : '';
  $('#modalIngredients').insertAdjacentHTML('afterend', tips);
  $('#recipeModal').hidden = false; document.body.style.overflow = 'hidden';
}
function closeRecipe() { $('#recipeModal').hidden = true; document.body.style.overflow = ''; const tips = $('.recipe-tips'); if (tips) tips.remove(); }
function openGuide(id) {
  const doc = guidance.documents.find(item => item.id === id); if (!doc) return;
  $('#guideTitle').textContent = doc.title;
  $('#guideContent').innerHTML = doc.sections.map(section => `<article class="guide-section"><h3>${section.heading}</h3>${section.content.map(line => `<p>${line}</p>`).join('')}</article>`).join('');
  $('#guideModal').hidden = false; document.body.style.overflow = 'hidden';
}
function closeGuide() { $('#guideModal').hidden = true; document.body.style.overflow = ''; }
function initReveals() { const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), {threshold: .12}); $$('.reveal,.reveal-scale').forEach(element => observer.observe(element)); }
async function init() {
  try {
    const [recipesResponse, guidanceResponse] = await Promise.all([fetch('data/recipes.json'), fetch('data/guidance.json')]);
    if (!recipesResponse.ok || !guidanceResponse.ok) throw new Error('Content data could not be loaded');
    recipes = await recipesResponse.json(); guidance = await guidanceResponse.json(); renderCategories(); renderRecipes();
  } catch (error) { console.error(error); $('#recipeGrid').innerHTML = '<div class="empty-state">The NourishNest recipe library is getting ready. Please refresh once.</div>'; }
  $('#recipeSearch').addEventListener('input', renderRecipes);
  $('#modalClose').addEventListener('click', closeRecipe); $('#modalSave').addEventListener('click', closeRecipe); $('#recipeModal').addEventListener('click', event => { if (event.target.id === 'recipeModal') closeRecipe(); });
  $('#guideClose').addEventListener('click', closeGuide); $('#guideModal').addEventListener('click', event => { if (event.target.id === 'guideModal') closeGuide(); });
  $('#menuButton').addEventListener('click', () => $('#navLinks').classList.toggle('open')); $$('.nav-links a').forEach(link => link.addEventListener('click', () => $('#navLinks').classList.remove('open')));
  $('#inquiryForm').addEventListener('submit', event => { event.preventDefault(); $('#formSuccess').hidden = false; event.target.querySelector('button').innerHTML = 'Inquiry noted ✓'; });
  $$('.guide-button').forEach(button => button.addEventListener('click', () => openGuide(button.dataset.guide)));
  const bowl = $('#scrollBowl'); window.addEventListener('scroll', () => { const y = window.scrollY; bowl.style.transform = `translate3d(${Math.sin(y / 170) * 24}px,${Math.min(y * .08, 42)}px,0) rotate(${Math.sin(y / 230) * 7}deg)`; }, {passive: true});
  initReveals();
}
document.addEventListener('DOMContentLoaded', init);
