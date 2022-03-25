# VueJSExamProject
This is a web application for viewing and publishing cooking recipes. The application consists of public and private part.

### Functionalities related to public part:
Unauthenticated users can view, filter recipes by category and like different recipes. Whenerver a user clicks on the recipe title to view the details, the viewed number of the recipe increases.

### Functionalities related to private part:
Authenticated users can like recipes, add recipes, can modify their own recipes and mark recipes as favorite, including their own.

### Implementation
Solution consists of Vue app in javascript as front-end and Django app back-end in python.

### Structure

```

├── backend_django          # Django project 
    ├── cookbook            # App directory
        ├── cookbook        # URL configurations and project settings
        ├── mycookbook      
        ├── media           # Storing uploaded images
        └── mycookbook
           └── mycookbook  
                └── models  #Recipe, MyRecipe(FK User, FK Recipe), MyFavoriteRecipes (FK User, FK Recipe)
                └── serializers 
                └── urls 
                └── views   #django-rest-framework with knox TokenAuthentication            
    ├── manage.py            
    ├── requirements 


├── lets-cook                        # VueJs project 
    ├── src                          
        ├── components
            ├── AddRecipe            
            ├── EditMyRecipe         
            ├── Header  
            ├── Home  
            ├── Login
            ├── MyFavoriteRecipesList
            ├── MyRecipesList
            ├── Navigation
            ├── RecipeCategories
            ├── RecipesList
            ├── Register 

        ├── dataProviders
            ├── authentication.js
            ├── recipes.js     
        ├── routers
            ├── index.js                  
        └── store
            ├── store.js
        └── views
           └── AddRecipe
           └── EditMyRecipeList  
           └── Home  
           └── Login
           └── MyFavoriteRecipesList
           └── MyRecipesList
           └── RecipesList
        ├── App.vue
        ├── main.js              
    ├── package.json                   
           
```
### Useful commands

git clone https://github.com/ZYKoleva/VueJSExamProject.git

Backend (backend_django dir):    

```
python -m venv .env
.\.env\Scripts\Activate.ps1
pip install -r requirements.txt  #if installation fails, upgrade pip (python -m pip install --upgrade pip)
cd cookbook
python manage.py runserver
```

Fronend (lets-cook dir):
```
npm install
npm run serve
```
