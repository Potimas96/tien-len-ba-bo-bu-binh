// ======================== BỘ TẠO ÂM THANH (WEB AUDIO API) ========================
const SoundFX = {
    ctx: null,
    enabled: true,

    init() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioCtx();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    },

    click() {
        if (!this.enabled) return;
        this.init();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(650, now);
        osc.frequency.exponentialRampToValueAtTime(1100, now + 0.045);

        gain.gain.setValueAtTime(0.16, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.05);
    },

    playCard() {
        if (!this.enabled) return;
        this.init();
        const now = this.ctx.currentTime;

        const bufferSize = this.ctx.sampleRate * 0.08;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.35));
        }
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1400, now);

        const noiseGain = this.ctx.createGain();
        noiseGain.gain.setValueAtTime(0.35, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(this.ctx.destination);
        noise.start(now);

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(55, now + 0.09);

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.09);
    },

    deal() {
        if (!this.enabled) return;
        this.init();
        for (let i = 0; i < 10; i++) {
            setTimeout(() => this.playCard(), i * 45);
        }
    },

    pass() {
        if (!this.enabled) return;
        this.init();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(150, now + 0.16);

        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.17);
    },

    chop() {
        if (!this.enabled) return;
        this.init();
        const now = this.ctx.currentTime;

        const sub = this.ctx.createOscillator();
        const subGain = this.ctx.createGain();
        sub.type = 'sawtooth';
        sub.frequency.setValueAtTime(140, now);
        sub.frequency.exponentialRampToValueAtTime(32, now + 0.45);
        subGain.gain.setValueAtTime(0.45, now);
        subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
        sub.connect(subGain);
        subGain.connect(this.ctx.destination);
        sub.start(now);
        sub.stop(now + 0.46);

        const notes = [523.25, 659.25, 783.99, 1046.5];
        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const g = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now + idx * 0.055);
            g.gain.setValueAtTime(0.25, now + idx * 0.055);
            g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.055 + 0.35);
            osc.connect(g);
            g.connect(this.ctx.destination);
            osc.start(now + idx * 0.055);
            osc.stop(now + idx * 0.055 + 0.36);
        });
    },

    win() {
        if (!this.enabled) return;
        this.init();
        const now = this.ctx.currentTime;
        const melody = [523.25, 659.25, 783.99, 1046.5, 783.99, 1046.5];
        const times =  [0,      0.12,   0.24,   0.36,   0.52,   0.66];
        melody.forEach((freq, i) => {
            const osc = this.ctx.createOscillator();
            const g = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now + times[i]);
            g.gain.setValueAtTime(0.28, now + times[i]);
            g.gain.exponentialRampToValueAtTime(0.001, now + times[i] + 0.3);
            osc.connect(g);
            g.connect(this.ctx.destination);
            osc.start(now + times[i]);
            osc.stop(now + times[i] + 0.32);
        });
    },

    lose() {
        if (!this.enabled) return;
        this.init();
        const now = this.ctx.currentTime;
        const melody = [392.00, 369.99, 349.23, 329.63];
        melody.forEach((freq, i) => {
            const osc = this.ctx.createOscillator();
            const g = this.ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(freq, now + i * 0.18);
            g.gain.setValueAtTime(0.18, now + i * 0.18);
            g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.18 + 0.25);
            osc.connect(g);
            g.connect(this.ctx.destination);
            osc.start(now + i * 0.18);
            osc.stop(now + i * 0.18 + 0.26);
        });
    },

    // Tiếng nhận tiền viện trợ từ ông bô
    coinGrant() {
        if (!this.enabled) return;
        this.init();
        const now = this.ctx.currentTime;
        [987.77, 1318.51].forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const g = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + idx * 0.09);
            g.gain.setValueAtTime(0.3, now + idx * 0.09);
            g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.35);
            osc.connect(g);
            g.connect(this.ctx.destination);
            osc.start(now + idx * 0.09);
            osc.stop(now + idx * 0.09 + 0.36);
        });
    }
};

function toggleSound() {
    SoundFX.enabled = !SoundFX.enabled;
    document.getElementById('btn-sound').innerText =
        SoundFX.enabled ? '🔊 Âm thanh: Bật' : '🔇 Âm thanh: Tắt';
}

