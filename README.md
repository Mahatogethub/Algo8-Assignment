# Product management

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


### output

### User signUp

![Screenshot (484)](https://user-images.githubusercontent.com/104766210/221543167-97f115cf-4836-4f63-9faa-c853fad45d78.png)

### user Login

![Screenshot (485)](https://user-images.githubusercontent.com/104766210/221543384-a6ae9314-b9e5-4564-8e7a-5645f0aef5f5.png)

### product creation

![Screenshot (486)](https://user-images.githubusercontent.com/104766210/221543490-7e82b515-2b42-4cb6-afbd-ff3affe108af.png)

### Fetching data of product with Product + Price Table

![Screenshot (490)](https://user-images.githubusercontent.com/104766210/221545382-60e27e47-5034-4eed-9dca-8f02507eb38c.png)

### Fetching data of product with Product + productName

![Screenshot (487)](https://user-images.githubusercontent.com/104766210/221543855-10ee4a19-e239-496d-b3c1-f44640db6ca7.png)

### update product

![Screenshot (488)](https://user-images.githubusercontent.com/104766210/221544589-9249cc4b-6802-4a38-a3d6-c2fa81d2f6ad.png)

### delete Product

![Screenshot (489)](https://user-images.githubusercontent.com/104766210/221544715-0657a9b0-5d9b-482f-a8a4-5bb913034eb5.png)
