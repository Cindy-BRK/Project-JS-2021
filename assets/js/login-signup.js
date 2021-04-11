
///////----------- Use localStorage  ------------

//https://javascript.info/localstorage
/////Clears the value of UserStorage
////localStorage.removeItem("UserStorage");

let UserList = [];

/// retrieve added data later, such as on page refresh or browser close/open...
UserList = (JSON.parse(localStorage.getItem('UserStorage')) == null ? [] : UserList = JSON.parse(localStorage.getItem('UserStorage')));
console.log(UserList);

/// on login button click
let Login = function () {
    $('#msgInvalid').hide()
    let validUser = false;
    let loginName= $('#loginName').val();
    let LoginPassword= $('#loginPassword').val();

    for (let i = 0; i < UserList.length; i++) {
        if (UserList[i].name == loginName && UserList[i].password == LoginPassword)
        {
            validUser = true;
            let loginUser = UserList[i];
            localStorage.setItem('LoginStorage', JSON.stringify(loginUser));
            break;
        }
    }
    if (validUser){
        window.location.href = "/assets/html/toDoList.html";
        $('#msgInvalid').hide()
    }

    else {
        $('#msgInvalid').text('Invalid user name or password');
        $('#msgInvalid').show()

    }
    //////Clears the value of MyKey
    //localStorage.removeItem("UserStorage");
}

/// on signup button click
let singup = function () {
    $('#msgSignup').hide()
    let count = (UserList == null ? 0 : UserList.length); //count number of user
    console.log(count);
    // add new user info into UserList
    let obj = {
        id: count + +1,
        name: $('#singupName').val(),
        email: $('#email').val(),
        password: $('#password').val(),
        taskList:[]
    };

    UserList.push(obj);
    console.log(UserList);

    //populate the localStorage item after the API call is made (ajax call: 1)
    //source : https://jsonplaceholder.typicode.com/

    let url = "https://jsonplaceholder.typicode.com/posts/1";
    $.ajax({
        url: url,
        type: 'GET'
    }).then(function (data, textStatus, promise) {
        debugger;
        console.log("Successfuly made an API call");
        localStorage.setItem('UserStorage', JSON.stringify(UserList));

        $('#msgSignup').text('Signup successful. You can login now.');
        $('#msgSignup').show()

        $('#singupName').val('');
        $('#email').val('');
        $('#password').val('');

        return promise;
    }).fail(function () {
        //fail handler
    });
}


