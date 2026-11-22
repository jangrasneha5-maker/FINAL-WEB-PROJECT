/*
  MODERN MUSICIAN - DOM PRACTICE VERSION

  This project uses the JavaScript concepts from the shared class examples:
  variables, functions, objects, loops, strings, arrays/HTMLCollections,
  DOM selection, styles, attributes, createElement(), appendChild(),
  parentElement, and click/input/change/keydown/submit events.

  No framework is used. Read the numbered sections alongside DOM_GUIDE.md.
*/

// --------------------------------------------------
// 1. SMALL HELPERS TO ADD / REMOVE CSS CLASSES
// --------------------------------------------------
// This uses getAttribute(), setAttribute(), hasAttribute(), split(),
// indexOf(), loops, and removeAttribute() from the DOM/string lessons.

function hasCssClass(element, className) {
  if (element == null || !element.hasAttribute("class")) {
    return false;
  }

  var classNames = element.getAttribute("class").split(" ");
  return classNames.indexOf(className) !== -1;
}

function addCssClass(element, className) {
  if (element != null && !hasCssClass(element, className)) {
    var oldClasses = element.getAttribute("class");

    if (oldClasses == null || oldClasses === "") {
      element.setAttribute("class", className);
    } else {
      element.setAttribute("class", oldClasses + " " + className);
    }
  }
}

function removeCssClass(element, className) {
  if (element != null && element.hasAttribute("class")) {
    var oldClasses = element.getAttribute("class").split(" ");
    var newClasses = "";

    for (var i = 0; i < oldClasses.length; i++) {
      if (oldClasses[i] !== "" && oldClasses[i] !== className) {
        if (newClasses !== "") {
          newClasses = newClasses + " ";
        }
        newClasses = newClasses + oldClasses[i];
      }
    }

    if (newClasses === "") {
      element.removeAttribute("class");
    } else {
      element.setAttribute("class", newClasses);
    }
  }
}

// --------------------------------------------------
// 2. SELECT ELEMENTS + MOBILE NAVIGATION
// --------------------------------------------------
// The page has one menu button and one navigation list.
var menuToggleItems = document.getElementsByClassName("menu-toggle");
var menuToggle = menuToggleItems[0];
var navLinks = document.getElementById("nav-links");
var navLinkItems = document.getElementsByClassName("nav-link");

