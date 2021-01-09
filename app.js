const myform = document.getElementById('myForm');

myform.addEventListener('submit',saveBookmarks);

function saveBookmarks(e){
    e.preventDefault();

    let siteName = document.getElementById('siteName').value;
    let siteUrl = document.getElementById('siteUrl').value;
    
    if(!siteName || !siteUrl){
        alert("Please fill in the form");
        return false;
    }

    let expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    let regex = new RegExp(expression);
    
    if(!siteUrl.match(regex)){
        alert("Invalid url, Please fill the form correctly")
        return false;
    }

    let bookmark = {
        name:siteName,
        url:siteUrl,
    }
    // console.log(bookmark)
     
    if(localStorage.getItem('bookmarks')===null){
        let bookmarks = []
        bookmarks.push(bookmark)
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks))
        // console.log(localStorage.getItem("bookmarks"))
    }
    else{
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
        bookmarks.push(bookmark)
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks))
        // console.log(localStorage.getItem("bookmarks"))

    }
    fetchBookmarks()


}

function fetchBookmarks(){
    let bookmarksDiv = document.getElementById('bookmarksDiv')
    bookmarksDiv.innerHTML=""
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
    bookmarksDiv.innerHTML=""
    for(let i=0;i<bookmarks.length;i++){
        let name = bookmarks[i].name;
        let url = bookmarks[i].url;

        bookmarksDiv.innerHTML+='<div class="nav bg-dark text-light mr-4  my-2">'+
        '<h3>'+'<span class="siteName">'+name+'</span>'+
        ' <a class="btn btn-primary" target="_blank" href="'+url+'">Visit</a> ' +
        ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
        '</h3>'+
        '</div>';
    }

}

function deleteBookmark(url){
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
    for (let i=0;i<bookmarks.length;i++){
        if (bookmarks[i].url===url){
            bookmarks.splice(i,1)
        }
    }
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks))
    fetchBookmarks()

}