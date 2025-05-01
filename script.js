/*Welcome to the script file! Your 1st time here, you should update
  the BASIC INFO section to include your name and website/social 
  media link (if desired). Most of the time, you will just come
  here to update the POSTS ARRAY. However, you can also edit or
  add your own scripts to do whatever you like!*/

//TABLE OF CONTENTS
  // 1. Basic Info
  // 2. Posts Array
  // 3. Creating HTML Sections to Be Inserted (Header, Footer, etc)
  // 4. Inserting the Sections Into our Actual HTML Pages

//-----------------------------

//==[ 1. BASIC INFO ]==

let blogName = "הבלוג של דין המגניב";
let authorName = "דין המגניב";
let authorLink = "https://soundcloud.com/king_babar"; // Enter your website, social media, etc. Some way for people to tell you they like your blog! (Leaving it empty is okay too)

//-----------------------------

//==[ 2. POSTS ARRAY ]==

/*Each time you make a new post, add the filepath here at the top of postsArray.
  This will cause all the right links to appear and work.
  NOTE: It's important to follow this exact naming convention, because the scripts
  below are expecting it ( 'posts/YYYY-MM-DD-Title-of-Your-Post.html', ). You can
  alter the scripts if you want to use a different naming convention*/
/*UPDATE: as of version 1.3, you may omit the date if you would like. But if you
  use a date it must still follow that format.*/
  let postsArray = [
    ["posts/2025-05-01-Item.html"],
    ["posts/2025-04-30-MemorialDay.html"],
    ["posts/2025-04-30-Laundry.html"],
    ["posts/2025-04-29-Re4Thoughts.html"],
    ["posts/2025-04-29-ipod-touch"],
    ["posts/2025-04-29-First-Post"],
  ];
    //XXXXXXXXXXXXXXXXXXXXXXXXXXXXX
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXX

/*CAUTION!! BEGINNING OF MORE ADVANCED SECTION!
  For default functionality, you DO NOT have to touch anything beyond this point.
  Things get more complicated here, so if you are unfamiliar with Javascript,
  your site may break. That's okay though, you can always paste back in the code
  from the Zonelets starter files :) */

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXX

//==[ 3. GENERATING THE HTML SECTIONS TO BE INSERTED ]==

let url = window.location.pathname;

//The date format to look for is 4 digits, hyphen, 2 digits, hyphen, 2 digits, hyphen.
const postDateFormat = /\d{4}\-\d{2}\-\d{2}\-/;

//Check if you are in posts (if so, the links will have to go up a directory)
let relativePath = ".";
if ( url.includes("posts/") ) {
  relativePath = "..";
}

//Generate the Header HTML, a series of list items containing links.
let headerHTML = '<ul> <li><a href="' + relativePath + '/about.html">אודות</a></li>' + 
'<li><a href="' + relativePath + '/archive.html">ארכיון</a></li>' +
'<li><a href="' + relativePath + '/index.html">דף הבית</a></li> </ul>';

//Generate the Footer HTML, which uses the variables defined in the BASIC INFO section above to list info about the site.
//Note: feel free to remove the references to Zonelets and Neocities! Just be careful not to delete any necessary HTML closing tags or other syntax.
let footerHTML = "<hr><p>" + blogName + " is written by <a href='" + authorLink + "'>" + authorName + "</a>. " +
  "מוזמנים להקשיב ל <a href='" + authorLink + "' target='_blank'>מוזיקה המחורבנת שלי</a>!</p>" + '<a href="/not_found.html"><button class="btn-90s-contact">צרו קשר</button></a>'

//To do the following stuff, we want to know where we are in the posts array (if we're currently on a post page).
let currentIndex = -1;
let currentFilename = url.substring(url.lastIndexOf('posts/'));
//Depending on the web server settings (Or something?), the browser url may or may not have ".html" at the end. If not, we must add it back in to match the posts array. (12-19-2022 fix)
if ( ! currentFilename.endsWith(".html") ) {
    currentFilename += ".html";
}
let i;
for (i = 0; i < postsArray.length; i++) {
  if ( postsArray[i][0] === currentFilename ) {
    currentIndex = i;
  }
}