function closeMenu() {
  if (menuToggle != null && navLinks != null) {
    removeCssClass(navLinks, "open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    removeCssClass(document.body, "menu-open");
  }
}

if (menuToggle != null && navLinks != null) {
  menuToggle.addEventListener("click", function () {
    if (hasCssClass(navLinks, "open")) {
      closeMenu();
    } else {
      addCssClass(navLinks, "open");
      menuToggle.setAttribute("aria-expanded", "true");
      menuToggle.setAttribute("aria-label", "Close navigation menu");
      addCssClass(document.body, "menu-open");
    }
  });
}

for (var a = 0; a < navLinkItems.length; a++) {
  navLinkItems[a].addEventListener("click", closeMenu);
}

// If the browser window becomes wider while the menu is open, close it.
window.addEventListener("resize", function () {
  if (window.innerWidth > 700) {
    closeMenu();
  }
});

// Mark the current page by reading each link's data-page attribute.
var pageName = window.location.pathname.split("/").pop();
if (pageName === "" || pageName == null) {
  pageName = "index.html";
}

for (var b = 0; b < navLinkItems.length; b++) {
  if (navLinkItems[b].getAttribute("data-page") === pageName) {
    addCssClass(navLinkItems[b], "active");
    navLinkItems[b].setAttribute("aria-current", "page");
  } else {
    removeCssClass(navLinkItems[b], "active");
    if (navLinkItems[b].hasAttribute("aria-current")) {
      navLinkItems[b].removeAttribute("aria-current");
    }
  }
}

// --------------------------------------------------
// 3. MAKE THE PAGE CONTENT VISIBLE
// --------------------------------------------------
// CSS handles the appearance. This loop adds the class expected by the CSS.
var revealItems = document.getElementsByClassName("reveal");
for (var c = 0; c < revealItems.length; c++) {
  addCssClass(revealItems[c], "is-visible");
}

// --------------------------------------------------
// 4. SELECT A MUSIC TRACK
// --------------------------------------------------
// Add your own licensed MP3 files in assets/audio/ with these filenames.
var tracks = {
  midnight: {
    title: "Midnight Dreams",
    src: "assets/audio/midnight-dreams.mp3"
  },
  electric: {
    title: "Electric Nights",
    src: "assets/audio/electric-nights.mp3"
  },
  lost: {
    title: "Lost in Sound",
    src: "assets/audio/lost-in-sound.mp3"
  }
};

var audio = document.getElementById("audio-player");
var playerTitle = document.getElementById("player-title");
var playerStatus = document.getElementById("player-status");
var playButtons = document.getElementsByClassName("play-button");

function chooseTrack(trackId) {
  if (audio != null && tracks[trackId] != null) {
    // setAttribute() changes the audio source and reveals its native controls.
    audio.setAttribute("src", tracks[trackId].src);
    audio.setAttribute("controls", "controls");
    addCssClass(audio, "audio-ready");

    if (playerTitle != null) {
      playerTitle.textContent = tracks[trackId].title;
    }
    if (playerStatus != null) {
      playerStatus.textContent = "Track selected. Use the audio controls to play it.";
    }

    // parentElement demonstrates DOM traversal: button -> album art -> music card.
    for (var d = 0; d < playButtons.length; d++) {
      var buttonTrack = playButtons[d].getAttribute("data-track");
      var musicCard = playButtons[d].parentElement.parentElement;
      var playIcons = playButtons[d].getElementsByClassName("play-icon");

      if (buttonTrack === trackId) {
        addCssClass(playButtons[d], "is-selected");
        addCssClass(musicCard, "is-selected");
        if (playIcons.length > 0) {
          playIcons[0].textContent = "✓";
        }
      } else {
        removeCssClass(playButtons[d], "is-selected");
        removeCssClass(musicCard, "is-selected");
        if (playIcons.length > 0) {
          playIcons[0].textContent = "▶";
        }
      }
    }
  }
}

// Use let in the loop so each click listener reads the correct button.
for (let e = 0; e < playButtons.length; e++) {
  playButtons[e].addEventListener("click", function () {
    var trackId = playButtons[e].getAttribute("data-track");
    chooseTrack(trackId);
  });
}

// --------------------------------------------------
// 5. SEARCH + FILTER THE DISCOGRAPHY
// --------------------------------------------------
var musicSearch = document.getElementById("music-search");
var genreFilter = document.getElementById("genre-filter");
var catalogueCards = document.getElementsByClassName("catalogue-card");
var resultsMessage = document.getElementById("music-results");
var noMusicResults = document.getElementById("no-music-results");

function filterMusic() {
  var searchText = "";
  var selectedGenre = "all";
  var visibleCount = 0;

  if (musicSearch != null) {
    searchText = musicSearch.value.toLowerCase();
  }
  if (genreFilter != null) {
    selectedGenre = genreFilter.value;
  }

  for (var f = 0; f < catalogueCards.length; f++) {
    var title = catalogueCards[f].getAttribute("data-title");
    var genre = catalogueCards[f].getAttribute("data-genre");

    if (title == null) {
      title = "";
    }
    title = title.toLowerCase();

    // indexOf() returns -1 when the search text is not found.
    var titleMatches = title.indexOf(searchText) !== -1;
    var genreMatches = selectedGenre === "all" || genre === selectedGenre;

    if (titleMatches && genreMatches) {
      catalogueCards[f].style.display = "";
      visibleCount = visibleCount + 1;
    } else {
      catalogueCards[f].style.display = "none";
    }
  }

  if (resultsMessage != null) {
    resultsMessage.textContent = "Showing " + visibleCount + " releases";
  }

  // Use hidden as an attribute and update it with setAttribute/removeAttribute.
  if (noMusicResults != null) {
    if (visibleCount === 0) {
      if (noMusicResults.hasAttribute("hidden")) {
        noMusicResults.removeAttribute("hidden");
      }
    } else {
      if (!noMusicResults.hasAttribute("hidden")) {
        noMusicResults.setAttribute("hidden", "");
      }
    }
  }
}

if (musicSearch != null) {
  musicSearch.addEventListener("input", filterMusic);
}
if (genreFilter != null) {
  genreFilter.addEventListener("change", filterMusic);
}

// --------------------------------------------------
// 6. FILTER TOUR DATES
// --------------------------------------------------
var tourFilterButtons = document.getElementsByClassName("filter-chip");
var tourEvents = document.getElementsByClassName("tour-event");

function filterTours(selectedFilter) {
  for (var g = 0; g < tourEvents.length; g++) {
    var eventStatus = tourEvents[g].getAttribute("data-status");

    if (selectedFilter === "all" || eventStatus === selectedFilter) {
      tourEvents[g].style.display = "";
    } else {
      tourEvents[g].style.display = "none";
    }
  }

  for (var h = 0; h < tourFilterButtons.length; h++) {
    if (tourFilterButtons[h].getAttribute("data-tour-filter") === selectedFilter) {
      addCssClass(tourFilterButtons[h], "active");
    } else {
      removeCssClass(tourFilterButtons[h], "active");
    }
  }
}

for (let i = 0; i < tourFilterButtons.length; i++) {
  tourFilterButtons[i].addEventListener("click", function () {
    var selectedFilter = tourFilterButtons[i].getAttribute("data-tour-filter");
    filterTours(selectedFilter);
  });
}

// --------------------------------------------------
// 7. GALLERY LIGHTBOX (CHANGE IMAGE ATTRIBUTES)
// --------------------------------------------------
var galleryItems = document.getElementsByClassName("gallery-item");
var galleryDialog = document.getElementById("gallery-dialog");
var lightboxImage = document.getElementById("lightbox-image");
var lightboxCaption = document.getElementById("lightbox-caption");
var lightboxClose = document.getElementsByClassName("lightbox-close")[0];

function closeGallery() {
  if (galleryDialog != null && galleryDialog.hasAttribute("open")) {
    galleryDialog.removeAttribute("open");
    removeCssClass(document.body, "lightbox-open");
  }
}

for (let j = 0; j < galleryItems.length; j++) {
  galleryItems[j].addEventListener("click", function () {
    var imagesInsideButton = galleryItems[j].getElementsByTagName("img");

    if (galleryDialog != null && lightboxImage != null && lightboxCaption != null && imagesInsideButton.length > 0) {
      // Read the button's data attributes and put them into the lightbox image/text.
      lightboxImage.setAttribute("src", galleryItems[j].getAttribute("data-full-image"));
      lightboxImage.setAttribute("alt", imagesInsideButton[0].getAttribute("alt"));
      lightboxCaption.textContent = galleryItems[j].getAttribute("data-caption");

      // Open the dialog with the open attribute (instead of the unstudied showModal() method).
      galleryDialog.setAttribute("open", "");
      addCssClass(document.body, "lightbox-open");
    }
  });
}

if (lightboxClose != null) {
  lightboxClose.addEventListener("click", closeGallery);
}

// Escape key closes the gallery. The keydown event is in the class examples.
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeGallery();
  }
});

