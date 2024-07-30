// Sample songs data
const songs = [
  {
    id: 1,
    name: "In the End",
    artist: "Linkin Park",
    img: "./images/In the End.jpeg",
    genre: "rock",
    source: "./songs/In the End.mp3",
  },
  {
    id: 2,
    name: "7_Ring",
    artist: "Ariana Grande",
    img: "./images/7_rings.png",
    genre: "pop",
    source: "./songs/7_Rings.mp3",
  },
  {
    id: 3,
    name: "Next_Level",
    artist: "A$ton Wyld",
    img: "./images/Next Level.jpeg",
    genre: "rock",
    source: "./songs/Next_Level.mp3",
  },
  {
    id: 4,
    name: "Your Power",
    artist: "Billie Eilish",
    img: "./images/Your Power.png",
    genre: "pop",
    source: "./songs/Your Power.mp3",
  },
  {
    id: 5,
    name: "Fake A Smile",
    artist: "Alan Walker",
    img: "./images/Fake A Smile.jpg",
    genre: "pop",
    source: "./songs/Fake A Smile.mp3",
  },
  {
    id: 6,
    name: "Baila Conmigo",
    artist: "Selena Gomez",
    img: "./images/Baila Conmigo.png",
    genre: "pop",
    source: "./songs/Baila Conmigo.mp3",
  },
  // Add more songs as needed
];

// Sample playlists data
let playlists = [
  { name: "Playlist 1", songs: [1, 2] },
  // Add more playlists as needed
];

let currentSongIndex = 0;
let currentGenreFilter = "all";

document.addEventListener("DOMContentLoaded", () => {
  showSongs();
  renderCurrentSong();
  renderAllPlaylists();
});

// Dark Mode
function toggleDarkMode() {
  var body = document.body;
  body.classList.toggle("dark-mode");
}

// Show Songs
function showSongs() {
  const genreFilter = document.getElementById("genreFilter");
  currentGenreFilter = genreFilter.value;

  const songList = document.getElementById("songList");
  songList.innerHTML = "";

  const filteredSongs =
    currentGenreFilter === "all"
      ? songs
      : songs.filter((song) => song.genre === currentGenreFilter);

  filteredSongs.forEach((song) => {
    const li = document.createElement("li");
    li.textContent = `${song.name} - ${song.artist}`;
    li.addEventListener("click", () => {
      currentSongIndex = songs.findIndex((s) => s.id === song.id);
      renderCurrentSong();
    });
    songList.appendChild(li);
  });
}

// Render Current Song
function renderCurrentSong() {
  const currentSong = songs[currentSongIndex];
  const audioElement = document.getElementById("player");

  // Set the source of the audio element
  audioElement.src = currentSong.source;

  // Play the audio
  audioElement.play();

  // Update the song card
  const songCard = document.getElementById("songCard");
  songCard.innerHTML = `
          <img src="${currentSong.img}" alt="${currentSong.name}">
          <p>${currentSong.name} </p>
          <p>${currentSong.artist}</p>
      `;
}

// Next Song
function playNext() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  renderCurrentSong();
}

// Previous Song
function playPrevious() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  renderCurrentSong();
}

// Song add to Playlist
function addToPlaylist() {
  const playlistName = prompt("Enter playlist name:");
  const playlistIndex = playlists.findIndex(
    (playlist) => playlist.name === playlistName
  );

  if (playlistIndex !== -1) {
    const songId = songs[currentSongIndex].id;

    if (!playlists[playlistIndex].songs.includes(songId)) {
      playlists[playlistIndex].songs.push(songId);
      alert("Song added to the playlist!");
    } else {
      alert("Song is already in the playlist.");
    }
  } else {
    alert("Playlist not found.");
  }
}

// Create New Playist
function createPlaylist() {
  const newPlaylistName = prompt("Enter the name for the new playlist:");

  if (newPlaylistName) {
    const newPlaylist = { name: newPlaylistName, songs: [] };
    playlists.push(newPlaylist);
    renderAllPlaylists();
  } else {
    alert("Please enter a valid playlist name.");
  }
}

