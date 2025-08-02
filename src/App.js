import React, { useEffect, useState } from 'react';
import './App.css';

const games = [
  {
    name: "Gates of Olympus",
    url: "https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?gameSymbol=vs20olympx&websiteUrl=https%3A%2F%2Fdemogamesfree.pragmaticplay.net&jurisdiction=99&lobby_url=https%3A%2F%2Fwww.pragmaticplay.com%2Fen%2F&lang=ID&cur=IDR"
  },
  {
    name: "Sweet Bonanza",
    url: "https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?gameSymbol=vs20fruitswx&websiteUrl=https%3A%2F%2Fdemogamesfree.pragmaticplay.net&jurisdiction=99&lobby_url=https%3A%2F%2Fwww.pragmaticplay.com%2Fen%2F&lang=ID&cur=IDR"
  },
  {
    name: "Mahjong Wins",
    url: "https://demogamesfree.pragmaticplay.net/gs2c/openGame.do?gameSymbol=vswaysmwss&websiteUrl=https%3A%2F%2Fdemogamesfree.pragmaticplay.net&jurisdiction=99&lobby_url=https%3A%2F%2Fwww.pragmaticplay.com%2Fen%2F&lang=ID&cur=IDR"
  }
];

function App() {
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [showAgePopup, setShowAgePopup] = useState(true);
  const [loading, setLoading] = useState(false);

  const currentGame = games[currentGameIndex];

  useEffect(() => {
    const particleContainer = document.getElementById("particles");
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.left = Math.random() * 100 + "%";
      particle.style.animationDelay = Math.random() * 6 + "s";
      particle.style.animationDuration = (Math.random() * 3 + 3) + "s";
      particleContainer.appendChild(particle);
    }

    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') previousGame();
      else if (e.key === 'ArrowRight') nextGame();
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const nextGame = () => {
    if (currentGameIndex < games.length - 1) {
      setLoading(true);
      setTimeout(() => {
        setCurrentGameIndex(prev => prev + 1);
        setTimeout(() => setLoading(false), 1000);
      }, 300);
    }
  };

  const previousGame = () => {
    if (currentGameIndex > 0) {
      setLoading(true);
      setTimeout(() => {
        setCurrentGameIndex(prev => prev - 1);
        setTimeout(() => setLoading(false), 1000);
      }, 300);
    }
  };

  const showHelp = () => {
    alert(`Bantuan untuk Masalah Judi:\n\n• Hubungi konselor profesional\n• Bergabung dengan kelompok dukungan\n• Blokir situs judi di perangkat Anda\n• Ceritakan masalah Anda ke keluarga\n• Cari bantuan medis jika diperlukan\n\nIngat: Tidak ada yang terlambat untuk berhenti!`);
  };

  const showAlternatives = () => {
    alert(`Alternatif Positif:\n\n• Olahraga dan aktivitas fisik\n• Belajar keterampilan baru\n• Membaca buku dan menambah wawasan\n• Bersosialisasi dengan teman dan keluarga\n• Mengembangkan hobi yang bermanfaat\n• Volunteer untuk kegiatan sosial\n\nHidup lebih bermakna tanpa judi!`);
  };

  return (
    <div className="App">
      <div className="particles" id="particles"></div>

      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">HINDARI JUDI ONLINE_KKN-T 28 UNDIP</div>
          </div>
        </div>
      </header>

      <main className="game-section">
        <div className="container">
          <div className="game-container">
            <div className="game-navigation">
              <button className="nav-btn" onClick={previousGame} disabled={currentGameIndex === 0}>‹</button>
              <div className="game-info-nav">
                <div className="current-game">{currentGame.name}</div>
                <div className="game-counter">Game {currentGameIndex + 1} dari {games.length}</div>
              </div>
              <button className="nav-btn" onClick={nextGame} disabled={currentGameIndex === games.length - 1}>›</button>
            </div>

            <div className="game-frame">
              <div className="game-wrapper">
                <iframe
                  className={`game-iframe ${loading ? 'loading' : ''}`}
                  src={currentGame.url}
                  title={currentGame.name}
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            <div className="game-info">
              <div className="warning-icon">⚠️</div>
              <h1>PERINGATAN!!!</h1>
              <p>Judi online dapat menyebabkan kecanduan yang merusak kehidupan finansial dan keluarga Anda. Bermain judi dapat menyebabkan kerugian besar, stres, dan masalah kesehatan mental. Sebaiknya hindari semua bentuk perjudian online dan fokus pada aktivitas yang positif dan bermanfaat.</p>
              <div className="action-buttons">
                <button className="btn btn-primary" onClick={showHelp}>Dapatkan Bantuan</button>
                <button className="btn btn-secondary" onClick={showAlternatives}>Alternatif Positif</button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {showAgePopup && (
        <div className="age-popup active">
          <div className="box">
            <h3>Peringatan Penting</h3>
            <p>Konten ini ditujukan untuk memberikan edukasi tentang bahaya judi online. Judi dapat menyebabkan masalah serius dalam hidup Anda.</p>
            <div className="buttons">
              <button className="btn btn-primary" onClick={() => setShowAgePopup(false)}>Saya Mengerti</button>
              <button className="btn btn-secondary" onClick={() => window.history.back()}>Kembali</button>
            </div>
          </div>
        </div>
      )}

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <p>&copy; 2025 Hindari Judi Online. Lindungi Diri Anda dari Bahaya Judi Online | KKN-T 28 UNDIP BANJARMULYA PEMALANG</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