// --------------------------------------------------
// 8. CONTACT FORM + LIVE CHARACTER COUNTER
// --------------------------------------------------
// createElement() and appendChild() add a counter below the message box.
var messageInput = document.getElementById("message");
var contactForms = document.getElementsByClassName("contact-form");

if (messageInput != null && messageInput.parentElement != null) {
  var characterCounter = document.createElement("p");
  characterCounter.setAttribute("class", "message-character-count");
  characterCounter.setAttribute("aria-live", "polite");
  messageInput.parentElement.appendChild(characterCounter);

  function updateMessageCount() {
    var maxLength = messageInput.getAttribute("maxlength");
    var currentLength = messageInput.value.length;
    characterCounter.textContent = currentLength + " / " + maxLength + " characters (minimum 10)";

    if (currentLength >= 450) {
      characterCounter.style.color = "#ff5a55";
    } else {
      characterCounter.style.color = "#a4a09d";
    }
  }

  updateMessageCount();
  messageInput.addEventListener("input", updateMessageCount);
}

// Save contact form data through the Express API and MongoDB.
for (var k = 0; k < contactForms.length; k++) {
  contactForms[k].addEventListener("submit", async function (event) {
    event.preventDefault();
    var form = event.currentTarget;
    var formData = new FormData(form);
    var messageData = {
      name: formData.get("name"),
      email: formData.get("email"),
      topic: formData.get("topic") || "general",
      message: formData.get("message")
    };
    var note = form.querySelector(".form-note");
    var submitButton = form.querySelector("button[type='submit']");
    if (submitButton) submitButton.disabled = true;
    if (note) note.textContent = "Sending your message...";
    try {
      var response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(messageData)
      });
      var result = await response.json();
      if (!response.ok) throw new Error(result.message || "Message could not be saved.");
      window.location.href = "thank-you.html";
    } catch (error) {
      if (note) note.textContent = error.message + " Please try again.";
      if (submitButton) submitButton.disabled = false;
    }
  });
}

