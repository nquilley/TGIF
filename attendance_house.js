var app = new Vue({
    el: '#app',
    data: {
        senatorsHouse: [],
        stats: {
                democrats: 0,
                democratsPer: 0,
                republicans: 0,
                republicansPer: 0,
                independents: 0,
                independentsPer: 0,
                total: 0,
                totalPer: 0,
                least: [],
                most: [],
                }
    },
    methods: {
        partyfilter: function () {
            for(i=0; i< this.senatorsHouse.length; i++){
                if (this.senatorsHouse[i].party== 'D'){
                    this.stats.democrats++;
                    this.stats.democratsPer += this.senatorsHouse[i].votes_with_party_pct;
                }
            else if(this.senatorsHouse[i].party== 'R'){
                    this.stats.republicans++;
                    this.stats.republicansPer += this.senatorsHouse[i].votes_with_party_pct;
            }
            else if(this.senatorsHouse[i].party== 'I'){
                    this.stats.independents++;
                    this.stats.independentsPer += this.senatorsHouse[i].votes_with_party_pct;
            }
        }
            this.stats.total = this.stats.democrats + this.stats.republicans + this.stats.independents;
            this.stats.totalPer = ((this.stats.democratsPer + this.stats.republicansPer + this.stats.independentsPer)/ this.stats.total).toFixed(2);
        },
            least_eng: function () {
                this.senatorsHouse.sort(function(a, b) {
                    return (b.missed_votes_pct - a.missed_votes_pct)
                })
                for(i=0;i<this.senatorsHouse.length/10;i++) {
                    this.stats.least.push(this.senatorsHouse[i])
                }
            },
            most_eng: function () {
                this.senatorsHouse.sort(function(a, b) {
                    return (a.missed_votes_pct - b.missed_votes_pct)
                })
                for(i=0;i<this.senatorsHouse.length/10;i++) {
                    this.stats.most.push(this.senatorsHouse[i])
                }
            }
        
    }

});



// ----------------------------Fetch------------------------------


let obj = {
    method: 'GET',
    headers: {
        'X-API-Key': "va2DpGEAbXjz1TDTl7uvxFpXxkjkzKArtVdDkfo2"
    }
}


fetch('https://api.propublica.org/congress/v1/113/house/members.json', obj)
.then(function (response) {
    return response.json();
})
.then(function (data) {
    app.senatorsHouse = data.results[0].members;
    app.partyfilter();
        app.least_eng();
        app.most_eng();

})
.catch(err => console.log())