function triggerBannerAndShake(text, isChop = false) {
    const banner = document.getElementById('fx-banner');
    banner.innerText = text;
    banner.classList.remove('show');
    void banner.offsetWidth;
    banner.classList.add('show');

    if (isChop) {
        const table = document.getElementById('game-table');
        table.classList.remove('shake');
        void table.offsetWidth;
        table.classList.add('shake');
    }
}

// ======================== DỮ LIỆU BÀI & NGƯỜI CHƠI ========================
const RANKS = [
    { label: '3', val: 3 }, { label: '4', val: 4 }, { label: '5', val: 5 },
    { label: '6', val: 6 }, { label: '7', val: 7 }, { label: '8', val: 8 },
    { label: '9', val: 9 }, { label: '10', val: 10 }, { label: 'J', val: 11 },
    { label: 'Q', val: 12 }, { label: 'K', val: 13 }, { label: 'A', val: 14 },
    { label: '2', val: 15 }
];

const SUITS = [
    { symbol: '♠', val: 1, color: 'black' },
    { symbol: '♣', val: 2, color: 'black' },
    { symbol: '♦', val: 3, color: 'red' },
    { symbol: '♥', val: 4, color: 'red' }
];

// Mỗi người khởi đầu với 100,000 Xu để chọn các mức cược 10k - 100k
const players = [
    { id: 0, name: 'Bạn', hand: [], coins: 100000, passed: false, isBot: false },
    { id: 1, name: 'Bot 1 (Tư Liều)', hand: [], coins: 100000, passed: false, isBot: true },
    { id: 2, name: 'Bot 2 (Chị Đại)', hand: [], coins: 100000, passed: false, isBot: true },
    { id: 3, name: 'Bot 3 (Thần Bài)', hand: [], coins: 100000, passed: false, isBot: true }
];

let currentBet = 10000;
let currentTableCards = [];
let currentTurn = 0;
let lastPlayerIndex = null;
let animateTableCards = false;
let animateDeal = false;
let isFirstGame = true;
let lastWinner = null;
let requiredLowestCard = null;
let gameOver = true;
let sortMode = 'power';
let botTimer = null;

// ======================== HỆ THỐNG ĐẶT CƯỢC & XIN ÔNG BÔ ========================
function openBetModal() {
    if (botTimer) clearTimeout(botTimer);
    gameOver = true;

    // Nếu Bot nào hết tiền thì ông bô của Bot cũng tự bơm lại 100k
    players.forEach((p, idx) => {
        if (idx > 0 && p.coins <= 0) {
            p.coins = 100000;
        }
    });

    updateBetModalUI();
    document.getElementById('bet-modal').style.display = 'flex';
}

function updateBetModalUI() {
    const userCoins = players[0].coins;
    document.getElementById('modal-coins').innerText = userCoins.toLocaleString();
    document.getElementById('coins-0').innerText = userCoins.toLocaleString();

    const btn10k = document.getElementById('bet-10k');
    const btn20k = document.getElementById('bet-20k');
    const btn50k = document.getElementById('bet-50k');
    const btn100k = document.getElementById('bet-100k');
    const btnAllin = document.getElementById('bet-allin');
    const bankruptArea = document.getElementById('bankrupt-area');

    btn10k.disabled = userCoins < 10000;
    btn20k.disabled = userCoins < 20000;
    btn50k.disabled = userCoins < 50000;
    btn100k.disabled = userCoins < 100000;
    btnAllin.disabled = userCoins <= 0;

    if (userCoins > 0) {
        btnAllin.innerText = `🔥 TẤT TAY (${userCoins.toLocaleString()} Xu)`;
    } else {
        btnAllin.innerText = `🔥 TẤT TAY (Hết tiền)`;
    }

    // Nếu người chơi hết sạch tiền (<= 0) hoặc không đủ 10k tối thiểu -> Hiện nút "Xin ông bô thêm 100k"
    if (userCoins <= 0) {
        bankruptArea.style.display = 'block';
    } else {
        bankruptArea.style.display = 'none';
    }
}

