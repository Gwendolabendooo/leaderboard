import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const TFTTable = () => {
  const [players, setPlayers] = useState([
    {
      puuid : "k5Gp8W9EcA4nGPPC8iMygSa4zuX1ZZLoh_3cqUijTfrC9ycZMzREV1-9ONFaYfMWwPjYa9Ws7HZ0_Q",
      id: "FKZt3N72hW7T7cIFJRFYAKlLC41w4z66Ua6gz__Gc2sygDmTiAr98ynooA",
      name: "Warigirizhae",
      nbPartie: 0,
    },
    {
      puuid : "dXVYSz2-crmPLE-Jd6LoQ2KKCvAO0aEPHcDMsNzuVID9kIv7vzBYhZyG3idobIqnMk_KOnac1biMlg",
      id: "zs1TexTSYuzDCEh8vUdOj1WUDYaBhPOaVJM2FsyEoQExM5FH",
      name: "Roi Du Cul",
      nbPartie: 0,
    },
    {
      puuid : "SdIhxCltJSsU1trU_hVnX6LWATyLfoSSuGpooNQxP3jYPwpB85sJw-p15Pdt2IGY76oSITp2ddGn9g",
      id: "l18qerNRlOY02y0dfk0TJayeIJIUtK-g4B0REENOF_Gbh_Q",
      name: "Peipei de roblox",
      nbPartie: 0,
    },
    {
      puuid : "4f3AMARaoDcnhE9kmto15W3iPqaQOK87rW6ViLTGan_Xmu3x-BKWDcQW-cVbXgiJr5xV-A4OkT6GWw",
      id: "czHoYNuFcfid9erMlcfUFHUK5M8tGE7VBPGbwNdRG_-HvGE",
      name: "KC SAKEN PAS",
      nbPartie: 0,
    },
    {
      puuid : "J7IKp6cny54OaCzqr8-MUZPbKzESVxRkwzbJuSmd6sRAB-4tyn3EB4Owe6Tw-zCBspRX6rfP5jYj9w",
      id: "FkOzsY7PipdNlNha7hh8GRLMEpmGif2cDVHwqWV2KrUP4z-u",
      name: "AsmarLeGold4",
      nbPartie: 0,
    },
    {
      puuid : "xjnoRvIXNyqnwoXSijKv1EK6fbiHeiA4YmQXm6PdzT-R06S4a4_u8AR5vVFKo3z9wbStoP4B7_Hfgg",
      id: "0iGwoCpENRWGUKLgQXCvCCcmbWtLgTi21oZ7Caxw0ub_BNI",
      name: "Azk Broken",
      nbPartie: 0,
    },
    {
      puuid : "UBgUuz76E9OweOF8tTOcInGEoBvQnotMUdKwbC4H0QYE20Va-SYQVTRVZKzfV8Hoh10Rg7HgKzz3OQ",
      id: "K12zqk2UpXQZmW6oQFvoE4gJpFvsJ4p7nJP0JTjlSBYPX3c",
      name: "Ana <3",
      nbPartie: 0,
    },
    {
      puuid : "jQ_12G6zsxuOm29cIYSFIVZkHN0ZhiwDC0iya7DlgLFzSRX9qCO-R0grbzv33sXrRZjfTqWnHxr3Hw",
      id: "BnkoX_1dIWfT7PVTivWK1Hwsas0vGRgmtBbTw28VIhvOv28",
      name: "Fiora nerf",
      nbPartie: 0,
    }
  ]);
  const [sortColumn, setSortColumn] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filteredPlayers, setFilteredPlayers] = useState([]);

  const fetchPlayerData = async () => {
    try {
      const newUsers = [...players];
      for (let i = 0; i < newUsers.length; i++) {
        const user = newUsers[i];
        let avg = 0;
        const ranking = await axios.get('https://euw1.api.riotgames.com/tft/league/v1/entries/by-summoner/'+user.id+'?api_key=RGAPI-d02f5ccf-e84c-46fc-a824-41a817f032f2&&startTime=1686747358');
        
        if (ranking.data[0]) {
          const data = ranking.data[0];
          user.winrate = ((data.wins / (data.losses + data.wins)) * 100).toFixed(2) + '%';
          user.nbPartie = data.losses + data.wins;
          user.win = data.wins;
          user.rank = ranking.data[0].tier + ' ' + ranking.data[0].rank;
          user.loose = data.losses;
        }
      }
  
      setPlayers(newUsers);
    } catch (error) {
      console.error('Erreur lors de la récupération des données des joueurs:', error);
    }
  };

  useEffect(() => {
    fetchPlayerData();
  }, []);

  const handleSort = (column) => {
    // Vérifie si la colonne de tri est déjà active
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Inverse l'ordre de tri
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const compareValues = (a, b) => {
    if (a[sortColumn] < b[sortColumn]) {
      return sortOrder === 'asc' ? -1 : 1;
    }
    if (a[sortColumn] > b[sortColumn]) {
      return sortOrder === 'asc' ? 1 : -1;
    }
    return 0;
  };

  useEffect(() => {
    const sortedPlayers = players.slice().sort(compareValues);
    setFilteredPlayers(sortedPlayers);
  }, [players, sortColumn, sortOrder]);

  return (
    <div className="container">
      <h1>Le discord</h1>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('name')} className={sortColumn === 'name' ? `sorted-${sortOrder}` : ''}>
              Pseudo
              {sortColumn === 'name' && <span className={`arrow-${sortOrder === 'asc' ? 'up' : 'down'}`} />}
            </th>
            <th onClick={() => handleSort('rank')} className={sortColumn === 'rank' ? `sorted-${sortOrder}` : ''}>
              Rang
              {sortColumn === 'rank' && <span className={`arrow-${sortOrder === 'asc' ? 'up' : 'down'}`} />}
            </th>
            <th onClick={() => handleSort('nbPartie')} className={sortColumn === 'nbPartie' ? `sorted-${sortOrder}` : ''}>
              Nombre de parties
              {sortColumn === 'nbPartie' && <span className={`arrow-${sortOrder === 'asc' ? 'up' : 'down'}`} />}
            </th>
            <th onClick={() => handleSort('win')} className={sortColumn === 'win' ? `sorted-${sortOrder}` : ''}>
              Victoire
              {sortColumn === 'win' && <span className={`arrow-${sortOrder === 'asc' ? 'up' : 'down'}`} />}
            </th>
            <th onClick={() => handleSort('loose')} className={sortColumn === 'loose' ? `sorted-${sortOrder}` : ''}>
              Défaite
              {sortColumn === 'loose' && <span className={`arrow-${sortOrder === 'asc' ? 'up' : 'down'}`} />}
            </th>
            <th onClick={() => handleSort('winrate')} className={sortColumn === 'winrate' ? `sorted-${sortOrder}` : ''}>
              Taux de victoire
              {sortColumn === 'winrate' && <span className={`arrow-${sortOrder === 'asc' ? 'up' : 'down'}`} />}
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredPlayers.map((player) => (
            <tr key={player.id}>
              <td style={{textAlign: 'left'}}>{player.name}</td>
              <td>{player.rank}</td>
              <td>{player.nbPartie}</td>
              <td>{player.win}</td>
              <td>{player.loose}</td>
              <td>{player.winrate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TFTTable;