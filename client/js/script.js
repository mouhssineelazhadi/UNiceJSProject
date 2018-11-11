window.onload = init;

function init() {
    new Vue({
        el: '#app',
        data: {
            Restau: [0,1],
            page: 0,
            size:10,    
            cuisine:"",
            input:"",
            name:"",
            nbr:"",
            Id:""
        },
        mounted() {
            console.log("--- MOUNTED, appelée avant le rendu de la vue ---");
            this.getDataFromWebService();
            this.countRestaurants();
        },
        methods: {

            getDataFromWebService: function () {
                let url = "http://localhost:8080/api/restaurants?page="+this.page+"&name="+this.name;
                fetch(url).then((data) => {
                    console.log("les données sont arrivées !")
                    return data.json();
                }).then((dataEnJavaScript) => {
                    // ici on a bien un objet JS
                    this.Restau = dataEnJavaScript.data;
                });
                this.countRestaurants();
            },
            countRestaurants: function(){
                let url = "http://localhost:8080/api/restaurants/count";
                fetch(url).then((data) => {
                    return data.json();
                }).then((dataEnJavaScript)=>{
                        this.nbr=dataEnJavaScript.data;
                });
                  },
            addTodo: function () {
                var donneesFormulaire = new FormData();

                donneesFormulaire.append("nom",this.name);
                donneesFormulaire.append("cuisine",this.cuisine);

                let url = "http://localhost:8080/api/restaurants";
            
                fetch(url, {
                    method: "POST",
                    body: donneesFormulaire
                }).then((dataEnJavaScript)=>{
                    this.getDataFromWebService();}
                );            
                this.input = "";
            },
            remove: function (r) {
                this.name=r.name;
                this.id=r._id;
                this.cuisine=r.cuisine;
                console.log(r._id);
                let url = "http://localhost:8080/api/restaurants/" + this.id;
                this.name="";
                this.cuisine="";
                fetch(url, {
                    method: "DELETE",
                }).then((dataEnJavaScript)=>{
                    this.getDataFromWebService();}
                );
            },
            update1: function(r){
                this.name=r.name;
                this.id=r._id;
                this.cuisine=r.cuisine;
                
            },
            update: function()
            {
                var donneesFormulaire = new FormData();

                donneesFormulaire.append("nom",this.name);
                donneesFormulaire.append("cuisine",this.cuisine);

                let url = "http://localhost:8080/api/restaurants/"+this.id;
            
                fetch(url, {
                    method: "PUT",
                    body: donneesFormulaire
                }).then((dataEnJavaScript)=>{
                    this.getDataFromWebService();}
                );

            },
            getColor: function (index) {
                return (index % 2) ? 'red' : 'green';
            },

            search: function(){
                this.getDataFromWebService();
           },
           pageNext: function(){
                console.log("page suivante "+this.page);
                this.page++;
                this.getDataFromWebService();
           },
        
           pageBack: function(){
            console.log("page precedente "+this.page);
            if(this.page!==0){
            this.page--;
            }
            this.getDataFromWebService();
         }
        }
    })
}