function askDadForMoney() {
    SoundFX.coinGrant();
    players[0].coins += 100000;
    triggerBannerAndShake("💸 Ông bô vừa bắn 100k!", false);
    updateBetModalUI();
    renderAll();
}

function confirmBet(amount) {
    const userCoins = players[0].coins;
    if (userCoins <= 0) return;

    if (amount === 'all') {
        currentBet = userCoins;
    } else {
        if (userCoins < amount) return;
        currentBet = amount;
    }

    document.getElementById('current-bet-display').innerText = currentBet.toLocaleString();
    document.getElementById('bet-modal').style.display = 'none';
    startNewGame();
}

function createDeck() {
    const deck = [];
    for (let r of RANKS) {
        for (let s of SUITS) {
            deck.push({
                label: r.label,
                rank: r.val,
                suitSymbol: s.symbol,
                suit: s.val,
                color: s.color,
                power: r.val * 4 + s.val,
                selected: false,
                rot: (Math.random() * 10 - 5).toFixed(1)
            });
        }
    }
    return deck;
}

function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

// ======================== TỰ ĐỘNG XẾP BÀI ========================
function sortHandByMode(hand, mode) {
    if (mode === 'power') {
        hand.sort((a, b) => a.power - b.power);
    } else {
        const counts = {};
        hand.forEach(c => counts[c.rank] = (counts[c.rank] || 0) + 1);
        hand.sort((a, b) => {
            if (counts[b.rank] !== counts[a.rank]) return counts[b.rank] - counts[a.rank];
            return a.power - b.power;
        });
    }
}

function toggleSortPlayerHand() {
    SoundFX.click();
    sortMode = sortMode === 'power' ? 'group' : 'power';
    document.getElementById('btn-sort').innerText =
        sortMode === 'power' ? 'Xếp bài: Độ lớn' : 'Xếp bài: Theo Bộ';
    sortHandByMode(players[0].hand, sortMode);
    renderAll();
}

// ======================== LUẬT TỚI TRẮNG ========================
function checkInstantWin(hand) {
    const sorted = [...hand].sort((a, b) => a.power - b.power);
    if (sorted.filter(c => c.rank === 15).length === 4) return "Tứ quý Heo";

    const rankCounts = {};
    sorted.forEach(c => rankCounts[c.rank] = (rankCounts[c.rank] || 0) + 1);

    let hasDragon = true;
    for (let r = 3; r <= 14; r++) {
        if (!rankCounts[r]) { hasDragon = false; break; }
    }
    if (hasDragon) return "Sảnh Rồng (3 đến A)";

    let maxConsec = 0, curConsec = 0;
    for (let r = 3; r <= 14; r++) {
        if ((rankCounts[r] || 0) >= 2) {
            curConsec++;
            if (curConsec > maxConsec) maxConsec = curConsec;
        } else curConsec = 0;
    }
    if (maxConsec >= 6) return "6 Đôi Thông";
    if (maxConsec === 5) return "5 Đôi Thông";

    let totalPairs = 0;
    Object.values(rankCounts).forEach(cnt => totalPairs += Math.floor(cnt / 2));
    if (totalPairs >= 6) return "6 Đôi bất kỳ";

    return null;
}

// ======================== KHỞI TẠO VÁN MỚI ========================
function startNewGame() {
    if (botTimer) clearTimeout(botTimer);
    SoundFX.deal();

    const deck = createDeck();
    shuffle(deck);

    players.forEach((p, idx) => {
        p.hand = deck.slice(idx * 13, (idx + 1) * 13);
        p.passed = false;
        if (idx === 0) sortHandByMode(p.hand, sortMode);
        else p.hand.sort((a, b) => a.power - b.power);
    });

    currentTableCards = [];
    lastPlayerIndex = null;
    requiredLowestCard = null;
    gameOver = false;
    animateDeal = true;
    setSubMessage("");

    for (let i = 0; i < 4; i++) {
        const instantReason = checkInstantWin(players[i].hand);
        if (instantReason) {
            triggerBannerAndShake(`🎉 TỚI TRẮNG: ${instantReason}!`, true);
            handleGameEnd(i, `🎉 TỚI TRẮNG! ${players[i].name} thắng ngay với [${instantReason}]!`, true);
            return;
        }
    }

    if (isFirstGame || lastWinner === null) {
        let starter = 0;
        for (let i = 0; i < 4; i++) {
            const hasThreeSpades = players[i].hand.find(c => c.power === 13);
            if (hasThreeSpades) {
                starter = i;
                requiredLowestCard = hasThreeSpades;
                break;
            }
        }
        currentTurn = starter;
        setStatus(`Ván đầu (Cược ${currentBet.toLocaleString()}): ${players[starter].name} giữ 3♠ nên đi trước!`);
    } else {
        currentTurn = lastWinner;
        setStatus(`Cược ${currentBet.toLocaleString()} Xu: ${players[currentTurn].name} thắng ván trước nên đi trước!`);
    }

    renderAll();
    animateDeal = false;

    if (players[currentTurn].isBot) {
        botTimer = setTimeout(botTurn, 1200);
    }
}

