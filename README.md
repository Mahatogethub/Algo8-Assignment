# Algo8-Assignment

### Requirement

User role-based login, where admin should have all access to data R/W operations whereas supervisor
should have R/W operations on the assigned data tables.
APIs for Login, User Creation, Data Table CRUD operations and Data push to Api call.
Logging for each and every methods, triggers, requests and data CRUD operations.
Create dynamic table data with the help of joins and other calculation methods.
Code API for the tables provided below where supervisor can login -&gt; place order -&gt; edit/cancel order -
&gt; payment. And admin can login -&gt; view product table -&gt; CRUD (Price, ProductID, Product Name).
Documentation for APIs.

### User Schema :-

{ userName: {String ,mandatory, valid email, unique}, password: {String , mandatory} ,designation: {String , mandatory}, assignTable: {String ,mandatory} }


### Product Schema :-
 
 { productName: {String , mandatory}, quantity: {Number ,mandatory} ,totalPrice: { Number , mandatory}, paid :{Number ,mandatory} , refund : {Number}}


 ### Order Schema :- 

 
 { userId: {ObjectId , mandatory}, items: [{productId : ObjectId ,mandatory, quantity : Number , mandatory}] ,totalPrice: { Number , mandatory}, totalQuantity :{Number ,mandatory} , cancellable : { Boolean , true} , status : {String , pending} , isDeleted : {Boolean}}


 ### How to start your node project

 - npm install

 - npm start


