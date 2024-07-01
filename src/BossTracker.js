import React, { useState, useEffect } from 'react';
import './BossTracker.css';
import Margit from './assets/images/margit.jpg';
import Godrick from './assets/images/godrick.jpg';
import RedWolf from './assets/images/red_wolf.jpg';
import Rennala from './assets/images/rennala.jpg';
import Radahn from './assets/images/radahn.jpg';
import Morgott from './assets/images/morgott.jpg';
import FireGiant from './assets/images/fire_giant.jpg';
import GodskinDuo from './assets/images/godskin_duo.jpg';
import Maliketh from './assets/images/maliketh.jpg';
import HoarahLoux from './assets/images/hoarah_loux.jpg';
import Radagon from './assets/images/radagon.jpg';

const bosses = [
  { name: 'margit, the fell omen', image: Margit },
  { name: 'godrick the grafted', image: Godrick },
  { name: 'red wolf of radagon', image: RedWolf },
  { name: 'rennala, queen of the full moon', image: Rennala },
  { name: 'starscourge radahn', image: Radahn },
  { name: 'morgott, the omen king', image: Morgott },
  { name: 'fire giant', image: FireGiant },
  { name: 'godskin duo', image: GodskinDuo },
  { name: 'maliketh, the black blade', image: Maliketh },
  { name: 'hoarah loux (godfrey, first elden lord)', image: HoarahLoux },
  { name: 'radagon of the golden order and the elden beast', image: Radagon },
];

const BossTracker = () => {
  const [deathCounts, setDeathCounts] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBoss, setSelectedBoss] = useState(null);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isGlobalResetModalOpen, setIsGlobalResetModalOpen] = useState(false);

  useEffect(() => {
    const storedCounts = JSON.parse(localStorage.getItem('deathCounts')) || {};
    setDeathCounts(storedCounts);
  }, []);

  useEffect(() => {
    localStorage.setItem('deathCounts', JSON.stringify(deathCounts));
  }, [deathCounts]);

  useEffect(() => {
    if (isModalOpen || isResetModalOpen || isGlobalResetModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen, isResetModalOpen, isGlobalResetModalOpen]);

  const adjustCount = (boss, amount) => {
    setDeathCounts((prevCounts) => ({
      ...prevCounts,
      [boss]: (prevCounts[boss] || 0) + amount
    }));
  };

  const resetCount = (boss) => {
    setDeathCounts((prevCounts) => ({
      ...prevCounts,
      [boss]: 0
    }));
  };

  const resetAllCounts = () => {
    const resetCounts = {};
    bosses.forEach(boss => {
      resetCounts[boss.name] = 0;
    });
    setDeathCounts(resetCounts);
    setIsGlobalResetModalOpen(false);
  };

  const handleCountChange = (boss, value) => {
    const newValue = parseInt(value, 10);
    if (!isNaN(newValue) && newValue >= 0) {
      setDeathCounts((prevCounts) => ({
        ...prevCounts,
        [boss]: newValue
      }));
    }
  };

  const openModal = (boss) => {
    setSelectedBoss(boss);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBoss(null);
  };

  const openResetModal = () => {
    setIsResetModalOpen(true);
  };

  const closeResetModal = () => {
    setIsResetModalOpen(false);
  };

  const handleReset = () => {
    if (selectedBoss) {
      resetCount(selectedBoss.name);
    }
    closeResetModal();
    closeModal();
  };

  const openGlobalResetModal = () => {
    setIsGlobalResetModalOpen(true);
  };

  const closeGlobalResetModal = () => {
    setIsGlobalResetModalOpen(false);
  };

  const handleClickOutside = (event) => {
    if (event.target.closest('.modal-content')) {
      return;
    }
    closeModal();
    closeResetModal();
    closeGlobalResetModal();
  };

  const handleKeyDown = (event) => {
    if (event.key === ' ') {
      event.preventDefault();
      if (isModalOpen && selectedBoss) {
        adjustCount(selectedBoss.name, 1);
      }
    } else if (event.key === 'd') {
      event.preventDefault();
      if (isModalOpen && selectedBoss) {
        adjustCount(selectedBoss.name, -1);
      }
    }
  };

  return (
    <div className="container">
      <h1 className="title">ELDEN RING BOSS TRACKER</h1>
      <ul className="boss-list">
        {bosses.map((boss) => (
          <li key={boss.name} className="boss-item" onClick={() => openModal(boss)}>
            <span className="boss-name">
              <img src={boss.image} alt={boss.name} className="boss-image" />
              {boss.name}
            </span>
            <div className="button-group">
              <button className="button" onClick={(e) => { e.stopPropagation(); adjustCount(boss.name, -1); }} disabled={(deathCounts[boss.name] || 0) === 0}>-</button>
              <input
                className="count-input"
                type="number"
                value={deathCounts[boss.name] || 0}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => handleCountChange(boss.name, e.target.value)}
              />
              <button className="button" onClick={(e) => { e.stopPropagation(); adjustCount(boss.name, 1); }}>+</button>
            </div>
          </li>
        ))}
      </ul>
      <button className="reset-button" onClick={openGlobalResetModal}>RESET ALL</button>

      {isModalOpen && selectedBoss && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>{selectedBoss.name}</h2>
            <img src={selectedBoss.image} alt={selectedBoss.name} className="modal-boss-image" />
            <div className="button-group">
              <button className="button" onClick={() => adjustCount(selectedBoss.name, -1)} disabled={(deathCounts[selectedBoss.name] || 0) === 0}>-</button>
              <input
                className="count-input"
                type="number"
                value={deathCounts[selectedBoss.name] || 0}
                onChange={(e) => handleCountChange(selectedBoss.name, e.target.value)}
              />
              <button className="button" onClick={() => adjustCount(selectedBoss.name, 1)}>+</button>
            </div>
            <p className="description-text">Press <strong>Space</strong> to add one, <strong>D</strong> to go back one.</p>
            <button className="reset-button-2" onClick={openResetModal}>RESET</button>
          </div>
        </div>
      )}

      {isResetModalOpen && (
        <div className="modal confirmation-modal">
          <div className="modal-content">
            <p>Are you sure you want to reset the death count for {selectedBoss.name}?</p>
            <button className="modal-button" onClick={handleReset}>Yes</button>
            <button className="modal-button" onClick={closeResetModal}>No</button>
          </div>
        </div>
      )}

      {isGlobalResetModalOpen && (
        <div className="modal confirmation-modal">
          <div className="modal-content">
            <p>Are you sure you want to reset the death counts for all bosses?</p>
            <button className="modal-button" onClick={resetAllCounts}>Yes</button>
            <button className="modal-button" onClick={closeGlobalResetModal}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BossTracker;