// Load homepage announcements from the local JSON file through Express.
var updatesList = document.getElementById("updates-list");
if (updatesList != null) {
  fetch("/api/updates").then(function (response) { return response.json(); }).then(function (updates) {
    updatesList.innerHTML = "";
    for (var u = 0; u < updates.length; u++) {
      var card = document.createElement("article");
      card.className = "update-card";
      var category = document.createElement("p"); category.className = "eyebrow"; category.textContent = updates[u].category;
      var heading = document.createElement("h3"); heading.textContent = updates[u].title;
      var description = document.createElement("p"); description.textContent = updates[u].description;
      var date = document.createElement("small"); date.textContent = updates[u].date;
      card.appendChild(category); card.appendChild(heading); card.appendChild(description); card.appendChild(date);
      updatesList.appendChild(card);
    }
  }).catch(function () { updatesList.textContent = "Updates are temporarily unavailable."; });
}

// Search the external iTunes API through our Express backend.
var externalSearchForm = document.getElementById("external-search-form");
if (externalSearchForm != null) {
  externalSearchForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    var term = document.getElementById("external-search-term").value;
    var resultsBox = document.getElementById("external-search-results");
    resultsBox.textContent = "Searching music...";
    try {
      var response = await fetch("/api/external/music?term=" + encodeURIComponent(term));
      var results = await response.json();
      if (!response.ok) throw new Error(results.message || "Search failed.");
      resultsBox.innerHTML = "";
      if (results.length === 0) { resultsBox.textContent = "No music results found."; return; }
      for (var m = 0; m < results.length; m++) {
        var item = document.createElement("article"); item.className = "external-result";
        var image = document.createElement("img"); image.src = results[m].artworkUrl || ""; image.alt = "Album artwork";
        var details = document.createElement("div");
        var title = document.createElement("h4"); title.textContent = results[m].trackName;
        var artist = document.createElement("p"); artist.textContent = results[m].artistName + " · " + results[m].collectionName;
        var link = document.createElement("a"); link.href = results[m].trackViewUrl; link.target = "_blank"; link.rel = "noopener"; link.textContent = "View track ↗";
        details.appendChild(title); details.appendChild(artist); details.appendChild(link); item.appendChild(image); item.appendChild(details); resultsBox.appendChild(item);
      }
    } catch (error) { resultsBox.textContent = error.message; }
  });
}

// Display tour records created in MongoDB. Existing sample cards remain as fallback.
var tourList = document.getElementById("tour-list");
if (tourList != null) {
  fetch("/api/tour").then(function (response) { return response.json(); }).then(function (events) {
    if (!Array.isArray(events) || events.length === 0) return;
    tourList.innerHTML = "";
    for (var t = 0; t < events.length; t++) {
      var eventCard = document.createElement("article"); eventCard.className = "tour-event"; eventCard.setAttribute("data-status", events[t].status);
      var date = new Date(events[t].date);
      var dateBox = document.createElement("div"); dateBox.className = "tour-date";
      var month = document.createElement("span"); month.textContent = date.toLocaleString("en", { month: "short" }).toUpperCase();
      var day = document.createElement("strong"); day.textContent = date.getDate();
      var year = document.createElement("small"); year.textContent = date.getFullYear();
      dateBox.appendChild(month); dateBox.appendChild(day); dateBox.appendChild(year);
      var main = document.createElement("div"); main.className = "tour-event-main";
      var heading = document.createElement("h3"); heading.textContent = events[t].eventName;
      var venue = document.createElement("p"); venue.textContent = events[t].city + " · " + events[t].venue;
      main.appendChild(heading); main.appendChild(venue);
      var status = document.createElement("span"); status.className = "event-state"; status.textContent = events[t].status;
      eventCard.appendChild(dateBox); eventCard.appendChild(main); eventCard.appendChild(status);
      if (events[t].ticketLink) { var ticket = document.createElement("a"); ticket.className = "button button-outline"; ticket.href = events[t].ticketLink; ticket.target = "_blank"; ticket.rel = "noopener"; ticket.textContent = "Tickets ↗"; eventCard.appendChild(ticket); }
      tourList.appendChild(eventCard);
    }
  }).catch(function () { /* Keep the original sample tour cards visible if the API is unavailable. */ });
}
