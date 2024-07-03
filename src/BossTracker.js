import React, { useState, useEffect } from "react";
import "./BossTracker.css";
import TreeSentinel from "./assets/images/tree_sentinel.jpg";
import Margit from "./assets/images/margit.jpg";
import Godrick from "./assets/images/godrick.jpg";
import RedWolf from "./assets/images/red_wolf.jpg";
import Rennala from "./assets/images/rennala.jpg";
import Radahn from "./assets/images/radahn.jpg";
import Morgott from "./assets/images/morgott.jpg";
import FireGiant from "./assets/images/fire_giant.jpg";
import GodskinDuo from "./assets/images/godskin_duo.jpg";
import Maliketh from "./assets/images/maliketh.jpg";
import HoarahLoux from "./assets/images/hoarah_loux.jpg";
import Radagon from "./assets/images/radagon.jpg";
import DivineBeastDancingLion from "./assets/images/divine_beast_dancing_lion.jpg";
import Rellana from "./assets/images/rellana.jpg";
import PutrescentKnight from "./assets/images/putrescent_knight.jpg";
import MessmerTheImpaler from "./assets/images/messmer_the_impaler.jpg";
import CommanderGaius from "./assets/images/commander_gaius.jpg";
import ScadutreeAvatar from "./assets/images/scadutree_avatar.jpg";
import MetyrMotherOfFingers from "./assets/images/metyr_mother_of_fingers.jpg";
import RominaSaintOfTheBud from "./assets/images/romina_saint_of_the_bud.jpg";
import MidraLordOfFrenziedFlame from "./assets/images/midra_lord_of_frenzied_flame.jpg";
import BayleTheDread from "./assets/images/bayle_the_dread.jpg";
import PromisedConsortRadahn from "./assets/images/promised_consort_radahn.jpg";
import DraconicTreeSentinel from "./assets/images/draconic_tree_sentinel.jpg";
import Mogh from "./assets/images/mohg.jpg";
import Malenia from "./assets/images/malenia.jpg";
import GoldenOrder from "./assets/images/golden_order_logo.jpg";
import CrucibleKnight from "./assets/images/crucible_knight.jpg";
import Magma from "./assets/images/magma.jpg";
import FallingStar from "./assets/images/falling_star.jpg";
import Godfrey from "./assets/images/godfrey.jpg";
import SirGideon from "./assets/images/sir_gideon.jpg";

const baseGameBosses = [
  { name: "tree sentinel", image: TreeSentinel, emoji: "🐴" },
  { name: "margit, the fell omen", image: Margit, emoji: "🪓" },
  { name: "godrick the grafted", image: Godrick, emoji: "🦾" },
  { name: "red wolf of radagon", image: RedWolf, emoji: "🐺" },
  { name: "rennala, queen of the full moon", image: Rennala, emoji: "🌕" },
  { name: "crucible knight", image: CrucibleKnight, emoji: "💀" },
  { name: "magma wyrm makar", image: Magma, emoji: "🌋" },
  { name: "starscourge radahn", image: Radahn, emoji: "⭐" },
  { name: "full-grown fallingstar beast", image: FallingStar, emoji: "👹" },
  { name: "mogh, lord of blood", image: Mogh, emoji: "🩸" },
  { name: "draconic tree sentinel", image: DraconicTreeSentinel, emoji: "🐲" },
  { name: "godfrey, the first elden lord", image: Godfrey, emoji: "🤴" },
  { name: "morgott, the omen king", image: Morgott, emoji: "👑" },
  { name: "fire giant", image: FireGiant, emoji: "🔥" },
  { name: "godskin duo", image: GodskinDuo, emoji: "👥" },
  { name: "maliketh, the black blade", image: Maliketh, emoji: "⚔️" },
  { name: "malenia, blade of miquella", image: Malenia, emoji: "🌸" },
  {
    name: "sir gideon ofnir, the all-knowing",
    image: SirGideon,
    emoji: "📖",
  },
  {
    name: "hoarah loux (godfrey, first elden lord)",
    image: HoarahLoux,
    emoji: "🛡️",
  },
  {
    name: "radagon of the golden order and the elden beast",
    image: Radagon,
    emoji: "🐉",
  },
];

