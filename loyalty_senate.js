var app = new Vue({
    el: '#app',
    data: {
        senatorsSenate: [],
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
            for(i=0; i< this.senatorsSenate.length; i++){
                if (this.senatorsSenate[i].party== 'D'){
                    this.stats.democrats++;
                    this.stats.democratsPer += this.senatorsSenate[i].votes_with_party_pct;
                }
            else if(this.senatorsSenate[i].party== 'R'){
                    this.stats.republicans++;
                    this.stats.republicansPer += this.senatorsSenate[i].votes_with_party_pct;
            }
            else if(this.senatorsSenate[i].party== 'I'){
                    this.stats.independents++;
                    this.stats.independentsPer += this.senatorsSenate[i].votes_with_party_pct;
            }
        }
            this.stats.total = this.stats.democrats + this.stats.republicans + this.stats.independents;
            this.stats.totalPer = ((this.stats.democratsPer + this.stats.republicansPer + this.stats.independentsPer)/ this.stats.total).toFixed(2);
        },
            least_eng: function () {
                this.senatorsSenate.sort(function(a, b) {
                    return (b.votes_with_party_pct - a.votes_with_party_pct)
                })
                for(i=0;i<this.senatorsSenate.length/10;i++) {
                    this.stats.least.push(this.senatorsSenate[i])
                }
            },
            most_eng: function () {
                this.senatorsSenate.sort(function(a, b) {
                    return (a.votes_with_party_pct - b.votes_with_party_pct)
                })
                for(i=0;i<this.senatorsSenate.length/10;i++) {
                    this.stats.most.push(this.senatorsSenate[i])
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

fetch('https://api.propublica.org/congress/v1/113/senate/members.json', obj)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        app.senatorsSenate = data.results[0].members;
        // app.senatorsSenateCopy = data.results[0].members;

        app.partyfilter();
        app.least_eng();
        app.most_eng();

    })
    .catch(err => console.log())

