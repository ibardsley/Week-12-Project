//When save is clicked take the data entered in the text fields and push to the main list or update the existing item
function save() {
    var read = document.getElementById('inputChoreIsComplete');
    if(read.checked == true) {
        choreList = JSON.parse(localStorage.getItem('listItem3')) ?? []
        var id
        choreList.length != 0 ? choreList.findLast((item) => id = item.id) : id = 0
        if(document.getElementById('inputChoreId').value) {
            choreList.forEach(value => {
                if(document.getElementById('inputChoreId').value == value.id){
                value.chore = document.getElementById('inputChoreTitle').value,
                value.child = document.getElementById('inputChildName').value,
                value.reward = document.getElementById('inputChoreReward').value,
                value.isComplete = 1
                }
            });
            document.getElementById('id').value = ""
        } else {
            var item = {
                id : id + 1,
                chore : document.getElementById('inputChoreTitle').value,
                child : document.getElementById('inputChildName').value,
                reward : document.getElementById('inputChoreReward').value,
                isComplete : 1,
            }
            choreList.push(item)
        }
        localStorage.setItem('listItem3', JSON.stringify(choreList))
    } else {
        choreList2 = JSON.parse(localStorage.getItem('listItem4')) ?? []
        var id
        choreList2.length != 0 ? choreList.findLast((item) => id = item.id) : id = 0
        if(document.getElementById('inputChoreId').value) {
            choreList2.forEach(value => {
                if(document.getElementById('inputChoreId').value == value.id){
                value.chore = document.getElementById('inputChoreTitle').value,
                value.child = document.getElementById('inputChildName').value,
                value.reward = document.getElementById('inputChoreReward').value,
                value.isComplete = 0
                }
            });
            document.getElementById('inputChoreId').value = ''
        } else {
            var item = {
                id : id + 1,
                chore : document.getElementById('inputChoreTitle').value,
                child : document.getElementById('inputChildName').value,
                reward : document.getElementById('inputChoreReward').value,
                isComplete : 0,
            }
            choreList2.push(item)
        }
        localStorage.setItem('listItem4', JSON.stringify(choreList2))
    }
    allData()
    document.getElementById('form').reset()
}

//when data is saved add info to a table along with the options to complete, edit or delete
function allData() {
    table.innerHTML = ``
    choreList = JSON.parse(localStorage.getItem('listItem4')) ?? []
    choreList.forEach(function (value, i) {
        var table = document.getElementById('table')
    //    if(value.isComplete == 0){
            table.innerHTML += `
            <tr>
                <td>${i+1}</td>
                <td>${value.chore}</td>
                <td>${value.child}</td>
                <td>${value.reward}</td>
                <td><button class="btn btn-sm btn-success" onclick="read(${value.id}, '${value.chore}', '${value.child}', ${value.reward})"><i class="fa fa-check"></i></button></td>
                <td><button class="btn btn-sm btn-warning" onclick="find(${value.id})"><i class="fa fa-edit"></i></button></td>
                <td><button class="btn btn-sm btn-danger" onclick="removeData4(${value.id})"><i class="fa fa-trash"></i></button></td>
            </tr> `
    //    }
    })
    table2.innerHTML = ``
    choreList2 = JSON.parse(localStorage.getItem('listItem3')) ?? []
    choreList2.forEach(function (value2, i) {
        var table2 = document.getElementById('table2')
       console.log(value2.isComplete);
    //    if(value2.isComplete == 1) {
            table2.innerHTML += `
            <tr>
                <td>${i+1}</td>
                <td>${value2.chore}</td>
                <td>${value2.child}</td>
                <td>${value2.reward}</td>
                <td><button class="btn btn-sm btn-success" onclick="read2(${value2.id},'${value2.chore}','${value2.child}', ${value2.reward})"><i class="fa fa-times"></i></button></td>
                <td><button class="btn btn-sm btn-warning" onclick="find(${value2.id})"><i class="fa fa-edit"></i></button></td>
                <td><button class="btn btn-sm btn-danger" onclick="removeData3(${value2.id})"><i class="fa fa-trash"></i></button></td>
            </tr> `
    //    }
    })
}

//remove data from the complete section
function removeData3(id){
    choreList = JSON.parse(localStorage.getItem('listItem3')) ?? []
    choreList = choreList.filter(function(value) {
        return value.id != id;
    });
    //localStorage.clear();
    localStorage.setItem('listItem3', JSON.stringify(choreList))
    allData()
}

//remove data from the incomplete section
function removeData4(id) {
    choreList = JSON.parse(localStorage.getItem('listItem4')) ?? []
    choreList = choreList.filter(function (value) {
        return value.id != id;
    })
    localStorage.setItem('listItem4', JSON.stringify(choreList))
    allData()
}

//when edit is clicked, display the info from the element
function find(id){
    choreList = JSON.parse(localStorage.getItem('listItem4')) ?? []
    choreList.forEach(function (value) {
        if(value.id == id){
            console.log(id);
            document.getElementById('inputChoreId').value = id
            document.getElementById('inputChoreTitle').value = value.chore
            document.getElementById('inputChildName').value = value.child
            document.getElementById('inputChoreReward').value = value.reward
        }
    })
}

//when complete is checked, move to the complete table
function read(id1, chore1, child1, reward1){
    if(id1) {
        var item = [{
            id : id1,
            chore : chore1,
            child : child1,
            reward : reward1,
            isComplete : 1,
        }];
        choreList = JSON.parse(localStorage.getItem('listitem3')) ?? []
        chores = item.concat(choreList);
        var itemString = JSON.stringify(chores);
        localStorage.setItem('listItem3', itemString);
    }
    choreList4 = JSON.parse(localStorage.getItem('listItem4')) ?? []
    choreList4 = choreList4.filter(function (value){
        return value.id != id1;
    });
    localStorage.setItem('listItem4', JSON.stringify(choreList4))
    allData()
}

//if the incomplete option is selected, move back to the incomplete table
function read2(id1, chore1, child1, reward1){
    if(id1){
        var item = [{
            id : id1,
            chore : chore1,
            child : child1,
            reward : reward1,
            isComplete : 1,
        }];
        choreList = JSON.parse(localStorage.getItem('listitem4')) ?? []
        chores = item.concat(choreList);
        var itemString = JSON.stringify(chores);
        localStorage.setItem('listItem4', itemString);
    }
    choreList3 = JSON.parse(localStorage.getItem('listItem3')) ?? []
    choreList3 = choreList3.filter(function (value){
        return value.id != id1;
    });
    localStorage.setItem('listItem3', JSON.stringify(choreList3))
    allData()
}