//Convert the post url to readable post name. E.g. changes "2020-10-10-My-First-Post.html" to "My First Post"
//Or pass along the "special characters" version of the title if one exists
function formatPostTitle(i) {
  // Check if there is an alternate post title
  if ( postsArray[i].length > 1 ) {
    //Remember how we had to use encodeURI for special characters up above? Now we use decodeURI to get them back.
    return decodeURI(postsArray[i][1]);
  } else { 
  //If there is no alternate post title, check if the post uses the date format or not, and return the proper title
	if (  postDateFormat.test ( postsArray[i][0].slice( 6,17 ) ) ) {
	  return postsArray[i][0].slice(17,-5).replace(/-/g," ");
    } else {
      return postsArray[i][0].slice(6,-5).replace(/-/g," ");
    }
  }
}

//Get the current post title and date (if we are on a post page)
let currentPostTitle = "";
let niceDate = "";
if ( currentIndex > -1 ) {
  currentPostTitle = formatPostTitle( currentIndex );
  //Generate the "nice to read" version of date
  if (  postDateFormat.test ( postsArray[currentIndex][0].slice( 6,17 ) ) ) {
    let monthSlice = postsArray[currentIndex][0].slice( 11,13 );
    let month = "";
    if ( monthSlice === "01") { month = "Jan";}
    else if ( monthSlice === "02") { month = "Feb";}
    else if ( monthSlice === "03") { month = "Mar";}
    else if ( monthSlice === "04") { month = "Apr";}
    else if ( monthSlice === "05") { month = "May";}
    else if ( monthSlice === "06") { month = "Jun";}
    else if ( monthSlice === "07") { month = "Jul";}
    else if ( monthSlice === "08") { month = "Aug";}
    else if ( monthSlice === "09") { month = "Sep";}
    else if ( monthSlice === "10") { month = "Oct";}
    else if ( monthSlice === "11") { month = "Nov";}
    else if ( monthSlice === "12") { month = "Dec";}
	niceDate = postsArray[currentIndex][0].slice( 14,16 ) + " " + month + ", " + postsArray[currentIndex][0].slice( 6,10 );
  }
}

//Generate the Post List HTML, which will be shown on the "Archive" page.

function formatPostLink(i) {
  let postTitle_i = "";
  if ( postsArray[i].length > 1 ) {
    postTitle_i = decodeURI(postsArray[i][1]);
  } else {
	if (  postDateFormat.test ( postsArray[i][0].slice( 6,17 ) ) ) {
	  postTitle_i = postsArray[i][0].slice(17,-5).replace(/-/g," ");
    } else {
      postTitle_i = postsArray[i][0].slice(6,-5).replace(/-/g," ");
    }
  }
  if (  postDateFormat.test ( postsArray[i][0].slice( 6,17 ) ) ) {
    return '<li><a href="' + relativePath + '/'+ postsArray[i][0] +'">' + postsArray[i][0].slice(6,16) + " \u00BB " + postTitle_i + '</a></li>';
  } else {
    return '<li><a href="' + relativePath + '/'+ postsArray[i][0] +'">' + postTitle_i + '</a></li>';
  }
}

let postListHTML = "<ul>";
for ( let i = 0; i < postsArray.length; i++ ) {
  postListHTML += formatPostLink(i);
}
postListHTML += "</ul>";

//Generate the Recent Post List HTML, which can be shown on the home page (or wherever you want!)
let recentPostsCutoff = 3; //Hey YOU! Change this number to set how many recent posts to show before cutting it off with a "more posts" link.
let recentPostListHTML = "<h2>הקלטות אחרונות:</h2><ul>";
let numberOfRecentPosts = Math.min( recentPostsCutoff, postsArray.length );
for ( let i = 0; i < numberOfRecentPosts; i++ ) {
  recentPostListHTML += formatPostLink(i);
}
/*If you've written more posts than can fit in the Recent Posts List,
  then we'll add a link to the archive so readers can find the rest of
  your wonderful posts and be filled with knowledge.*/
if ( postsArray.length > recentPostsCutoff ) {
  recentPostListHTML += '<li class="moreposts"><a href=' + relativePath + '/archive.html>\u00BB more posts</a></li></ul>';
} else {
  recentPostListHTML += "</ul>";
}

//Generate the Next and Previous Post Links HTML
let nextprevHTML = "";
let nextlink = "";
let prevlink = "";

/*If you're on the newest blog post, there's no point to
 a "Next Post" link, right? And vice versa with the oldest 
 post! That's what the following code handles.*/