// ======================== HIỂN THỊ GIAO DIỆN & ANIMATION ========================
function renderAll(revealBots = false) {
    players.forEach((p, idx) => {
        document.getElementById(`coins-${idx}`).innerText = p.coins.toLocaleString();
        const seatEl = document.getElementById(`seat-${idx}`);
        seatEl.classList.toggle('active-turn', !gameOver && currentTurn === idx);
        seatEl.classList.toggle('passed-turn', p.passed);

        const badgeEl = document.getElementById(`badge-${idx}`);
        if (p.passed) {
            badgeEl.innerText = "Bỏ lượt";
            badgeEl.className = "badge pass";
        } else {
            badgeEl.className = "badge";
        }

        const handDiv = document.getElementById(`hand-${idx}`);
        handDiv.innerHTML = '';

        if (idx === 0) {
            p.hand.forEach((card, cardIdx) => {
                const el = createCardElement(card, false);
                if (card.selected) el.classList.add('selected');
                if (animateDeal) {
                    el.classList.add('deal-anim');
                    el.style.animationDelay = `${cardIdx * 0.035}s`;
                }
                el.onclick = () => {
                    if (gameOver) return;
                    card.selected = !card.selected;
                    SoundFX.click();
                    renderAll();
                };
                handDiv.appendChild(el);
            });
        } else {
            document.getElementById(`count-${idx}`).innerText = p.hand.length;
            p.hand.forEach(card => {
                if (revealBots) {
                    handDiv.appendChild(createCardElement(card, true));
                } else {
                    const back = document.createElement('div');
                    back.className = 'card-back';
                    handDiv.appendChild(back);
                }
            });
        }
    });

    const tableDiv = document.getElementById('played-cards');
    tableDiv.innerHTML = '';
    currentTableCards.forEach((card, idx) => {
        const el = createCardElement(card, false);
        el.style.setProperty('--rot', `${card.rot || 0}deg`);
        if (animateTableCards && lastPlayerIndex !== null) {
            el.classList.add(`fly-from-${lastPlayerIndex}`);
            el.style.animationDelay = `${idx * 0.04}s`;
        } else {
            el.style.transform = `rotate(${card.rot || 0}deg)`;
        }
        tableDiv.appendChild(el);
    });
    animateTableCards = false;
}

function createCardElement(card, isSmall) {
    const el = document.createElement('div');
    el.className = `card ${card.color} ${isSmall ? 'small' : ''}`;
    el.innerHTML = `
        <div>${card.label}${card.suitSymbol}</div>
        <div class="card-center">${card.suitSymbol}</div>
        <div style="text-align:right">${card.label}</div>
    `;
    return el;
}

// ======================== NHẬN DIỆN BỘ BÀI & LUẬT CHẶT ========================
function getComboType(cards) {
    if (!cards || cards.length === 0) return 'invalid';
    const sorted = [...cards].sort((a, b) => a.power - b.power);
    const n = sorted.length;
    const isSameRank = sorted.every(c => c.rank === sorted[0].rank);

    if (n === 1) return 'single';
    if (n === 2 && isSameRank) return 'pair';
    if (n === 3 && isSameRank) return 'triple';
    if (n === 4 && isSameRank) return 'quad';

    if (n === 6 || n === 8) {
        if (!sorted.some(c => c.rank === 15)) {
            let ok = true;
            for (let i = 0; i < n; i += 2) {
                if (sorted[i].rank !== sorted[i + 1].rank) { ok = false; break; }
                if (i > 0 && sorted[i].rank !== sorted[i - 2].rank + 1) { ok = false; break; }
            }
            if (ok) return n === 6 ? '3pairs' : '4pairs';
        }
    }

    if (n >= 3 && !sorted.some(c => c.rank === 15)) {
        let isStraight = true;
        for (let i = 1; i < n; i++) {
            if (sorted[i].rank !== sorted[i - 1].rank + 1) { isStraight = false; break; }
        }
        if (isStraight) return 'straight';
    }

    return 'invalid';
}