const dlcBosses = [
  {
    name: "divine beast dancing lion",
    image: DivineBeastDancingLion,
    emoji: "🦁",
  },
  { name: "rellana, twin moon knight", image: Rellana, emoji: "🌙" },
  { name: "putrescent knight", image: PutrescentKnight, emoji: "💀" },
  { name: "messmer the impaler", image: MessmerTheImpaler, emoji: "🗡️" },
  { name: "commander gaius", image: CommanderGaius, emoji: "⚔️" },
  { name: "scadutree avatar", image: ScadutreeAvatar, emoji: "🌳" },
  {
    name: "metyr, mother of fingers",
    image: MetyrMotherOfFingers,
    emoji: "🖐️",
  },
  { name: "romina, saint of the bud", image: RominaSaintOfTheBud, emoji: "🌸" },
  {
    name: "midra, lord of frenzied flame",
    image: MidraLordOfFrenziedFlame,
    emoji: "🔥",
  },
  { name: "bayle the dread", image: BayleTheDread, emoji: "😱" },
  {
    name: "promised consort radahn",
    image: PromisedConsortRadahn,
    emoji: "🔮",
  },
];

const BossTracker = () => {
  const [deathCounts, setDeathCounts] = useState({});
  const [dlcDeathCounts, setDlcDeathCounts] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBoss, setSelectedBoss] = useState(null);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isGlobalResetModalOpen, setIsGlobalResetModalOpen] = useState(false);
  const [isDlc, setIsDlc] = useState(false);

  useEffect(() => {
    const storedCounts = JSON.parse(localStorage.getItem("deathCounts")) || {};
    setDeathCounts(storedCounts);
    const storedDlcCounts =
      JSON.parse(localStorage.getItem("dlcDeathCounts")) || {};
    setDlcDeathCounts(storedDlcCounts);
  }, []);

  useEffect(() => {
    localStorage.setItem("deathCounts", JSON.stringify(deathCounts));
  }, [deathCounts]);

  useEffect(() => {
    localStorage.setItem("dlcDeathCounts", JSON.stringify(dlcDeathCounts));
  }, [dlcDeathCounts]);

  useEffect(() => {
    if (isModalOpen || isResetModalOpen || isGlobalResetModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen, isResetModalOpen, isGlobalResetModalOpen]);

  const adjustCount = (boss, amount) => {
    if (isDlc) {
      setDlcDeathCounts((prevCounts) => ({
        ...prevCounts,
        [boss]: (prevCounts[boss] || 0) + amount,
      }));
    } else {
      setDeathCounts((prevCounts) => ({
        ...prevCounts,
        [boss]: (prevCounts[boss] || 0) + amount,
      }));
    }
  };

  const resetCount = (boss) => {
    if (isDlc) {
      setDlcDeathCounts((prevCounts) => ({
        ...prevCounts,
        [boss]: 0,
      }));
    } else {
      setDeathCounts((prevCounts) => ({
        ...prevCounts,
        [boss]: 0,
      }));
    }
  };

  const resetAllCounts = () => {
    if (isDlc) {
      const resetCounts = {};
      dlcBosses.forEach((boss) => {
        resetCounts[boss.name] = 0;
      });
      setDlcDeathCounts(resetCounts);
    } else {
      const resetCounts = {};
      baseGameBosses.forEach((boss) => {
        resetCounts[boss.name] = 0;
      });
      setDeathCounts(resetCounts);
    }
    setIsGlobalResetModalOpen(false);
  };

  const handleCountChange = (boss, value) => {
    const newValue = parseInt(value, 10);
    if (!isNaN(newValue) && newValue >= 0) {
      if (isDlc) {
        setDlcDeathCounts((prevCounts) => ({
          ...prevCounts,
          [boss]: newValue,
        }));
      } else {
        setDeathCounts((prevCounts) => ({
          ...prevCounts,
          [boss]: newValue,
        }));
      }
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
    if (event.target.closest(".modal-content")) {
      return;
    }
    closeModal();
    closeResetModal();
    closeGlobalResetModal();
  };

  const handleKeyDown = (event) => {
    if (event.key === " ") {
      event.preventDefault();
      if (isModalOpen && selectedBoss) {
        adjustCount(selectedBoss.name, 1);
      }
    } else if (event.key === "d") {
      event.preventDefault();
      if (isModalOpen && selectedBoss) {
        adjustCount(selectedBoss.name, -1);
      }
    }
  };

  const totalDeaths = Object.values(deathCounts).reduce(
    (acc, count) => acc + count,
    0
  );
  const totalDlcDeaths = Object.values(dlcDeathCounts).reduce(
    (acc, count) => acc + count,
    0
  );

  const currentBosses = isDlc ? dlcBosses : baseGameBosses;
  const currentTotalDeaths = isDlc ? totalDlcDeaths : totalDeaths;

  return (
    <div className="container">
      <h1 className="title">
        {isDlc
          ? "SHADOW OF THE ERDTREE BOSS TRACKER"
          : "ELDEN RING BOSS TRACKER"}
      </h1>

      <div className="title-items">
        <button className="toggle-button" onClick={() => setIsDlc(!isDlc)}>
          {isDlc ? "BASE GAME BOSSES" : "SHADOW OF THE ERDTREE BOSSES"}
        </button>
      </div>
      <ul className="boss-list">
        {currentBosses.map((boss) => (
          <li
            key={boss.name}
            className="boss-item"
            onClick={() => openModal(boss)}
          >
            <span className="boss-name">
              <img src={boss.image} alt={boss.name} className="boss-image" />
              {boss.name} {boss.emoji}
            </span>
            <div className="button-group">
              <button
                className="button"
                onClick={(e) => {
                  e.stopPropagation();
                  adjustCount(boss.name, -1);
                }}
                disabled={
                  (isDlc
                    ? dlcDeathCounts[boss.name]
                    : deathCounts[boss.name]) === 0
                }
              >
                -
              </button>
              <input
                className="count-input"
                type="number"
                value={
                  (isDlc
                    ? dlcDeathCounts[boss.name]
                    : deathCounts[boss.name]) || 0
                }
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => handleCountChange(boss.name, e.target.value)}
              />
              <button
                className="button"
                onClick={(e) => {
                  e.stopPropagation();
                  adjustCount(boss.name, 1);
                }}
              >
                +
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="total-deaths">TOTAL DEATHS: {currentTotalDeaths}</div>
      <button className="reset-button" onClick={openGlobalResetModal}>
        RESET ALL
      </button>

      {isModalOpen && selectedBoss && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>{selectedBoss.name}</h2>
            <img
              src={selectedBoss.image}
              alt={selectedBoss.name}
              className="modal-boss-image"
            />
            <div className="button-group">
              <button
                className="button"
                onClick={() => adjustCount(selectedBoss.name, -1)}
                disabled={
                  (isDlc
                    ? dlcDeathCounts[selectedBoss.name]
                    : deathCounts[selectedBoss.name]) === 0
                }
              >
                -
              </button>
              <input
                className="count-input"
                type="number"
                value={
                  (isDlc
                    ? dlcDeathCounts[selectedBoss.name]
                    : deathCounts[selectedBoss.name]) || 0
                }
                onChange={(e) =>
                  handleCountChange(selectedBoss.name, e.target.value)
                }
              />
              <button
                className="button"
                onClick={() => adjustCount(selectedBoss.name, 1)}
              >
                +
              </button>
            </div>
            <p className="description-text">
              Press <strong>Space</strong> to add one, <strong>D</strong> to go
              back one.
            </p>
            <button className="reset-button-2" onClick={openResetModal}>
              RESET
            </button>
          </div>
        </div>
      )}

      {isResetModalOpen && (
        <div className="modal confirmation-modal">
          <div className="modal-content">
            <p>
              Are you sure you want to reset the death count for{" "}
              {selectedBoss.name}?
            </p>
            <button className="modal-button" onClick={handleReset}>
              Yes
            </button>
            <button className="modal-button" onClick={closeResetModal}>
              No
            </button>
          </div>
        </div>
      )}

      {isGlobalResetModalOpen && (
        <div className="modal confirmation-modal">
          <div className="modal-content">
            <p>
              Are you sure you want to reset the death counts for all bosses?
            </p>
            <button className="modal-button" onClick={resetAllCounts}>
              Yes
            </button>
            <button className="modal-button" onClick={closeGlobalResetModal}>
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BossTracker;
