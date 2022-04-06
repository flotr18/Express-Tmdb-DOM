function input() {

    let save = document.getElementById("item").value;
    localStorage.setItem('text', save);
    let display = localStorage.getItem('text').replace(" ", "%20");
    fetch('https://api.themoviedb.org/3/search/movie?api_key=27beba95fd51654379e58b8e53c1c594&language=en-US&query=' + display + '&page=1&include_adult=false')
        .then((res) => {
            return res.json() // Convert Recepted Data into JSON Format
        })
        .then((data) => {


            console.log(data.results[0]); // Display Data

            let result = data.results[0];

            if (result === undefined){
                alert('Movie not found ! Try Again');
                document.getElementById('item').value = '';
            }



            let id = data.results[0].id; // To be used to find the youtube video key in a further request
            let img = document.querySelector("img"); // Select the img tag in the purpose to set src attribute to poster var
            let poster = data.results[0].poster_path; // Retrieve the path of the poster
            img.setAttribute("src","https://image.tmdb.org/t/p/w342/" + poster );
            document.getElementById('poster').style.display = "block"; // Change the attribute to block
            document.getElementById('story').innerHTML = data.results[0].overview; // Display the story
            document.getElementById('movie').innerHTML = data.results[0].original_title; // Display the title
            document.getElementById('date').innerHTML = data.results[0].release_date; // Display the release date
            document.getElementById('mark').innerHTML = data.results[0].vote_average; // Display the vote average

            let review = data.results[0].vote_average; // Review var is used to condition the rendering
            let mark = document.getElementById('review'); // Mark var is used to modify CSS which depends of Review Value

            if (review > 0 && review <= 4){
                mark.style.display = "inline-block"; // Changed display attribute from hidden to inline-block
                mark.style.backgroundColor = '#DB2360' // Depends of the average vote, the color will change
            }

            else if (review > 4 && review <= 8){
                mark.style.display = "inline-block"; // Changed display attribute from hidden to inline-block
                mark.style.backgroundColor = '#d2d530' // Depends of the average vote, the color will change
            }

            else {
                mark.style.display = "inline-block"; // Changed display attribute from hidden to inline-block

                mark.style.backgroundColor = '#1D8653' // Depends of the average vote, the color will change

            }




            fetch('https://api.themoviedb.org/3/movie/' + id + '/videos?api_key=27beba95fd51654379e58b8e53c1c594&language=en-US')
                .then((res) => {
                    return res.json() // Convert Recepted Data into JSON Format
                })
                .then((data) => {
                    console.log(data);
                    let video =  data.results[0].key; // Retrieved key youtube video by using id var
                    let b = document.querySelector("a");
                    b.setAttribute("href",'https://www.youtube.com/watch?v=' + video); // Set href attribute to youtube video link
                    let link = document.getElementById('link').style.display = "block"; // Changed display attribute from hidden to block



                });
        });
}