if ( postsArray.length < 2 ) {
  nextprevHTML = '<a href="' + relativePath + '/index.html">Home</a>';
} else if ( currentIndex === 0 ) {
  prevlink = postsArray[currentIndex + 1][0];
  nextprevHTML = '<a href="' + relativePath + '/index.html">Home</a> | <a href="'+ relativePath + '/' + prevlink +'">Previous Post \u00BB</a>';
} else if ( currentIndex === postsArray.length - 1 ) {
  nextlink = postsArray[currentIndex - 1][0];
  nextprevHTML = '<a href="' + relativePath + '/' + nextlink +'">\u00AB Next Post</a> | <a href="' + relativePath + '/index.html">Home</a>';
} else if ( 0 < currentIndex && currentIndex < postsArray.length - 1 ) {
  nextlink = postsArray[currentIndex - 1][0];
  prevlink = postsArray[currentIndex + 1][0];
  nextprevHTML = '<a href="' + relativePath + '/'+ nextlink +'">\u00AB Next Post</a> | <a href="' + relativePath + '/index.html">Home</a> | <a href="' + relativePath + '/'+ prevlink +'">Previous Post \u00BB</a>';
}

//-----------------------------

//==[ 4. INSERTING THE SECTIONS INTO OUR ACTUAL HTML PAGES ]==

/*Here we check if each relevant div exists. If so, we inject the correct HTML!
  NOTE: All of these sections are optional to use on any given page. For example, if there's 
  one particular blog post where we don't want the footer to appear, 
  we simply don't put a <div id="footer"> on that page.*/

if (document.getElementById("nextprev")) {
  document.getElementById("nextprev").innerHTML = nextprevHTML;
}
if (document.getElementById("postlistdiv")) {
  document.getElementById("postlistdiv").innerHTML = postListHTML;
}
if (document.getElementById("recentpostlistdiv")) {
  document.getElementById("recentpostlistdiv").innerHTML = recentPostListHTML;
}
if (document.getElementById("header")) {
  // Wrap header content in a flex container for horizontal layout
  document.getElementById("header").innerHTML = `
    <div id="header-flex" style="display: flex; align-items: center; gap: 1.5em;">
      ${headerHTML}
    </div>
  `;

  // ==[ 5. DYNAMIC COUNTER INJECTION (INLINE IN HEADER) ]==
  // ערכי ה-counter
  const daysAlcohol = 161;
  const daysCigarettes = 46;

  // Add CSS for the counter and header flex container
  const style = document.createElement('style');
  style.textContent = `
    #header-flex ul {
      margin: 0;
      padding: 0;
      display: flex;
      gap: 1em;
      list-style: none;
    }
    #header-flex li {
      display: inline;
    }
    #counter {
      display: inline-block;
      margin-right: 0;
      background: rgba(0, 0, 0, 0.07);
      color: #2a4a4d;
      border: 1px solid #08a;
      padding: 0.2em 0.6em;
      font-family: 'Orbitron', sans-serif;
      font-size: 0.85em;
      line-height: 1.4;
      vertical-align: middle;
      border-radius: 6px;
      opacity: 0;
      transform: scale(0.95);
      transition: opacity 0.5s, transform 0.5s;
    }
  `;
  document.head.appendChild(style);

  // יוצרים את <span id="counter"> עם התוכן
  const counterSpan = document.createElement('span');
  counterSpan.id = 'counter';
  counterSpan.innerHTML = `
    ללא אלכוהול: ${daysAlcohol} ימים&nbsp;|&nbsp;
    ללא סיגריות: ${daysCigarettes} ימים&nbsp;|&nbsp;
    רק להיום
  `;

  // מוסיפים אותו לסוף ה-header-flex
  document.getElementById("header-flex").appendChild(counterSpan);

  // Trigger the fade-in and scale animation
  setTimeout(() => {
    counterSpan.style.opacity = 1;
    counterSpan.style.transform = "scale(1)";
  }, 0);
}

if (document.getElementById("blogTitleH1")) {
  document.getElementById("blogTitleH1").innerHTML = blogTitle;
}
if (document.getElementById("postTitleH1")) {
  document.getElementById("postTitleH1").innerHTML = currentPostTitle;
}
if (document.getElementById("postDate")) {
  document.getElementById("postDate").innerHTML = niceDate;
}
if (document.getElementById("footer")) {
  document.getElementById("footer").innerHTML = footerHTML;
}

//Dynamically set the HTML <title> tag from the postTitle variable we created earlier
//The <title> tag content is what shows up on browser tabs
if (document.title === "Blog Post") {
  document.title = currentPostTitle;
}
