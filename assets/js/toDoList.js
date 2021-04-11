
var UserList = (JSON.parse(localStorage.getItem('UserStorage')) == null ? [] : UserList = JSON.parse(localStorage.getItem('UserStorage')));
let loginUser = JSON.parse(localStorage.getItem('LoginStorage'));
let taskList = [];
console.log(loginUser);

$(document).ready(function () {
    $('#headerTitle').text(loginUser.name + "'s Task List");

    $('#datetimepicker5').datetimepicker({
        minDate: new Date()  // disable past date
    });

    for (let n = 0; n < UserList.length; n++) {
        if (UserList[n].id == loginUser.id) {
            taskList= UserList[n].taskList;  //Update task in local storage
            localStorage.setItem('UserStorage', JSON.stringify(UserList));
            break;
        }
    }
    if (taskList.length > 0) {
        bindToDoList();
    }

    /// Add task on button click
    $('#btnAdd').click(function () {

        if ($('#txtTask').val().length != 0 && $('#txtDate').val() != '') {
            console.log($('#txtDate').val());
            let Taskcount = taskList.length + 1;
            let obj = {
                taskNo: Taskcount,
                name: $('#txtTask').val() + ' On ' + $('#txtDate').val()
            };

            taskList.push(obj);
            for (let j = 0; j < UserList.length; j++) {
                if (UserList[j].id == loginUser.id) {
                    UserList[j].taskList = taskList;  //Update task in local storage

                    localStorage.setItem('UserStorage', JSON.stringify(UserList));
                    break;
                }
            }

            let x = $('.container').html();
            let y = '<div class="alert alert-success alert-dismissible fade in">'+
                '<a href="#" class="close" data-dismiss="alert" aria-label="close" onclick="deleteTask(' + Taskcount + ')";>×</a>'
                + $('#txtTask').val() + ' On ' + $('#txtDate').val() + '</div>';
            $('.container').html(y + x);
            $('#txtTask').val("");

        } else alert("Enter date & task!");
    });

    /// When Task is clicked
    $(document).on('click', '.alert', function() {
        if ($(this).css('text-decoration-line') == "none")
            $(this).css('text-decoration-line', 'line-through');
        else
            $(this).css('text-decoration-line', 'none');
    });
});

/// veiw Task list
let bindToDoList = function () {

    let html = $('.container').html();
    let taskHTML=''

    let url = "https://jsonplaceholder.typicode.com/posts/1";
    $.ajax({
        url: url,
        type: 'GET'
    }).then(function (data, textStatus, promise) {
        debugger;
        console.log("Successfuly made an API call");

        //populate already saved task list after the successful API call (ajax call: 2)
        for (let i = 0; i < taskList.length; i++) {

            taskHTML += '<div class="alert alert-success alert-dismissible fade in">'
                + '<a href="#" class="close" data-dismiss="alert" aria-label="close"  onclick="deleteTask(' + taskList[i].taskNo + ')";>×</a>'
                + taskList[i].name + '</div>';
        }

        $('.container').html(taskHTML + html);

        return promise;
    }).fail(function () {
        //fail handler
    });
}

let deleteTask = function (num) {
    ///delete from Task list
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].taskNo == num) {
            taskList.splice(i, 1); // remove task from list
            break;
        }
    }

    /// Update task in UserStorage after delete
    for (let j = 0; j < UserList.length; j++) {
        if (UserList[j].id == loginUser.id) {
            UserList[j].taskList = taskList;

            localStorage.setItem('UserStorage', JSON.stringify(UserList));
            break;
        }
    }
}