function canBeat(newCards, tableCards) {
    const newType = getComboType(newCards);
    if (newType === 'invalid') return false;
    if (tableCards.length === 0) return true;

    const sortedNew = [...newCards].sort((a, b) => a.power - b.power);
    const sortedTable = [...tableCards].sort((a, b) => a.power - b.power);

    const tableType = getComboType(sortedTable);
    const maxNew = sortedNew[sortedNew.length - 1].power;
    const maxTable = sortedTable[sortedTable.length - 1].power;

    const isSingleTwo = (tableType === 'single' && sortedTable[0].rank === 15);
    const isPairTwo = (tableType === 'pair' && sortedTable[0].rank === 15);

    if (newType === '3pairs' && isSingleTwo) return true;
    if (newType === 'quad' && (isSingleTwo || isPairTwo || tableType === '3pairs')) return true;
    if (newType === '4pairs' && (isSingleTwo || isPairTwo || tableType === '3pairs' || tableType === 'quad')) return true;

    if (newType === tableType && sortedNew.length === sortedTable.length) {
        return maxNew > maxTable;
    }
    return false;
}

// ======================== TÍNH TIỀN CHẶT HEO & PHẠT THỐI BÀI THEO CƯỢC ========================
function deductCoins(payerIdx, receiverIdx, amount) {
    players[payerIdx].coins = Math.max(0, players[payerIdx].coins - amount);
    players[receiverIdx].coins += amount;
}

function checkAndApplyChopPenalty(attackerIdx, defenderIdx, newCards, oldTableCards) {
    if (oldTableCards.length === 0 || defenderIdx === null || attackerIdx === defenderIdx) return false;

    const oldType = getComboType(oldTableCards);
    const newType = getComboType(newCards);

    let penalty = 0;
    let reason = "";
    let bannerTitle = "";

    if (oldType === 'single' && oldTableCards[0].rank === 15 && (newType === '3pairs' || newType === 'quad' || newType === '4pairs')) {
        const isRedTwo = oldTableCards[0].suit >= 3;
        penalty = isRedTwo ? currentBet : Math.floor(currentBet * 0.5);
        reason = `Chặt Heo ${isRedTwo ? 'Đỏ' : 'Đen'} (-${penalty.toLocaleString()} Xu)`;
        bannerTitle = `🔥 CHẶT HEO ${isRedTwo ? 'ĐỎ' : 'ĐEN'}!`;
    } else if (oldType === 'pair' && oldTableCards[0].rank === 15 && (newType === 'quad' || newType === '4pairs')) {
        penalty = Math.floor(currentBet * 1.5);
        reason = `Chặt Đôi Heo (-${penalty.toLocaleString()} Xu)`;
        bannerTitle = `💥 CHẶT ĐÔI HEO!`;
    } else if (oldType === '3pairs' && (newType === '3pairs' || newType === 'quad' || newType === '4pairs')) {
        penalty = currentBet;
        reason = `Chặt 3 Đôi Thông (-${penalty.toLocaleString()} Xu)`;
        bannerTitle = `⚡ CHẶT 3 ĐÔI THÔNG!`;
    } else if (oldType === 'quad' && (newType === 'quad' || newType === '4pairs')) {
        penalty = Math.floor(currentBet * 1.5);
        reason = `Chặt Tứ Quý (-${penalty.toLocaleString()} Xu)`;
        bannerTitle = `🔥 CHẶT TỨ QUÝ!`;
    } else if (oldType === '4pairs' && newType === '4pairs') {
        penalty = currentBet * 2;
        reason = `Chặt 4 Đôi Thông (-${penalty.toLocaleString()} Xu)`;
        bannerTitle = `🌋 ĐÈ 4 ĐÔI THÔNG!`;
    }

    if (penalty > 0) {
        deductCoins(defenderIdx, attackerIdx, penalty);
        setSubMessage(`🔥 ${players[attackerIdx].name} vừa ${reason} của ${players[defenderIdx].name}!`);
        SoundFX.chop();
        triggerBannerAndShake(bannerTitle, true);
        return true;
    }
    return false;
}