// Remove Playlist
function removePlaylist() {
  const playlistName = prompt("Enter the name of the playlist to remove:");

  if (playlistName) {
    const playlistIndex = playlists.findIndex(
      (playlist) => playlist.name === playlistName
    );

    if (playlistIndex !== -1) {
      playlists.splice(playlistIndex, 1);
      renderAllPlaylists();
      alert("Playlist removed successfully!");
    } else {
      alert("Playlist not found.");
    }
  }
}

// Show Playlist Details
function renderAllPlaylists() {
  const allPlaylists = document.getElementById("allPlaylists");
  allPlaylists.innerHTML = "";

  playlists.forEach((playlist, index) => {
    const li = document.createElement("li");
    li.textContent = playlist.name;
    li.addEventListener("click", () => renderPlaylistSongs(index));
    allPlaylists.appendChild(li);
  });
}

//Render playlist song
function renderPlaylistSongs(playlistIndex) {
  const playlistSongs = playlists[playlistIndex].songs;
  const songList = document.getElementById("songList");
  songList.innerHTML = "";

  playlistSongs.forEach((songId) => {
    const song = songs.find((s) => s.id === songId);
    const li = document.createElement("li");
    li.textContent = `${song.name} - ${song.artist}`;
    li.addEventListener("click", () => {
      currentSongIndex = songs.findIndex((s) => s.id === song.id);
      renderCurrentSong();
    });
    songList.appendChild(li);
  });
}

//Search song part
function searchSong() {
  const searchInput = document.getElementById("searchSong");
  const searchQuery = searchInput.value.toLowerCase();

  const filteredSongs = songs.filter(
    (song) =>
      song.name.toLowerCase().includes(searchQuery) ||
      song.artist.toLowerCase().includes(searchQuery)
  );

  renderFilteredSongs(filteredSongs);
}

//Search Playlist
function searchPlaylist() {
  const searchInput = document.getElementById("searchPlaylist");
  const searchQuery = searchInput.value.toLowerCase();

  const filteredPlaylists = playlists.filter((playlist) =>
    playlist.name.toLowerCase().includes(searchQuery)
  );

  renderFilteredPlaylists(filteredPlaylists);
}

//Remove Song from playlist
function removeFromPlaylist() {
  const playlistName = prompt("Enter playlist name:");

  if (playlistName) {
    const playlistIndex = playlists.findIndex(
      (playlist) => playlist.name === playlistName
    );

    if (playlistIndex !== -1) {
      const songId = songs[currentSongIndex].id;
      const songIndex = playlists[playlistIndex].songs.indexOf(songId);

      if (songIndex !== -1) {
        playlists[playlistIndex].songs.splice(songIndex, 1);
        renderPlaylistSongs(playlistIndex);
        alert("Song removed from the playlist!");
      } else {
        alert("Song not found in the playlist.");
      }
    } else {
      alert("Playlist not found.");
    }
  }
}

//Show filtered Song
function renderFilteredSongs(filteredSongs) {
  const songList = document.getElementById("songList");
  songList.innerHTML = "";

  filteredSongs.forEach((song) => {
    const li = document.createElement("li");
    li.textContent = `${song.name} - ${song.artist}`;
    li.addEventListener("click", () => {
      currentSongIndex = songs.findIndex((s) => s.id === song.id);
      renderCurrentSong();
    });
    songList.appendChild(li);
  });
}

//Render Current Song
function renderFilteredPlaylists(filteredPlaylists) {
  const allPlaylists = document.getElementById("allPlaylists");
  allPlaylists.innerHTML = "";

  filteredPlaylists.forEach((playlist, index) => {
    const li = document.createElement("li");
    li.textContent = playlist.name;
    li.addEventListener("click", () => renderPlaylistSongs(index));
    allPlaylists.appendChild(li);
  });
}
