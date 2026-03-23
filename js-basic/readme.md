### Node js excute

-single Thread Progam
-Request
''''''''

                    Memory Heap

    call Stack

                    Grarbage collector

### SOLID Principle of Software Development

    -Single Responsibility Principle
        -a function or aclass must handle only one responsibility
        ```js

        function addTwoNumbers(a, b){
            let sum = a + b;
            let multiply = a*b;// agins SIngle ROesponsiblity Principle
        }
        function addNumber (a, b){
            return a + b;
        }
        function multiplyNumber (a, b){
            return a * b;
        }

    -Open-CLose Principle
        -function should be open expansion but close to modification

        //v1
        function login(username, password){
            //login logic considering username as well
        }
        //v2
        function login(username, password){
            //login logic considering email or phoneno as well
        }
        //v2
        function login(username, password){
            //login logic considering email or phoneno as well
        }
        function loginwithPhone(phone, password){
            //logic with phone no
        }

    -Liskov Subtitution Principle
    ``js
    function paywithesewa(){

    }
    function order(){
        //...
        paywithesewa()
    }
    //substituting any part of your function
    function payWithKhalti(){

    }
    function order(){
        payWithKhalti()
    }

    -Interface Segretation Principle
        -breakdown anything possible into interface

        ``ts
        interface IUser {
            name:string;
            email: string;
        }
        class User implements IUser{
            name;
            email;
        }
        class Admin implements IUser{
            name: string;
            email: string;
        }
    -Dependency Inversion Principle
    ```ts
    class User {
        constructor(userSvc){

        }
    }
    class UserService{

    }

    new User(new UserService())

### 4 piller of OOPS

1.Encapsulation  
 - security/ usability/ accessibility of class properties or methods
 - Access Modifier: private, protected,
  public -> private public

2.Abstraction
-Data to be used, then use obj

3.Inheritance
-reusaility of a class

4.Polymerphism - Multiple form/definition/structure

    #DSA data type structure and OOPs


###
````jsx
    src/

### Run ts in your project
    -'package.json'
        -`type: "common" or type: "module"`
    -