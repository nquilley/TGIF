var app = new Vue({
    el: '#app',
    data: {
        senatorsSenate: [],
        senatorsSenateCopy: [],
        senatorsHouse: [],
        senatorsHouseCopy: [],
        // senators: [],
        // senatorsHouse: [],
        checkedBox: [], // it's an ARRAY
        // states: [],
        statesValue: 'all', //define this here for the default. it's already a value!

    },
    methods: {
        filterTableSenators: function() {
            const membersFilteredByCheckBox = generateByCheckbox(this.checkedBox, this.senatorsSenateCopy);
            const membersFilteredBySelect = filterBySelect(membersFilteredByCheckBox, this.statesValue);
        
            this.senatorsSenate = membersFilteredBySelect; // Set new displayed list
          },
        filterTableHouse: function() {
        const membersFilteredByCheckBox = generateByCheckbox(this.checkedBox, this.senatorsHouseCopy);
        const membersFilteredBySelect = filterBySelect(membersFilteredByCheckBox, this.statesValue);
    
        this.senatorsHouse = membersFilteredBySelect; // Set new displayed list
        }
    }

});


function generateByCheckbox(checkedBox, dataCopy) {

    if (checkedBox.length === 0 || checkedBox.length === 3) {
      return dataCopy; // Return original copy
    } else {
        var filteredCheckboxes = [];
        for (i = 0; i < dataCopy.length ; i++){
            if (checkedBox.includes(dataCopy[i].party)){ //use the copy as it doesn't change 
                filteredCheckboxes.push(dataCopy[i])
            }
        }
      // Filter members by party
      return filteredCheckboxes      //[{}, {}, {}...]  Return result
    }
  }
  
  function filterBySelect(membersFilteredByCheckBox, statesValue) {
    if (statesValue === 'all') {
      return membersFilteredByCheckBox
    } else { // Filter membersFilteredByCheckbox by state
        var filteredStates = [];
        for (i = 0; i < membersFilteredByCheckBox.length; i++){
            if(statesValue == membersFilteredByCheckBox[i].state){
                filteredStates.push(membersFilteredByCheckBox[i])
            }
        }
        return filteredStates // Return result
     }
  }


// ----------------------------Fetch------------------------------


let obj = {
    method: 'GET',
    headers: {
        'X-API-Key': "va2DpGEAbXjz1TDTl7uvxFpXxkjkzKArtVdDkfo2"
    }
}

fetch('https://api.propublica.org/congress/v1/113/senate/members.json', obj)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        app.senatorsSenate = data.results[0].members;
        app.senatorsSenateCopy = data.results[0].members;


    })
    .catch(err => console.log())

fetch('https://api.propublica.org/congress/v1/113/house/members.json', obj)
.then(function (response) {
    return response.json();
})
.then(function (data) {
    app.senatorsHouse = data.results[0].members;
    app.senatorsHouseCopy = data.results[0].members;

})
.catch(err => console.log())