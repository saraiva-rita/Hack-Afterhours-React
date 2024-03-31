import './style.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function LandingPage() {
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);

  useEffect(() => {
    const introMusic = document.getElementById('introMusic');
    introMusic.play();
    return () => {
      introMusic.pause();
    };
  }, []);

  const toggleMusic = () => {
    const introMusic = document.getElementById('introMusic');
    const buttonMusicOnOff = document.getElementById('button-music-on-off');

    if (isMusicPlaying) {
      introMusic.pause();
      buttonMusicOnOff.style.backgroundImage =
        "url('https://i.ibb.co/dbbYn9V/mute.png')";
    } else {
      introMusic.play();
      buttonMusicOnOff.style.backgroundImage =
        "url('https://i.ibb.co/BBYZvy0/music-on-off.png')";
    }

    setIsMusicPlaying(!isMusicPlaying);
  };

  return (
    <div id="landing-page">
      <button id="button-music-on-off" onClick={toggleMusic}></button>
      <video autoPlay loop muted playsInline className="back-video">
        <source src="./videos/lisbon.mp4" type="video/mp4" />
      </video>
      <audio id="introMusic" loop autoPlay>
        <source src="./videos/music.wav" type="audio/wav" />
      </audio>

      <div className="landing-content">
        <h1>Hack Afterhours</h1>
        <br />
        <p>
          Coding by Day, Exploring by Night: Unveil Lisbon's Hidden Gems with
          IronHack's Evening Guide!
        </p>
        <br />
        <Link to="/index" className="button button-transparency">
          Explore
        </Link>
      </div>
    </div>
  );
}
export default LandingPage;