function calculateEndGamePenalties(winnerIdx, isInstantWin) {
    const baseReward = isInstantWin ? currentBet * 2 : currentBet;
    const details = [];

    players.forEach((loser, idx) => {
        if (idx === winnerIdx) return;

        let totalLost = baseReward;
        const notes = [];

        if (!isInstantWin && loser.hand.length === 13) {
            totalLost += currentBet;
            notes.push("Cóng 13 lá");
        }

        loser.hand.forEach(c => {
            if (c.rank === 15) {
                const isRed = c.suit >= 3;
                totalLost += isRed ? currentBet : Math.floor(currentBet * 0.5);
                notes.push(`Thối 2${c.suitSymbol}`);
            }
        });

        const rankCounts = {};
        loser.hand.forEach(c => {
            if (c.rank < 15) rankCounts[c.rank] = (rankCounts[c.rank] || 0) + 1;
        });

        Object.keys(rankCounts).forEach(r => {
            if (rankCounts[r] === 4) {
                totalLost += Math.floor(currentBet * 1.5);
                notes.push("Thối Tứ Quý");
            }
        });

        let consecPairs = 0;
        for (let r = 3; r <= 14; r++) {
            if ((rankCounts[r] || 0) >= 2) consecPairs++;
            else {
                if (consecPairs === 3) { totalLost += currentBet; notes.push("Thối 3 Đôi Thông"); }
                if (consecPairs >= 4) { totalLost += currentBet * 2; notes.push("Thối 4 Đôi Thông"); }
                consecPairs = 0;
            }
        }
        if (consecPairs === 3) { totalLost += currentBet; notes.push("Thối 3 Đôi Thông"); }
        if (consecPairs >= 4) { totalLost += currentBet * 2; notes.push("Thối 4 Đôi Thông"); }

        deductCoins(idx, winnerIdx, totalLost);

        if (notes.length > 0) {
            details.push(`${loser.name}: -${totalLost.toLocaleString()} (${notes.join(', ')})`);
        } else {
            details.push(`${loser.name}: -${totalLost.toLocaleString()}`);
        }
    });

    return details.join(" | ");
}

function handleGameEnd(winnerIdx, mainMessage, isInstantWin = false) {
    gameOver = true;
    isFirstGame = false;
    lastWinner = winnerIdx;

    if (winnerIdx === 0) {
        SoundFX.win();
        if (!isInstantWin) triggerBannerAndShake("🏆 BẠN VỀ NHẤT!", false);
    } else {
        SoundFX.lose();
    }

    const summary = calculateEndGamePenalties(winnerIdx, isInstantWin);
    renderAll(true);
    setStatus(mainMessage);
    setSubMessage(`💰 Tổng kết: ${summary}`);

    // Nếu người chơi hết sạch tiền sau ván đấu -> Tự động bật bảng Xin Ông Bô sau 2.2 giây
    if (players[0].coins <= 0) {
        setTimeout(() => openBetModal(), 2200);
    }
}

// ======================== ĐIỀU HƯỚNG VÒNG ĐÁNH 4 NGƯỜI ========================
function advanceTurn() {
    if (gameOver) return;

    const activePlayers = players.filter(p => !p.passed);
    if (activePlayers.length === 1 && lastPlayerIndex !== null) {
        currentTurn = lastPlayerIndex;
        currentTableCards = [];
        players.forEach(p => p.passed = false);
        setStatus(`Tất cả đã bỏ lượt! ${players[currentTurn].name} được quyền ra bài vòng mới.`);
        renderAll();

        if (players[currentTurn].isBot) {
            botTimer = setTimeout(botTurn, 1000);
        }
        return;
    }

    let next = (currentTurn + 1) % 4;
    while (players[next].passed) {
        next = (next + 1) % 4;
    }
    currentTurn = next;
    renderAll();

    if (players[currentTurn].isBot) {
        botTimer = setTimeout(botTurn, 1000);
    } else {
        setStatus("Tới lượt của bạn! Hãy chọn bài để đánh hoặc Bỏ lượt.");
    }
}

