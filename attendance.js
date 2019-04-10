var app = new Vue({
    el: '#app',
    data: {
        senatorsSenate: [],
        senatorsSenateCopy: [],
        senatorsHouse: [],
        senatorsHouseCopy: [],
        stats: {
                democrats: 0,
                democratsPer: 0,
                republicans: 0,
                republicansPer: 0,
                independants: 0,
                independantsPer: 0,
                total: 0,
                totalPer: 0,
                }
        
    },
    methods: {
        percentages: function () {
            for(i=0; i< senatorsSenate; i++){
                if (this.senatorsSenate[i].party== 'D'){
                    this.stats.democrats++;
                    this.stats.democratsPer += this.senatorsSenate[i].votes_with_party_pct;
                }
            else if(this.senatorsSenate[i].party== 'D'){
                    this.stats.republicans++;
                    this.stats.republicansPer += this.senatorsSenate[i].votes_with_party_pct;
            }
            else if(this.senatorsSenate[i].party== 'I'){
                    this.stats.independants++;
                    this.stats.independantsPer += this.senatorsSenate[i].votes_with_party_pct;
            }
        }
            this.stats.total = this.stats.democrats + this.stats.republicans + this.stats.independants;
            this.totalPer = ((this.stats.democratsPer + this.stats.republicansPer + this.stats.independantsPer)/ this.stats.total).toFixed(2);
        },
        least
        
    }

});






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