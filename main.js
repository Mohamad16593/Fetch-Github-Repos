//main variables
let theInput = document.querySelector(".get-repos input");
let getButton = document.querySelector(".get-button");
let reposData = document.querySelector(".show-data");

getButton.onclick = function (){
    getRepos(); 
}

//Get Repos function
function getRepos(){
    if(theInput.value == ""){
        reposData.innerHTML = "<span>Plesase  Write Github Username</span>" ; 

    }else{
        fetch(`https://api.github.com/users/${theInput.value}/repos`)
        .then((response) => response.json() )
        .then((repos) => {
            //Empty the container
            reposData.innerHTML = "" ;

            //Loop on repos
            repos.forEach(repo => {
                //Create The main Div
                let mainDiv  = document.createElement('div');
                
                //Create Repo Name text
                let repoName = document.createTextNode(repo.name);

                //Append text to main div
                mainDiv.appendChild(repoName) ;

                //create repo URL Anchor
                let theUrl = document.createElement("a") ;

                //Create repo url text
                let urlText = document.createTextNode("Visit");

                //Append the Repo url text to anchor tag
                theUrl.appendChild(urlText) ;

                //Add href
                theUrl.href = `https://github.com/${theInput.value}/${repo.name}`;

                //set Attr Blanc
                theUrl.setAttribute('target' , '_blanck');

                //Append URL to div
                mainDiv.appendChild(theUrl);

                //Crreate Stars Count Span
                let starsSpan = document.createElement('span');

                //create the stars count text
                let starsText = document.createTextNode(`Stars ${repo.stargazers_count}`);

                //Add star text to star span
                starsSpan.appendChild(starsText);

                //append star span to div

                mainDiv.appendChild(starsSpan);

                //add class to main div

                mainDiv.className = 'repo-box' ;


                //append main div to container
                reposData.appendChild(mainDiv);

            });
        });

    }
}