// ======================== LƯỢT CỦA NGƯỜI CHƠI (BẠN) ========================
function playSelectedCards() {
    if (gameOver) return;

    const selected = players[0].hand.filter(c => c.selected);
    const comboType = getComboType(selected);

    const isFourPairsInterrupt = (comboType === '4pairs' && canBeat(selected, currentTableCards));

    if (currentTurn !== 0 && !isFourPairsInterrupt) {
        setStatus("Chưa tới lượt của bạn!");
        return;
    }

    if (selected.length === 0) {
        setStatus("Bạn chưa chọn lá bài nào!");
        return;
    }

    if (requiredLowestCard) {
        const hasLowest = selected.some(c => c.power === requiredLowestCard.power);
        if (!hasLowest) {
            setStatus(`Lượt đầu ván đầu tiên bắt buộc phải đánh bộ có chứa lá 3♠!`);
            return;
        }
    }

    if (!canBeat(selected, currentTableCards)) {
        setStatus("Bài chọn không hợp lệ hoặc không chặt được bài trên bàn!");
        return;
    }

    if (botTimer) clearTimeout(botTimer);
    players[0].passed = false;

    const didChop = checkAndApplyChopPenalty(0, lastPlayerIndex, selected, currentTableCards);
    if (!didChop) SoundFX.playCard();

    currentTableCards = selected.map(c => ({
        ...c,
        selected: false,
        rot: (Math.random() * 10 - 5).toFixed(1)
    })).sort((a, b) => a.power - b.power);

    players[0].hand = players[0].hand.filter(c => !c.selected);
    lastPlayerIndex = 0;
    animateTableCards = true;
    requiredLowestCard = null;
    currentTurn = 0;

    if (players[0].hand.length === 0) {
        handleGameEnd(0, "🏆 CHÚC MỪNG! Bạn đã về Nhất ván này!");
        return;
    }

    // Nếu bị chặt giữa ván mà hết sạch tiền vẫn cho đánh hết ván, cuối ván xin ông bô
    setStatus("Bạn vừa ra bài...");
    advanceTurn();
}

function passTurn() {
    if (gameOver || currentTurn !== 0) return;
    if (currentTableCards.length === 0) {
        setStatus("Bạn đang cầm cái vòng mới, không thể bỏ lượt!");
        return;
    }

    SoundFX.pass();
    players[0].passed = true;
    players[0].hand.forEach(c => c.selected = false);
    setStatus("Bạn đã bỏ lượt trong vòng này.");
    advanceTurn();
}

