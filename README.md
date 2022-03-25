# VueJSExamProject
This is a web application for viewing and publishing cooking recipes. The application consists of public and private part.

### Functionalities related to public part:
Unauthenticated users can view, filter recipes by category and like different recipes. Whenerver a user clicks on the recipe title to view the details, the viewed number of the recipe increases.

### Functionalities related to private part:
Authenticated users can like recipes, add recipes, can modify their own recipes and mark recipes as favorite, including their own.

### Implementation
Solution consists of VueJs front-end and Django REST framework  and Postgresql as back-end

### Structure

```

├── backend_django          # Django project 
    ├── cookbook            # App directory
        ├── cookbook        # URL configurations and project settings
        ├── mycookbook      
        ├── media           # Storing uploaded images
        └── mycookbook
           └── mycookbook  
                └── models  
                └── serializers 
                └── urls 
                └── views               
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

Backend:

Fronend:
