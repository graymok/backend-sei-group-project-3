¬sequelize model:generate –name user –attributes name:string,email:string,password:string


sequelize model:generate –name cart_item –attributes userId:integer,productId:integer,orderId:integer

sequelize model:generate –name order –attributes userId:integer,total:integer,address:string,card:string

sequelize model:generate –name product –attributes name:string,description:string,image:string,price:integer