// ======================== AI CHO 3 BOT ========================
function findBotMove(hand, tableCards, mustIncludeCard) {
    const sortedHand = [...hand].sort((a, b) => a.power - b.power);

    if (mustIncludeCard) {
        const uniqueRanks = [];
        const byRank = {};
        sortedHand.forEach(c => {
            if (c.rank < 15 && !byRank[c.rank]) {
                uniqueRanks.push(c.rank);
                byRank[c.rank] = c;
            }
        });
        byRank[3] = mustIncludeCard;
        if (uniqueRanks[0] === 3 && uniqueRanks[1] === 4 && uniqueRanks[2] === 5) {
            return [byRank[3], byRank[4], byRank[5]];
        }
        if (sortedHand.length >= 2 && sortedHand[0].rank === sortedHand[1].rank) {
            return [sortedHand[0], sortedHand[1]];
        }
        return [mustIncludeCard];
    }

    if (tableCards.length === 0) {
        const byRank = {};
        sortedHand.forEach(c => {
            if (c.rank < 15 && !byRank[c.rank]) byRank[c.rank] = c;
        });
        const ranks = Object.keys(byRank).map(Number).sort((a, b) => a - b);
        for (let i = 0; i <= ranks.length - 3; i++) {
            if (ranks[i + 1] === ranks[i] + 1 && ranks[i + 2] === ranks[i] + 2 && ranks[i] <= 10) {
                return [byRank[ranks[i]], byRank[ranks[i + 1]], byRank[ranks[i + 2]]];
            }
        }
        for (let i = 0; i < sortedHand.length - 1; i++) {
            if (sortedHand[i].rank === sortedHand[i + 1].rank && sortedHand[i].rank <= 11) {
                return [sortedHand[i], sortedHand[i + 1]];
            }
        }
        return [sortedHand[0]];
    }

    const tableType = getComboType(tableCards);
    const n = tableCards.length;

    if (tableType === 'single') {
        const found = sortedHand.find(c => c.power > tableCards[0].power);
        if (found) return [found];
    } else if (tableType === 'pair') {
        for (let i = 0; i < sortedHand.length - 1; i++) {
            const pair = [sortedHand[i], sortedHand[i + 1]];
            if (canBeat(pair, tableCards)) return pair;
        }
    } else if (tableType === 'triple') {
        for (let i = 0; i < sortedHand.length - 2; i++) {
            const triple = [sortedHand[i], sortedHand[i + 1], sortedHand[i + 2]];
            if (canBeat(triple, tableCards)) return triple;
        }
    } else if (tableType === 'straight') {
        const uniqueRanks = [];
        const cardByRank = {};
        sortedHand.forEach(c => {
            if (c.rank < 15) {
                if (!cardByRank[c.rank]) uniqueRanks.push(c.rank);
                cardByRank[c.rank] = c;
            }
        });
        for (let i = 0; i <= uniqueRanks.length - n; i++) {
            const candidate = [];
            for (let j = 0; j < n; j++) candidate.push(cardByRank[uniqueRanks[i + j]]);
            if (canBeat(candidate, tableCards)) return candidate;
        }
    }

    for (let i = 0; i <= sortedHand.length - 4; i++) {
        const quad = sortedHand.slice(i, i + 4);
        if (canBeat(quad, tableCards)) return quad;
    }

    const pairs = [];
    for (let i = 0; i < sortedHand.length - 1; i++) {
        if (sortedHand[i].rank === sortedHand[i + 1].rank && sortedHand[i].rank < 15) {
            pairs.push([sortedHand[i], sortedHand[i + 1]]);
            i++;
        }
    }
    for (let i = 0; i <= pairs.length - 4; i++) {
        const fourPairs = [...pairs[i], ...pairs[i + 1], ...pairs[i + 2], ...pairs[i + 3]];
        if (canBeat(fourPairs, tableCards)) return fourPairs;
    }
    for (let i = 0; i <= pairs.length - 3; i++) {
        const threePairs = [...pairs[i], ...pairs[i + 1], ...pairs[i + 2]];
        if (canBeat(threePairs, tableCards)) return threePairs;
    }

    return null;
}

function botTurn() {
    if (gameOver) return;

    const bot = players[currentTurn];
    const chosen = findBotMove(bot.hand, currentTableCards, requiredLowestCard);

    if (chosen) {
        const didChop = checkAndApplyChopPenalty(currentTurn, lastPlayerIndex, chosen, currentTableCards);
        if (!didChop) SoundFX.playCard();

        currentTableCards = chosen.map(c => ({
            ...c,
            rot: (Math.random() * 10 - 5).toFixed(1)
        })).sort((a, b) => a.power - b.power);

        bot.hand = bot.hand.filter(c => !chosen.includes(c));
        lastPlayerIndex = currentTurn;
        animateTableCards = true;
        requiredLowestCard = null;

        if (bot.hand.length === 0) {
            handleGameEnd(currentTurn, `💀 ${bot.name} đã đánh hết bài và về Nhất!`);
            return;
        }

        setStatus(`${bot.name} vừa đánh ${chosen.length} lá.`);
    } else {
        SoundFX.pass();
        bot.passed = true;
        setStatus(`${bot.name} bỏ lượt!`);
    }

    advanceTurn();
}

function setStatus(msg) {
    document.getElementById('status-message').innerText = msg;
}

function setSubMessage(msg) {
    document.getElementById('sub-message').innerText = msg;
}

// Mở bảng chọn mức cược ngay khi vào trang
openBetModal();