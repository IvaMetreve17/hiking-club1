
  

///////// register forms ///////////
let formSubmit = document.getElementById('registration');
        formSubmit.addEventListener('submit',function(e){
            e.preventDefault()
            let form = e.target;
            let errors = {};

            let username = form.querySelector('[name = "username"]').value;
            if(username.length < 4) {
                errors.username = "მომხმარებლის სახელი უნდა შედგებოდეს მინ 4 სიმბოლოსგან";
            }

            let email = form.querySelector('[name = "email"]').value;
            if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
                errors.email = "მეილი არასწორია";
            }
            let phonenumber=form.querySelector('[name= "phonenumber"]').value;
            if(phonenumber.length=9){
                errors.phonenumber="მობილურის ნომერი უნდა შედგებოდეს 9 რიცხვისგან "
            }
                
            let age=form.querySelector('[name= "age"]').value;
            if(phonenumber.length < 18){
                errors.age="მინ ასაკი არის 18 წელი"
            }
            

            let password = form.querySelector('[name = "password"]').value;
            let password2 = form.querySelector('[name = "password2"]').value;

            if(password.length < 6 ){
                errors.password = "პაროლი უნდა შედგებოდეს მინ 6 სიმბოლოსგან";
            }
            if(password != password2){
                errors.password2 = "პაროლი არასწორია";
            }

            form.querySelectorAll('.error').forEach(item => {
                item.textContent = '';  
            });

            for ( let name in errors){
                let errorPlacaholder = document.getElementById('error_' + name);
                if(errorPlacaholder){
                    errorPlacaholder.textContent = errors [name]
                }
                form.querySelector('[name ="' + name +'"]').classList.add('error')
            }

          

            console.log(errors)
        })



        //////// get data from server///////////

        fetch('http://dummy.restapiexample.com/api/v1/employees',{
            method: 'GET',
            headers: {
                'Content-Type': 'aplication/JSON()'
            }
        })
        .then(function (response){
            if(response.status !== 200){
                throw "error";
            }
            return response.json();

        })
        .then(function(respData){
            console.log(respData.data);
            let fragment = document.createDocumentFragment();
            respData.data.forEach(item => {
                let li = document.createElement('li');
                li.setAttribute('class','li-list-people')
                li.textContent = item.id + " სახელი:" + item.employee_name +  "  ასაკი:"+ item.employee_age;
                
                fragment.appendChild(li);
            });
            let ul = document.getElementById('people-list');
                ul.appendChild( fragment);

        })
        .catch(function(error) {
            // console.log(error)
            if(error.status == 404){
                console.log("page not found",error.status)
            }else {
                console.log('server error')
            }
        })