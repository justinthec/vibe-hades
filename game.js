const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    const container = document.querySelector('.game-container');
    const dpi = window.devicePixelRatio || 1;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    canvas.style.width = `${containerWidth}px`;
    canvas.style.height = `${containerHeight}px`;
    canvas.width = Math.floor(containerWidth * dpi);
    canvas.height = Math.floor(containerHeight * dpi);
    ctx.scale(dpi, dpi);
    ctx.font = "16px 'Press Start 2P'";
    console.log(`Canvas resized to: ${canvas.width}x${canvas.height} (Style: ${canvas.style.width}x${canvas.style.height})`);
}
window.addEventListener('resize', resizeCanvas);

// --- Config ---
const PLAYER_SIZE = 25;
let PLAYER_SPEED = 2.5;
const PLAYER_HEALTH_MAX_BASE = 100;
const PLAYER_DASH_SPEED_MULT = 3;
const PLAYER_DASH_DURATION = 150;
let PLAYER_DASH_COOLDOWN = 1000;
const PLAYER_DASH_DAMAGE = 20;
const PLAYER_POST_DASH_INVINCIBILITY = 500; // Half second of invincibility after dash
const PLAYER_AURA_DAMAGE_BASE = 3;
const PLAYER_AURA_RADIUS_BASE = 75;
const PLAYER_AURA_TICK_RATE = 250; // Apply aura damage every 250ms
const DASH_TRAIL_LENGTH = 8;
const DASH_TRAIL_INTERVAL = 20;
const PLAYER_HIT_SOUND_COOLDOWN = 100;
const PLAYER_DAMAGE_INDICATOR_DURATION = 150;
const PLAYER_COLLISION_IFRAME_DURATION = 200; /* Reduced collision invulnerability */
const PLAYER_INITIAL_REROLLS = 3; /* NEW: Rerolls */
const POWERUP_CHOICES = 3;
const LOW_HEALTH_THRESHOLD = 0.3;
const LOW_HEALTH_HEAL_BOOST_FACTOR = 7;
const DAMAGE_NUMBER_LIFETIME = 800;
const DAMAGE_NUMBER_FLOAT_SPEED = -0.8;
const HEALTH_BAR_ANIMATION_SPEED = 0.1;
const GHOST_HEALTH_FADE_DURATION = 500;

const BULLET_SIZE = 6;
let BULLET_SPEED_BASE = 7;
let BULLET_SPEED = BULLET_SPEED_BASE;
let BULLET_COOLDOWN_BASE = 300; /* Set back to 300 */
let BULLET_COOLDOWN = BULLET_COOLDOWN_BASE;
let BULLET_DAMAGE_BASE = 25;
let BULLET_DAMAGE = BULLET_DAMAGE_BASE;
let BULLET_PIERCE_COUNT = 0;
let SHOTGUN_SPREAD_COUNT = 1;
const SHOTGUN_ANGLE = Math.PI / 18;
let BULLET_BOUNCE_COUNT = 0;
const MAX_HOMING_STRENGTH = 0.05;
let BULLET_HOMING_STRENGTH = 0;
const CRIT_CHANCE_BASE = 0.0;
const CRIT_DAMAGE_MULTIPLIER_BASE = 1.5;

const BOMB_COOLDOWN = 8000;
const BOMB_SPEED = 5;
const BOMB_RADIUS = 110; // Slightly increased radius
const BOMB_DAMAGE = 75;
const BOMB_EXPLOSION_DURATION = 450; // ** Increased explosion duration **
const BOMB_SIZE = 20;

const ENEMY_SPAWN_RATE_BASE = 2000;
const ENEMY_SPAWN_RATE_DECREASE_FACTOR = 0.85;
const MIN_ENEMY_SPAWN_RATE = 300;
const BASIC_ENEMY_WAVE_CUTOFF = 8; // Wave after which basic enemies no longer spawn
const ENEMY_SCALING_FACTOR_PER_WAVE = 0.03; // NEW: Dropped to 3% increase per wave
const ENEMY_BASIC_SIZE = 20; const ENEMY_BASIC_SPEED = 1.5; const ENEMY_BASIC_HEALTH_BASE = 30; const ENEMY_BASIC_DAMAGE_BASE = 1;
const ENEMY_CHARGER_SIZE = 24; const ENEMY_CHARGER_SPEED = 1.0; const ENEMY_CHARGER_CHARGE_SPEED = 4.0; const ENEMY_CHARGER_HEALTH_BASE = 50; const ENEMY_CHARGER_DAMAGE_BASE = 5; const ENEMY_CHARGER_WINDUP = 1000; const ENEMY_CHARGER_COOLDOWN = 2000;
const ENEMY_HOMING_CHARGER_SIZE = 24; const ENEMY_HOMING_CHARGER_SPEED = 1.2; const ENEMY_HOMING_CHARGER_CHARGE_SPEED = 3.5; const ENEMY_HOMING_CHARGER_HEALTH_BASE = 60; const ENEMY_HOMING_CHARGER_DAMAGE_BASE = 5; const ENEMY_HOMING_CHARGER_WINDUP = 1200; const ENEMY_HOMING_CHARGER_COOLDOWN = 2500; const HOMING_TURN_RATE = 0.05;
const ENEMY_SHOOTER_SIZE = 22; const ENEMY_SHOOTER_SPEED = 1.0; const ENEMY_SHOOTER_HEALTH_BASE = 40; const ENEMY_SHOOTER_RANGE = 250; const ENEMY_SHOOTER_COOLDOWN = 1500;
const ENEMY_SHOOTER_BURST_SIZE = 22; const ENEMY_SHOOTER_BURST_SPEED = 0.8; const ENEMY_SHOOTER_BURST_HEALTH_BASE = 45; const ENEMY_SHOOTER_BURST_RANGE = 280; const ENEMY_SHOOTER_BURST_COOLDOWN = 2000; const ENEMY_SHOOTER_BURST_COUNT = 3; const ENEMY_SHOOTER_BURST_DELAY = 150;
const ENEMY_SHOOTER_SPREAD_SIZE = 24; const ENEMY_SHOOTER_SPREAD_SPEED = 0.9; const ENEMY_SHOOTER_SPREAD_HEALTH_BASE = 50; const ENEMY_SHOOTER_SPREAD_RANGE = 220; const ENEMY_SHOOTER_SPREAD_COOLDOWN = 2200; const ENEMY_SHOOTER_SPREAD_COUNT = 5; const ENEMY_SHOOTER_SPREAD_ANGLE = Math.PI / 12;
const ENEMY_SHOOTER_SNIPER_SIZE = 20; const ENEMY_SHOOTER_SNIPER_SPEED = 0.5; const ENEMY_SHOOTER_SNIPER_HEALTH_BASE = 35; const ENEMY_SHOOTER_SNIPER_RANGE = 350; const ENEMY_SHOOTER_SNIPER_COOLDOWN = 3000; const ENEMY_SHOOTER_SNIPER_TARGET_TIME = 1000; const ENEMY_SHOOTER_SNIPER_FIRE_DELAY = 150;
const ENEMY_LASER_DAMAGE_BASE = 15; const ENEMY_LASER_DURATION = 150;
const ENEMY_BULLET_SIZE = 7; const ENEMY_BULLET_SPEED = 4; const ENEMY_BULLET_DAMAGE_BASE = 5;
const ENEMY_SHIELD_SIZE = 22; const ENEMY_SHIELD_SPEED = 1.2; const ENEMY_SHIELD_HEALTH_BASE = 60; const SHIELD_ANGLE_WIDTH = Math.PI * 1.3; const SHIELD_ROTATION_PER_FRAME = 0.01; const ENEMY_SHIELD_DAMAGE_BASE = 5; /* Increased shield collision damage */

const backgroundThemes = [
    { name: "Grass", color: "hsl(120, 35%, 20%)" }, { name: "Forest", color: "hsl(110, 40%, 15%)" }, { name: "Stone", color: "hsl(0, 0%, 25%)" }, { name: "Sky", color: "hsl(210, 40%, 28%)" }, { name: "Ocean", color: "hsl(230, 45%, 22%)" }, { name: "Lava", color: "hsl(20, 50%, 28%)" }, { name: "Space", color: "hsl(240, 60%, 10%)" }
];
let currentBackgroundColor = backgroundThemes[0].color;
const obstacles = [ /* Can add {x, y, width, height} later */];
let player = {};
let enemies = [];
let bullets = [];
let enemyBullets = [];
let activeLasers = [];
let damageNumbers = [];
let bombs = [];
let explosions = [];
let keys = {};
let score = 0;
let wave = 1;
let enemiesToSpawn = 5;
let enemiesSpawnedThisWave = 0;
let lastEnemySpawnTime = 0;
let currentEnemySpawnRate = ENEMY_SPAWN_RATE_BASE;
let gameOver = false;
let gamePaused = false;
let selectingPowerup = false;
let cursorX = 0;
let cursorY = 0;
let mouseInCanvas = false;
let soundsInitialized = false;
let backgroundMusicLoop;
let lastTrailTime = 0;
let damageIndicatorTimeout;
let isMusicMuted = false;
let DEBUG_MODE = false; /* NEW Debug Mode */
let lastFrameTime = 0;
let fps = 0; /* FPS Tracking */
let lastAuraDamageTime = 0; // ** For static aura tick **

const scoreUI = document.getElementById('score-ui');
const waveUI = document.getElementById('wave-ui');
const dashCooldownUI = document.getElementById('dash-cooldown-ui');
const bombCooldownUI = document.getElementById('bomb-cooldown-ui'); /* Bomb UI Element */
const activePowerupsUI = document.getElementById('active-powerups-ui');
const messageBox = document.getElementById('message-box');
const messageText = document.getElementById('message-text');
const restartButton = document.getElementById('restart-button');
const powerupSelectionDiv = document.getElementById('powerup-selection');
const powerupOptionsDiv = document.getElementById('powerup-options');
const playerHealthBarFill = document.getElementById('player-health-bar-fill');
const playerHealthBarGhost = document.getElementById('player-health-bar-ghost');
const playerHealthText = document.getElementById('player-health-text');
const muteButton = document.getElementById('mute-button');
const helpOverlay = document.getElementById('help-overlay');
const helpButton = document.getElementById('help-button');
const closeHelpButton = document.getElementById('close-help-button');
const fpsCounter = document.getElementById('fps-counter'); /* FPS Counter Element */

// --- Sound Setup ---
let hitSynth, playerHitSynth, shootSynth, powerupSynth, enemyShootSynth, shieldBlockSynth, dashSynth, bgMusicSynth, laserSynth, bombSynth, explosionSynth, distortion;
function setupSounds() {
    try {
        if (typeof Tone === 'undefined' || !Tone || !Tone.Synth) {
            console.error("Tone.js not loaded correctly.");
            return;
        }
        Tone.start();

        hitSynth = new Tone.Synth({ oscillator: { type: 'square' }, envelope: { attack: 0.01, decay: 0.1, sustain: 0, release: 0.1 }, volume: -18 }).toDestination();

        // Player Hit Sound - Low Synth Tone with Distortion
        distortion = new Tone.Distortion(0.6).toDestination();
        playerHitSynth = new Tone.Synth({ oscillator: { type: 'triangle' }, /* Changed oscillator */ envelope: { attack: 0.01, decay: 0.15, sustain: 0, release: 0.1 }, volume: -12 /* Adjusted volume */ }).connect(distortion); /* Connect to distortion */

        shootSynth = new Tone.MembraneSynth({ pitchDecay: 0.01, octaves: 5, oscillator: { type: 'sine' }, envelope: { attack: 0.001, decay: 0.2, sustain: 0, release: 0.1 }, volume: -22 }).toDestination();
        powerupSynth = new Tone.Synth({ oscillator: { type: 'triangle' }, envelope: { attack: 0.02, decay: 0.3, sustain: 0.2, release: 0.5 }, volume: -12 }).toDestination();
        const reverb = new Tone.Reverb(0.5).toDestination();
        powerupSynth.connect(reverb);
        enemyShootSynth = new Tone.Synth({ oscillator: { type: 'sawtooth' }, envelope: { attack: 0.02, decay: 0.1, sustain: 0, release: 0.2 }, volume: -20 }).toDestination();
        shieldBlockSynth = new Tone.MetalSynth({ frequency: 80, envelope: { attack: 0.005, decay: 0.1, release: 0.05 }, harmonicity: 3.1, modulationIndex: 16, resonance: 1500, octaves: 0.5, volume: -16 }).toDestination();
        dashSynth = new Tone.NoiseSynth({ noise: { type: 'pink' }, envelope: { attack: 0.01, decay: 0.1, sustain: 0, release: 0.1 }, volume: -20 }).toDestination();
        laserSynth = new Tone.Synth({ oscillator: { type: 'pulse', width: 0.8 }, envelope: { attack: 0.01, decay: 0.1, sustain: 0.05, release: 0.1 }, volume: -15 }).toDestination();

        bombSynth = new Tone.Synth({ oscillator: { type: 'sine' }, envelope: { attack: 0.01, decay: 0.1, sustain: 0.2, release: 0.3 }, volume: -15 }).toDestination(); // Bomb throw sound

        // ** Enhanced Explosion Sound **
        explosionSynth = new Tone.NoiseSynth({
            noise: { type: "white" }, // Changed to white for sharper sound
            envelope: { attack: 0.01, decay: 0.3, sustain: 0.05, release: 0.3 }, // Adjusted envelope
            volume: -8 // Increased volume
        }).toDestination();
        const explosionReverb = new Tone.Reverb(0.8).toDestination();
        explosionSynth.connect(explosionReverb); // Added reverb


        bgMusicSynth = new Tone.PolySynth(Tone.Synth, { oscillator: { type: 'pwm', modulationFrequency: 0.2 }, envelope: { attack: 0.02, decay: 0.1, sustain: 0.2, release: 0.9 }, volume: -33 /* Lowered music volume */ }).toDestination();
        const musicPattern = ["C3", ["E3", "G3"], "G3", ["C4", "E4"]];
        let patternIndex = 0;
        backgroundMusicLoop = new Tone.Loop(time => {
            const note = musicPattern[patternIndex % musicPattern.length];
            bgMusicSynth.triggerAttackRelease(note, "8n", time);
            patternIndex++;
        }, "4n").start(0);
        if (backgroundMusicLoop) backgroundMusicLoop.mute = isMusicMuted;

        Tone.Transport.bpm.value = 90;
        Tone.Transport.start();
        console.log("Sounds setup complete.");
    } catch (error) {
        console.error("Error setting up sounds:", error);
    }
}

// --- Help Screen & Sound Init ---
function initializeSoundsOnInteraction() {
    hideHelp(); // Hide help on first interaction
    if (!soundsInitialized) {
        console.log("Attempting sound initialization...");
        setupSounds();
        soundsInitialized = true;
        window.removeEventListener('keydown', initializeSoundsOnInteraction);
        canvas.removeEventListener('mousemove', initializeSoundsOnInteraction);
        console.log("Sound initialization listeners removed.");
        requestAnimationFrame(gameLoop); /* START GAME LOOP */
    }
}
window.addEventListener('keydown', initializeSoundsOnInteraction, { once: true });
canvas.addEventListener('mousemove', initializeSoundsOnInteraction, { once: true });

function showHelp() {
    if (helpOverlay) helpOverlay.style.display = 'flex';
}
function hideHelp() {
    if (helpOverlay) helpOverlay.style.display = 'none';
}
helpButton.addEventListener('click', showHelp);
closeHelpButton.addEventListener('click', hideHelp);

// --- Power-up Definitions ---
const powerups = [
    { id: 'hp_up', name: 'Hearty Meal', description: '+25 Max HP', icon: '❤️', type: 'stackable', maxLevel: 99, apply: (p) => { p.maxHealth += 25; p.health = Math.min(p.maxHealth, p.health + 25); /* Heal by the same amount, capped */ }, baseValue: 25 },
    { id: 'regen', name: 'Minor Regeneration', description: 'Heal 15 HP Now', icon: '💖', type: 'stackable', maxLevel: 99, apply: (p) => { p.health = Math.min(p.maxHealth, p.health + 15); }, isHealing: true },
    { id: 'major_regen', name: 'Major Regeneration', description: 'Heal 50 HP Now', icon: '🌟', type: 'stackable', maxLevel: 99, apply: (p) => { p.health = Math.min(p.maxHealth, p.health + 50); }, isHealing: true },
    { id: 'static_field', name: 'Static Field', description: 'Emit a damaging aura', icon: '✨', type: 'unique', apply: (p) => { p.hasDamageAura = true; p.auraRadius = PLAYER_AURA_RADIUS_BASE; p.auraDamage = PLAYER_AURA_DAMAGE_BASE; } },
    { id: 'static_field_size', name: 'Wider Field', description: '+25 Aura Radius', icon: '↔️', type: 'stackable', maxLevel: 4, prerequisite: 'static_field', apply: (p) => { p.auraRadius += 25; }, baseValue: 25 },
    { id: 'static_field_damage', name: 'Intense Field', description: '+50% Aura Damage', icon: '💥', type: 'stackable', maxLevel: 4, prerequisite: 'static_field', apply: (p) => { p.auraDamage *= 1.5; }, multiplier: 1.5 },
    { id: 'dash_cd_down', name: 'Quick Reflex', description: 'Reduce Dash Cooldown by 20%', icon: '⚡️', type: 'stackable', maxLevel: 3, apply: (p) => { PLAYER_DASH_COOLDOWN *= 0.8; }, multiplier: 0.8 },
    { id: 'dash_damage', name: 'Power Dash', description: `Dash grants invincibility and deals ${PLAYER_DASH_DAMAGE} damage to enemies in path`, icon: '☄️', type: 'unique', apply: (p) => { p.unlockedPowerDash = true; } },
    { id: 'double_dash', name: 'Double Dash', description: 'Gain a second dash charge', icon: '💨', type: 'unique', apply: (p) => { p.maxDashCharges = 2; p.dashCharges = 2; } },
    { id: 'fire_rate_up', name: 'Rapid Fire', description: 'Shoot 20% Faster', icon: '🔥', type: 'stackable', maxLevel: 4, apply: (p) => { BULLET_COOLDOWN *= 0.8; }, multiplier: 0.8 },
    { id: 'bullet_speed_up', name: 'Velocity Shot', description: '+2 Bullet Speed', icon: '🚀', type: 'stackable', maxLevel: 5, apply: (p) => { BULLET_SPEED += 2; }, baseValue: 2 },
    { id: 'damage_up', name: 'Sharpened Edge', description: '+10 Bullet Damage', icon: '⚔️', type: 'stackable', maxLevel: 5, apply: (p) => { BULLET_DAMAGE += 10; }, baseValue: 10 },
    { id: 'pierce_shot', name: 'Piercing Arrow', description: 'Bullets pierce 1 additional enemy', icon: '➡️', type: 'stackable', maxLevel: 3, apply: (p) => { BULLET_PIERCE_COUNT += 1; }, baseValue: 1 },
    { id: 'shotgun_blast', name: 'Spread Fire', description: 'Fire 3 bullets in a spread', icon: '💥', type: 'unique', apply: (p) => { SHOTGUN_SPREAD_COUNT = 3; } },
    { id: 'bullet_bounce', name: 'Ricochet Shot', description: 'Bullets bounce off walls once', icon: '🔄', type: 'unique', apply: (p) => { BULLET_BOUNCE_COUNT = 1; } },
    { id: 'bullet_homing_stack', name: 'Seeking Shots', description: 'Bullets slightly seek enemies', icon: '🎯', type: 'stackable', maxLevel: 5, apply: (p) => { const level = (p.powerupLevels['bullet_homing_stack'] || 0) + 1; BULLET_HOMING_STRENGTH = level * (MAX_HOMING_STRENGTH / 5); } },
    /* { id: 'crit_chance', name: 'Precision Strike', description: '+5% Critical Hit Chance', icon: '%', type: 'stackable', maxLevel: 6, apply: (p) => { p.critChance += 0.05; }, baseValue: 0.05}, */ /* Commented Out */
    /* { id: 'crit_damage', name: 'Lethal Force', description: '+25% Critical Hit Damage', icon: '☠️', type: 'stackable', maxLevel: 4, prerequisite: 'crit_chance', apply: (p) => { p.critMultiplier += 0.25; }, baseValue: 0.25 }, */ /* Commented Out */
    { id: 'throw_bomb', name: 'Throw Bomb', description: `Throw a bomb (E Key, ${BOMB_COOLDOWN / 1000}s CD)`, icon: '💣', type: 'unique', apply: (p) => { p.hasBomb = true; } }, // Updated Bomb Description
];
const powerupIcons = powerups.reduce((acc, p) => { acc[p.id] = p.icon; return acc; }, {});

// --- Input Handling --- Added Debug Key ---
document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();

    if (key === 'p' && !selectingPowerup && helpOverlay.style.display === 'none') {
        togglePause();
        return;
    }
    if (key === 'u') { /* Debug Toggle */
        toggleDebugMode();
        return;
    }

    if (gameOver || gamePaused || selectingPowerup) return;

    if ((key === 'shift' || key === ' ') && !player.isDashing && player.dashCharges > 0) {
        startDash();
    }
    if (key === 'e' && player.hasBomb && Date.now() > player.bombCooldownEnd) {
        throwBomb();
        updateBombCooldownUI(); // Trigger Bomb UI update
    }

    keys[key] = true;
    if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'w', 'a', 's', 'd', 'shift', ' ', 'b', 'p', 'u'].includes(key)) {
        e.preventDefault();
    } // Added 'p', 'u'
});
document.addEventListener('keyup', (e) => {
    keys[e.key.toLowerCase()] = false;
});
canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / (rect.width * (window.devicePixelRatio || 1));
    const scaleY = canvas.height / (rect.height * (window.devicePixelRatio || 1));
    cursorX = (e.clientX - rect.left) * scaleX;
    cursorY = (e.clientY - rect.top) * scaleY;
});
canvas.addEventListener('mouseenter', () => { mouseInCanvas = true; });
canvas.addEventListener('mouseleave', () => { mouseInCanvas = false; });

// --- Utility ---
const normalizeAngle = (angle) => ((angle % (2 * Math.PI)) + (3 * Math.PI)) % (2 * Math.PI) - Math.PI;
function isRectColliding(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y;
}
function isPointInRect(pointX, pointY, rect) {
    return pointX > rect.x && pointX < rect.x + rect.width &&
        pointY > rect.y && pointY < rect.y + rect.height;
}
function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end;
}

function showDamageIndicator() {
    clearTimeout(damageIndicatorTimeout);
    canvas.classList.add('player-damaged');
    damageIndicatorTimeout = setTimeout(() => {
        canvas.classList.remove('player-damaged');
    }, PLAYER_DAMAGE_INDICATOR_DURATION);
}

function spawnDamageNumber(x, y, text, color = 'white') {
    damageNumbers.push({
        x: x + (Math.random() - 0.5) * 10,
        y: y,
        text: text,
        color: color,
        alpha: 1.0,
        spawnTime: Date.now()
    });
}

function updateDamageNumbers() {
    const now = Date.now();
    damageNumbers = damageNumbers.filter(dn => {
        const age = now - dn.spawnTime;
        if (age >= DAMAGE_NUMBER_LIFETIME) return false;
        dn.y += DAMAGE_NUMBER_FLOAT_SPEED;
        dn.alpha = 1.0 - (age / DAMAGE_NUMBER_LIFETIME);
        return true;
    });
}

function calculateWaveScalingFactor() { // Helper for scaling
    return (1 + (wave - 1) * ENEMY_SCALING_FACTOR_PER_WAVE);
}


// --- Game Logic ---
function startDash() {
    player.dashCharges--;
    player.isDashing = true;
    player.dashDurationEnd = Date.now() + PLAYER_DASH_DURATION;
    // Only grant post-dash invincibility if player has the powerup
    if (player.unlockedPowerDash) {
        player.postDashInvincibilityEnd = Date.now() + PLAYER_DASH_DURATION + PLAYER_POST_DASH_INVINCIBILITY;
    }
    // Only start cooldown if this was the last charge, or if there's only one charge total
    if (player.dashCharges === player.maxDashCharges - 1 || player.maxDashCharges === 1) {
        player.dashCooldownEnd = Date.now() + PLAYER_DASH_COOLDOWN;
    }

    let dashAngle;
    // Dash in movement direction if moving, otherwise towards cursor
    if (player.dx !== 0 || player.dy !== 0) {
        dashAngle = Math.atan2(player.dy, player.dx);
    } else {
        dashAngle = Math.atan2(cursorY - (player.y + player.height / 2), cursorX - (player.x + player.width / 2));
    }
    player.dashAngle = dashAngle;
    try { if (soundsInitialized && dashSynth) dashSynth.triggerAttackRelease("4n", Tone.now()); } catch (e) { console.error("Dash sound error:", e); }
    updateDashCooldownUI();
}

function applyDamage(target, amount, sourceX, sourceY, isCrit = false) {
    const damageDealt = Math.round(amount);
    if (damageDealt <= 0) return; // No damage dealt

    target.health -= damageDealt;

    // Update ghost health for visual feedback
    target.ghostHealth = Math.max(0, target.displayHealth - target.health);
    target.ghostHealthTimer = Date.now();

    const dmgColor = target === player ? '#ff4d4d' : (isCrit ? '#ffd700' : '#ffffff');
    if (damageDealt >= 1) { // Only show damage numbers >= 1
        spawnDamageNumber(sourceX, sourceY, damageDealt.toString(), dmgColor);
    }

    if (target === player) {
        showDamageIndicator();
        const now = Date.now();
        if (now - player.lastHitSoundTime > PLAYER_HIT_SOUND_COOLDOWN) {
            try { if (soundsInitialized && playerHitSynth) playerHitSynth.triggerAttackRelease("C2", "0.1", Tone.now()); }
            catch (error) { console.error("Error playing player hit sound:", error); }
            player.lastHitSoundTime = now;
        }
        if (player.health <= 0) {
            endGame();
        }
    }
}


function updatePlayer() {
    const now = Date.now();
    let currentSpeed = PLAYER_SPEED;

    // Lerp display health towards actual health for smooth bar animation
    player.displayHealth = lerp(player.displayHealth, player.health, HEALTH_BAR_ANIMATION_SPEED);
    if (Math.abs(player.displayHealth - player.health) < 0.1) {
        player.displayHealth = player.health; // Snap to final value
    }

    // Regenerate dash charges
    if (player.dashCharges < player.maxDashCharges && now > player.dashCooldownEnd) {
        player.dashCharges++;
        // If more charges can be gained, reset cooldown for the next one
        if (player.dashCharges < player.maxDashCharges) {
            player.dashCooldownEnd = now + PLAYER_DASH_COOLDOWN;
        }
        updateDashCooldownUI();
    }

    if (player.isDashing) {
        // Add trail points
        if (now - lastTrailTime > DASH_TRAIL_INTERVAL) {
            player.trail.push({ x: player.x, y: player.y, time: now, size: PLAYER_SIZE });
            if (player.trail.length > DASH_TRAIL_LENGTH) player.trail.shift();
            lastTrailTime = now;
        }

        if (now > player.dashDurationEnd) {
            player.isDashing = false;
        } else {
            currentSpeed *= PLAYER_DASH_SPEED_MULT;
            const dashDx = Math.cos(player.dashAngle) * currentSpeed;
            const dashDy = Math.sin(player.dashAngle) * currentSpeed;
            player.x += dashDx;
            player.y += dashDy;

            // Apply dash damage if unlocked
            if (player.unlockedPowerDash) {
                enemies.forEach((enemy, index) => {
                    if (!enemies[index] || enemy.invulnerable) return; // Check if enemy exists and isn't temporarily invulnerable
                    if (isRectColliding(player, enemy)) {
                        applyDamage(enemy, PLAYER_DASH_DAMAGE, enemy.x + enemy.width / 2, enemy.y);
                        enemy.invulnerable = true; // Make enemy briefly invulnerable to avoid multi-hits from one dash
                        setTimeout(() => { if (enemy) enemy.invulnerable = false; }, 50); // Reset invulnerability after a short time

                        if (enemy.health <= 0) {
                            handleEnemyDeath(index);
                        }
                    }
                });
            }

            // Clamp player position to canvas bounds
            const canvasLogicalWidth = canvas.width / (window.devicePixelRatio || 1);
            const canvasLogicalHeight = canvas.height / (window.devicePixelRatio || 1);
            player.x = Math.max(0, Math.min(canvasLogicalWidth - player.width, player.x));
            player.y = Math.max(0, Math.min(canvasLogicalHeight - player.height, player.y));
            return; // Skip normal movement during dash
        }
    }

    // Normal Movement
    player.dx = 0;
    player.dy = 0;
    if (keys['w'] || keys['arrowup']) player.dy = -1;
    if (keys['s'] || keys['arrowdown']) player.dy = 1;
    if (keys['a'] || keys['arrowleft']) player.dx = -1;
    if (keys['d'] || keys['arrowright']) player.dx = 1;

    // Normalize diagonal movement
    const magnitude = Math.sqrt(player.dx * player.dx + player.dy * player.dy);
    if (magnitude > 0) {
        player.dx = (player.dx / magnitude) * currentSpeed;
        player.dy = (player.dy / magnitude) * currentSpeed;
    }

    player.x += player.dx;
    player.y += player.dy;

    // Clamp player position to canvas bounds
    const canvasLogicalWidth = canvas.width / (window.devicePixelRatio || 1);
    const canvasLogicalHeight = canvas.height / (window.devicePixelRatio || 1);
    player.x = Math.max(0, Math.min(canvasLogicalWidth - player.width, player.x));
    player.y = Math.max(0, Math.min(canvasLogicalHeight - player.height, player.y));
}

// ---> MODIFIED FUNCTION <---
function attemptAutoShoot() {
    if (!mouseInCanvas) return; // Don't shoot if mouse is outside canvas

    const now = Date.now();
    if (now - player.lastShotTime >= BULLET_COOLDOWN) {
        player.lastShotTime = now;

        try { if (soundsInitialized && shootSynth) shootSynth.triggerAttackRelease("C4", "8n"); }
        catch (error) { console.error("Error playing shoot sound:", error); }

        const baseAngle = Math.atan2(cursorY - (player.y + player.height / 2), cursorX - (player.x + player.width / 2));
        const numBullets = SHOTGUN_SPREAD_COUNT;
        const angleOffsetStart = numBullets > 1 ? -SHOTGUN_ANGLE * (numBullets - 1) / 2 : 0;

        for (let i = 0; i < numBullets; i++) {
            const angle = baseAngle + angleOffsetStart + i * SHOTGUN_ANGLE;
            bullets.push({
                x: player.x + player.width / 2 - BULLET_SIZE / 2,
                y: player.y + player.height / 2 - BULLET_SIZE / 2,
                width: BULLET_SIZE,
                height: BULLET_SIZE,
                dx: Math.cos(angle) * BULLET_SPEED,
                dy: Math.sin(angle) * BULLET_SPEED,
                damage: BULLET_DAMAGE,
                pierceLeft: BULLET_PIERCE_COUNT, // Use current pierce count
                bounceLeft: BULLET_BOUNCE_COUNT, // Use current bounce count
                hitEnemies: [] // <--- ADDED THIS LINE: Initialize list of hit enemies
            });
        }
    }
}
// ---> END MODIFIED FUNCTION <---

function updateBullets() {
    const canvasLogicalWidth = canvas.width / (window.devicePixelRatio || 1);
    const canvasLogicalHeight = canvas.height / (window.devicePixelRatio || 1);

    for (let i = bullets.length - 1; i >= 0; i--) {
        const bullet = bullets[i];
        if (!bullet) continue; // Skip if bullet was somehow removed already

        // Homing Logic
        if (BULLET_HOMING_STRENGTH > 0 && enemies.length > 0) {
            let nearestEnemy = null;
            let minDistSq = Infinity;

            enemies.forEach(enemy => {
                if (!enemy) return;
                const dx = enemy.x + enemy.width / 2 - bullet.x;
                const dy = enemy.y + enemy.height / 2 - bullet.y;
                const distSq = dx * dx + dy * dy;
                if (distSq < minDistSq) {
                    minDistSq = distSq;
                    nearestEnemy = enemy;
                }
            });

            if (nearestEnemy) {
                const angleToEnemy = Math.atan2(nearestEnemy.y + nearestEnemy.height / 2 - bullet.y, nearestEnemy.x + nearestEnemy.width / 2 - bullet.x);
                const currentAngle = Math.atan2(bullet.dy, bullet.dx);
                const angleDiff = normalizeAngle(angleToEnemy - currentAngle);
                const turnAmount = Math.sign(angleDiff) * Math.min(Math.abs(angleDiff), BULLET_HOMING_STRENGTH);
                const newAngle = normalizeAngle(currentAngle + turnAmount);
                const speed = Math.sqrt(bullet.dx * bullet.dx + bullet.dy * bullet.dy); // Maintain original speed
                bullet.dx = Math.cos(newAngle) * speed;
                bullet.dy = Math.sin(newAngle) * speed;
            }
        }


        const prevX = bullet.x;
        const prevY = bullet.y;
        bullet.x += bullet.dx;
        bullet.y += bullet.dy;

        let bounced = false;
        // Bounce Logic
        if (bullet.bounceLeft > 0) {
            if (bullet.x <= 0 || bullet.x + bullet.width >= canvasLogicalWidth) {
                bullet.dx *= -1;
                bullet.x = prevX; // Reset position slightly to avoid getting stuck
                bullet.bounceLeft--;
                bounced = true;
            }
            if (bullet.y <= 0 || bullet.y + bullet.height >= canvasLogicalHeight) {
                bullet.dy *= -1;
                bullet.y = prevY; // Reset position slightly
                if (!bounced) bullet.bounceLeft--; // Only decrement bounce once per frame
                bounced = true;
            }
        }

        // Remove bullet if out of bounds (and didn't just bounce)
        if (!bounced && (bullet.x < 0 || bullet.x > canvasLogicalWidth || bullet.y < 0 || bullet.y > canvasLogicalHeight)) {
            bullets.splice(i, 1);
        }
    }
}

// --- Bomb Logic ---
function throwBomb() {
    if (!player.hasBomb || Date.now() < player.bombCooldownEnd) return;
    console.log("Throwing bomb!");
    player.bombCooldownEnd = Date.now() + BOMB_COOLDOWN;

    try { if (soundsInitialized && bombSynth) bombSynth.triggerAttackRelease("G4", "8n", Tone.now()); }
    catch (e) { console.error("Bomb throw sound error:", e); }

    const startX = player.x + player.width / 2;
    const startY = player.y + player.height / 2;
    const angle = Math.atan2(cursorY - startY, cursorX - startX); // ** Angle to target **

    bombs.push({
        startX: startX,
        startY: startY,
        targetX: cursorX,
        targetY: cursorY,
        x: startX,
        y: startY,
        dx: Math.cos(angle) * BOMB_SPEED, // ** Use constant speed vector **
        dy: Math.sin(angle) * BOMB_SPEED, // ** Use constant speed vector **
        width: BOMB_SIZE,
        height: BOMB_SIZE,
        startTime: Date.now()
    });
}

function updateBombs() {
    // const now = Date.now(); // Not needed for constant speed
    for (let i = bombs.length - 1; i >= 0; i--) {
        const bomb = bombs[i];

        // ** Move bomb at constant speed **
        bomb.x += bomb.dx;
        bomb.y += bomb.dy;

        // Check if bomb reached vicinity of target (simple distance check)
        const distToTargetSq = (bomb.x - bomb.targetX) ** 2 + (bomb.y - bomb.targetY) ** 2;
        const speedSq = BOMB_SPEED ** 2; // Use speed squared for comparison

        // Check if moving away from target (overshot)
        const movingAway = (bomb.dx * (bomb.targetX - bomb.x) + bomb.dy * (bomb.targetY - bomb.y)) < 0;

        // Check if bomb is out of bounds
        const outOfBounds = bomb.x < -BOMB_SIZE || bomb.x > canvas.width + BOMB_SIZE || bomb.y < -BOMB_SIZE || bomb.y > canvas.height + BOMB_SIZE;

        // Explode if any of the conditions are met
        if (distToTargetSq <= speedSq || movingAway || outOfBounds) {
            createExplosion(bomb.x, bomb.y); // Explode at current position
            bombs.splice(i, 1);
        }
    }
}


function createExplosion(x, y) {
    console.log("BOOM!");
    try { if (soundsInitialized && explosionSynth) explosionSynth.triggerAttackRelease("0.5n", Tone.now()); }
    catch (e) { console.error("Explosion sound error:", e); }

    explosions.push({
        x: x,
        y: y,
        startTime: Date.now(),
        maxRadius: BOMB_RADIUS,
        hitEnemies: [] // Keep track of enemies already hit by this explosion
    });
}

function updateExplosions() {
    const now = Date.now();
    for (let i = explosions.length - 1; i >= 0; i--) {
        const exp = explosions[i];
        const elapsed = now - exp.startTime;

        if (elapsed >= BOMB_EXPLOSION_DURATION) {
            explosions.splice(i, 1);
            continue;
        }

        const currentRadius = lerp(0, exp.maxRadius, elapsed / BOMB_EXPLOSION_DURATION); // Still lerp radius for visual effect

        // Check collision with enemies
        enemies.forEach((enemy, index) => {
            if (!enemy || exp.hitEnemies.includes(index)) return; // Skip if no enemy or already hit

            const dx = enemy.x + enemy.width / 2 - exp.x;
            const dy = enemy.y + enemy.height / 2 - exp.y;
            const distSq = dx * dx + dy * dy;
            const enemyRadius = enemy.width / 2; // Approximate enemy radius

            if (distSq < (currentRadius + enemyRadius) * (currentRadius + enemyRadius)) {
                applyDamage(enemy, BOMB_DAMAGE, enemy.x + enemy.width / 2, enemy.y);
                exp.hitEnemies.push(index); // Mark enemy as hit

                if (enemy.health <= 0) {
                    handleEnemyDeath(index);
                }
            }
        });
    }
}
// --- End Bomb Logic ---


// --- Enemy Logic with Scaling ---
function spawnEnemy() {
    const canvasLogicalWidth = canvas.width / (window.devicePixelRatio || 1);
    const canvasLogicalHeight = canvas.height / (window.devicePixelRatio || 1);
    const now = Date.now();

    if (enemiesSpawnedThisWave < enemiesToSpawn && now - lastEnemySpawnTime > currentEnemySpawnRate) {
        lastEnemySpawnTime = now;
        enemiesSpawnedThisWave++;

        // Determine spawn position (outside screen edges)
        let spawnX, spawnY;
        const edge = Math.floor(Math.random() * 4);
        switch (edge) {
            case 0: // Top
                spawnX = Math.random() * canvasLogicalWidth;
                spawnY = -ENEMY_HOMING_CHARGER_SIZE; // Use largest potential size for buffer
                break;
            case 1: // Right
                spawnX = canvasLogicalWidth + ENEMY_HOMING_CHARGER_SIZE;
                spawnY = Math.random() * canvasLogicalHeight;
                break;
            case 2: // Bottom
                spawnX = Math.random() * canvasLogicalWidth;
                spawnY = canvasLogicalHeight + ENEMY_HOMING_CHARGER_SIZE;
                break;
            case 3: // Left
                spawnX = -ENEMY_HOMING_CHARGER_SIZE;
                spawnY = Math.random() * canvasLogicalHeight;
                break;
        }

        // Determine enemy type based on wave
        let availableTypes = [];
        if (wave < BASIC_ENEMY_WAVE_CUTOFF) availableTypes.push('basic');
        if (wave >= 1) availableTypes.push('shooter');
        if (wave >= 2) availableTypes.push('charger');
        if (wave >= 3) availableTypes.push('shielded');
        if (wave >= 4) availableTypes.push('shooter_burst');
        if (wave >= 5) availableTypes.push('homing_charger');
        if (wave >= 6) availableTypes.push('shooter_sniper');
        if (wave >= 7) availableTypes.push('shooter_spread');

        // Ensure some enemies always spawn if pool is empty later
        if (availableTypes.length === 0) {
            availableTypes.push('shooter', 'charger', 'homing_charger');
            console.warn("No enemy types available based on wave, using fallback.");
        }

        const type = availableTypes[Math.floor(Math.random() * availableTypes.length)];

        // Get scaling factor and base stats
        const scalingFactor = calculateWaveScalingFactor();
        let enemyConfig = {};
        let baseHealth, baseDamage, collisionDamage;

        switch (type) {
            case 'charger':
                baseHealth = ENEMY_CHARGER_HEALTH_BASE;
                collisionDamage = ENEMY_CHARGER_DAMAGE_BASE;
                enemyConfig = { size: ENEMY_CHARGER_SIZE, speed: ENEMY_CHARGER_SPEED, state: 'idle', chargeCooldownEnd: 0, windupEnd: 0 };
                break;
            case 'homing_charger':
                baseHealth = ENEMY_HOMING_CHARGER_HEALTH_BASE;
                collisionDamage = ENEMY_HOMING_CHARGER_DAMAGE_BASE;
                enemyConfig = { size: ENEMY_HOMING_CHARGER_SIZE, speed: ENEMY_HOMING_CHARGER_SPEED, state: 'idle', chargeCooldownEnd: 0, windupEnd: 0, chargeAngle: 0 };
                break;
            case 'shooter':
                baseHealth = ENEMY_SHOOTER_HEALTH_BASE;
                baseDamage = ENEMY_BULLET_DAMAGE_BASE;
                collisionDamage = ENEMY_BASIC_DAMAGE_BASE; // Shooters might still bump
                enemyConfig = { size: ENEMY_SHOOTER_SIZE, speed: ENEMY_SHOOTER_SPEED, lastShotTime: 0 };
                break;
            case 'shooter_burst':
                baseHealth = ENEMY_SHOOTER_BURST_HEALTH_BASE;
                baseDamage = ENEMY_BULLET_DAMAGE_BASE;
                collisionDamage = ENEMY_BASIC_DAMAGE_BASE;
                enemyConfig = { size: ENEMY_SHOOTER_BURST_SIZE, speed: ENEMY_SHOOTER_BURST_SPEED, lastShotTime: 0, state: 'idle', burstCount: 0, lastBurstShotTime: 0 };
                break;
            case 'shooter_spread':
                baseHealth = ENEMY_SHOOTER_SPREAD_HEALTH_BASE;
                baseDamage = ENEMY_BULLET_DAMAGE_BASE;
                collisionDamage = ENEMY_BASIC_DAMAGE_BASE;
                enemyConfig = { size: ENEMY_SHOOTER_SPREAD_SIZE, speed: ENEMY_SHOOTER_SPREAD_SPEED, lastShotTime: 0 };
                break;
            case 'shooter_sniper':
                baseHealth = ENEMY_SHOOTER_SNIPER_HEALTH_BASE;
                baseDamage = ENEMY_LASER_DAMAGE_BASE; // Sniper uses laser damage
                collisionDamage = ENEMY_BASIC_DAMAGE_BASE;
                enemyConfig = { size: ENEMY_SHOOTER_SNIPER_SIZE, speed: ENEMY_SHOOTER_SNIPER_SPEED, lastShotTime: 0, state: 'idle', targetEndTime: 0, laserTargetAngle: 0 };
                break;
            case 'shielded':
                baseHealth = ENEMY_SHIELD_HEALTH_BASE;
                collisionDamage = ENEMY_SHIELD_DAMAGE_BASE; /* Use updated base */
                const angleToCenter = Math.atan2(canvasLogicalHeight / 2 - spawnY, canvasLogicalWidth / 2 - spawnX); // Face center initially
                enemyConfig = { size: ENEMY_SHIELD_SIZE, speed: ENEMY_SHIELD_SPEED, facingAngle: angleToCenter };
                break;
            default: // 'basic'
                baseHealth = ENEMY_BASIC_HEALTH_BASE;
                collisionDamage = ENEMY_BASIC_DAMAGE_BASE;
                enemyConfig = { size: ENEMY_BASIC_SIZE, speed: ENEMY_BASIC_SPEED };
                break;
        }

        // Apply Scaling
        const scaledHealth = Math.round(baseHealth * scalingFactor);
        const scaledDamage = baseDamage ? Math.round(baseDamage * scalingFactor) : undefined; // Scale bullet/laser damage if applicable
        const scaledCollisionDamage = Math.round(collisionDamage * scalingFactor);

        enemies.push({
            x: spawnX, y: spawnY,
            width: enemyConfig.size, height: enemyConfig.size,
            health: scaledHealth, maxHealth: scaledHealth, // Use scaled health for max too
            displayHealth: scaledHealth, ghostHealth: 0, ghostHealthTimer: 0, // For health bar visuals
            speed: enemyConfig.speed,
            type: type,
            damage: scaledDamage, // Store scaled projectile damage
            collisionDamage: scaledCollisionDamage, // Store scaled collision damage
            ...enemyConfig // Spread remaining type-specific config
        });
    }
}


function updateEnemies() {
    const canvasLogicalWidth = canvas.width / (window.devicePixelRatio || 1);
    const canvasLogicalHeight = canvas.height / (window.devicePixelRatio || 1);
    const now = Date.now();

    enemies.forEach(enemy => {
        if (!enemy) return;

        // Smooth health bar update
        enemy.displayHealth = lerp(enemy.displayHealth, enemy.health, HEALTH_BAR_ANIMATION_SPEED);
        if (Math.abs(enemy.displayHealth - enemy.health) < 0.1) {
            enemy.displayHealth = enemy.health;
        }

        const dxPlayer = player.x + player.width / 2 - (enemy.x + enemy.width / 2);
        const dyPlayer = player.y + player.height / 2 - (enemy.y + enemy.height / 2);
        const distPlayer = Math.sqrt(dxPlayer * dxPlayer + dyPlayer * dyPlayer);
        const angleToPlayer = Math.atan2(dyPlayer, dxPlayer);

        let currentSpeed = enemy.speed;
        let moveX = 0;
        let moveY = 0;

        // --- Enemy Type Specific Logic ---
        switch (enemy.type) {
            case 'basic':
                moveX = Math.cos(angleToPlayer) * currentSpeed;
                moveY = Math.sin(angleToPlayer) * currentSpeed;
                break;

            case 'charger':
                if (enemy.state === 'idle' && now > enemy.chargeCooldownEnd) {
                    enemy.state = 'windup';
                    enemy.windupEnd = now + ENEMY_CHARGER_WINDUP;
                    enemy.chargeAngle = angleToPlayer; // Lock angle at windup start
                } else if (enemy.state === 'windup' && now > enemy.windupEnd) {
                    enemy.state = 'charging';
                    // Charge duration could be added here if needed
                }

                if (enemy.state === 'charging') {
                    currentSpeed = ENEMY_CHARGER_CHARGE_SPEED;
                    moveX = Math.cos(enemy.chargeAngle) * currentSpeed;
                    moveY = Math.sin(enemy.chargeAngle) * currentSpeed;
                    // Simple duration limit for charge
                    if (now > enemy.windupEnd + 1000) { // Charge for 1 second
                        enemy.state = 'cooldown';
                        enemy.chargeCooldownEnd = now + ENEMY_CHARGER_COOLDOWN;
                    }
                } else if (enemy.state !== 'windup') { // Move normally if idle or cooling down
                    moveX = Math.cos(angleToPlayer) * currentSpeed;
                    moveY = Math.sin(angleToPlayer) * currentSpeed;
                }
                // No movement during windup
                break;

            case 'homing_charger':
                if (enemy.state === 'idle' && now > enemy.chargeCooldownEnd) {
                    enemy.state = 'windup';
                    enemy.windupEnd = now + ENEMY_HOMING_CHARGER_WINDUP;
                    enemy.chargeAngle = angleToPlayer; // Initial angle
                } else if (enemy.state === 'windup' && now > enemy.windupEnd) {
                    enemy.state = 'charging';
                }

                if (enemy.state === 'charging') {
                    currentSpeed = ENEMY_HOMING_CHARGER_CHARGE_SPEED;
                    const targetAngle = angleToPlayer; // Target player continuously
                    const angleDiff = normalizeAngle(targetAngle - enemy.chargeAngle);
                    // Apply turn rate
                    enemy.chargeAngle = normalizeAngle(enemy.chargeAngle + Math.sign(angleDiff) * Math.min(Math.abs(angleDiff), HOMING_TURN_RATE));
                    moveX = Math.cos(enemy.chargeAngle) * currentSpeed;
                    moveY = Math.sin(enemy.chargeAngle) * currentSpeed;

                    // Charge duration limit
                    if (now > enemy.windupEnd + 1500) { // Slightly longer charge for homing
                        enemy.state = 'cooldown';
                        enemy.chargeCooldownEnd = now + ENEMY_HOMING_CHARGER_COOLDOWN;
                    }
                } else if (enemy.state !== 'windup') { // Normal movement when not winding up/charging
                    moveX = Math.cos(angleToPlayer) * currentSpeed;
                    moveY = Math.sin(angleToPlayer) * currentSpeed;
                }
                break;

            case 'shooter':
                // Try to maintain range
                if (distPlayer > ENEMY_SHOOTER_RANGE + 20) { // Move closer if too far
                    moveX = Math.cos(angleToPlayer) * currentSpeed;
                    moveY = Math.sin(angleToPlayer) * currentSpeed;
                } else if (distPlayer < ENEMY_SHOOTER_RANGE - 20) { // Move away if too close
                    moveX = -Math.cos(angleToPlayer) * currentSpeed;
                    moveY = -Math.sin(angleToPlayer) * currentSpeed;
                }
                // Shoot if cooldown ready and player is somewhat in range
                if (now > enemy.lastShotTime + ENEMY_SHOOTER_COOLDOWN && distPlayer < ENEMY_SHOOTER_RANGE * 1.5) {
                    fireEnemyBullet(enemy, angleToPlayer);
                    enemy.lastShotTime = now;
                }
                break;

            case 'shooter_burst':
                if (enemy.state === 'idle') {
                    // Maintain range like regular shooter
                    if (distPlayer > ENEMY_SHOOTER_BURST_RANGE + 20) {
                        moveX = Math.cos(angleToPlayer) * currentSpeed;
                        moveY = Math.sin(angleToPlayer) * currentSpeed;
                    } else if (distPlayer < ENEMY_SHOOTER_BURST_RANGE - 20) {
                        moveX = -Math.cos(angleToPlayer) * currentSpeed;
                        moveY = -Math.sin(angleToPlayer) * currentSpeed;
                    }
                    // Start burst if ready and in range
                    if (now > enemy.lastShotTime + ENEMY_SHOOTER_BURST_COOLDOWN && distPlayer < ENEMY_SHOOTER_BURST_RANGE * 1.5) {
                        enemy.state = 'firing_burst';
                        enemy.burstCount = 0;
                        enemy.lastBurstShotTime = now; // Time of first shot attempt
                        enemy.burstAngle = angleToPlayer; // Lock angle for the burst
                    }
                } else if (enemy.state === 'firing_burst') {
                    // Fire subsequent shots in the burst
                    if (enemy.burstCount < ENEMY_SHOOTER_BURST_COUNT && now > enemy.lastBurstShotTime + ENEMY_SHOOTER_BURST_DELAY) {
                        fireEnemyBullet(enemy, enemy.burstAngle); // Use locked angle
                        enemy.lastBurstShotTime = now;
                        enemy.burstCount++;
                    }
                    // End burst after all shots fired
                    if (enemy.burstCount >= ENEMY_SHOOTER_BURST_COUNT) {
                        enemy.state = 'idle';
                        enemy.lastShotTime = now; // Start main cooldown after burst finishes
                    }
                }
                break;

            case 'shooter_spread':
                // Maintain range
                if (distPlayer > ENEMY_SHOOTER_SPREAD_RANGE + 20) {
                    moveX = Math.cos(angleToPlayer) * currentSpeed;
                    moveY = Math.sin(angleToPlayer) * currentSpeed;
                } else if (distPlayer < ENEMY_SHOOTER_SPREAD_RANGE - 20) {
                    moveX = -Math.cos(angleToPlayer) * currentSpeed;
                    moveY = -Math.sin(angleToPlayer) * currentSpeed;
                }
                // Fire spread shot if ready and in range
                if (now > enemy.lastShotTime + ENEMY_SHOOTER_SPREAD_COOLDOWN && distPlayer < ENEMY_SHOOTER_SPREAD_RANGE * 1.5) {
                    fireEnemySpreadShot(enemy, angleToPlayer);
                    enemy.lastShotTime = now;
                }
                break;

            case 'shooter_sniper':
                if (enemy.state === 'idle') {
                    // Try to stay far away, move slowly if needed
                    if (distPlayer < ENEMY_SHOOTER_SNIPER_RANGE - 50) {
                        moveX = -Math.cos(angleToPlayer) * currentSpeed; // Move away
                        moveY = -Math.sin(angleToPlayer) * currentSpeed;
                    } else if (distPlayer > ENEMY_SHOOTER_SNIPER_RANGE + 50) {
                        moveX = Math.cos(angleToPlayer) * currentSpeed * 0.5; // Move closer slowly
                        moveY = Math.sin(angleToPlayer) * currentSpeed * 0.5;
                    }
                    // Start targeting if cooldown ready
                    if (now > enemy.lastShotTime + ENEMY_SHOOTER_SNIPER_COOLDOWN) {
                        enemy.state = 'targeting';
                        enemy.targetEndTime = now + ENEMY_SHOOTER_SNIPER_TARGET_TIME;
                    }
                } else if (enemy.state === 'targeting') {
                    // Keep updating laser angle while targeting
                    enemy.laserTargetAngle = angleToPlayer;
                    // Transition to firing state shortly before target time ends
                    if (now > enemy.targetEndTime - ENEMY_SHOOTER_SNIPER_FIRE_DELAY) {
                        enemy.state = 'firing';
                        enemy.fireEndTime = now + ENEMY_SHOOTER_SNIPER_FIRE_DELAY; // Laser stays for this duration
                    }
                } else if (enemy.state === 'firing') {
                    // Fire the laser once the firing delay is over
                    if (now >= enemy.fireEndTime) {
                        fireEnemyLaser(enemy, enemy.laserTargetAngle); // Fire using the angle locked at end of targeting
                        enemy.state = 'idle';
                        enemy.lastShotTime = now; // Start cooldown after firing
                    }
                }
                break;

            case 'shielded':
                // Rotate shield to face player
                const targetAngle = angleToPlayer;
                const angleDiff = normalizeAngle(targetAngle - enemy.facingAngle);
                const maxRotation = SHIELD_ROTATION_PER_FRAME;
                // Turn smoothly towards player
                if (Math.abs(angleDiff) <= maxRotation) {
                    enemy.facingAngle = targetAngle;
                } else {
                    enemy.facingAngle = normalizeAngle(enemy.facingAngle + Math.sign(angleDiff) * maxRotation);
                }
                // Move towards player
                moveX = Math.cos(angleToPlayer) * currentSpeed;
                moveY = Math.sin(angleToPlayer) * currentSpeed;
                break;
        }

        // Apply movement
        enemy.x += moveX;
        enemy.y += moveY;

        // Basic boundary check (prevent completely leaving playable area)
        enemy.x = Math.max(-enemy.width * 2, Math.min(canvasLogicalWidth + enemy.width * 2, enemy.x));
        enemy.y = Math.max(-enemy.height * 2, Math.min(canvasLogicalHeight + enemy.height * 2, enemy.y));
    });
}


function fireEnemyBullet(enemy, angle) { /* Use scaled damage */
    try { if (soundsInitialized && enemyShootSynth) enemyShootSynth.triggerAttackRelease("G2", "16n", Tone.now()); }
    catch (error) { console.error("Error playing enemy shoot sound:", error); }
    enemyBullets.push({
        x: enemy.x + enemy.width / 2 - ENEMY_BULLET_SIZE / 2,
        y: enemy.y + enemy.height / 2 - ENEMY_BULLET_SIZE / 2,
        width: ENEMY_BULLET_SIZE, height: ENEMY_BULLET_SIZE,
        dx: Math.cos(angle) * ENEMY_BULLET_SPEED,
        dy: Math.sin(angle) * ENEMY_BULLET_SPEED,
        damage: enemy.damage || ENEMY_BULLET_DAMAGE_BASE /* Use stored scaled damage, fallback to base */
    });
}

function fireEnemySpreadShot(enemy, baseAngle) { /* Use scaled damage */
    try { if (soundsInitialized && enemyShootSynth) enemyShootSynth.triggerAttackRelease("A2", "8n", Tone.now()); }
    catch (error) { console.error("Error playing enemy shoot sound:", error); }
    const numBullets = ENEMY_SHOOTER_SPREAD_COUNT;
    const angleOffsetStart = -ENEMY_SHOOTER_SPREAD_ANGLE * (numBullets - 1) / 2;
    for (let i = 0; i < numBullets; i++) {
        const angle = baseAngle + angleOffsetStart + i * ENEMY_SHOOTER_SPREAD_ANGLE;
        enemyBullets.push({
            x: enemy.x + enemy.width / 2 - ENEMY_BULLET_SIZE / 2,
            y: enemy.y + enemy.height / 2 - ENEMY_BULLET_SIZE / 2,
            width: ENEMY_BULLET_SIZE, height: ENEMY_BULLET_SIZE,
            dx: Math.cos(angle) * ENEMY_BULLET_SPEED,
            dy: Math.sin(angle) * ENEMY_BULLET_SPEED,
            damage: enemy.damage || ENEMY_BULLET_DAMAGE_BASE /* Use stored scaled damage */
        });
    }
}

function fireEnemyLaser(enemy, angle) { /* Use scaled damage */
    const canvasLogicalWidth = canvas.width / (window.devicePixelRatio || 1);
    const canvasLogicalHeight = canvas.height / (window.devicePixelRatio || 1);
    try { if (soundsInitialized && laserSynth) laserSynth.triggerAttackRelease("C5", "4n", Tone.now()); }
    catch (error) { console.error("Error playing laser sound:", error); }

    const laserEndX = enemy.x + enemy.width / 2 + Math.cos(angle) * canvasLogicalWidth * 1.5; // Extend laser well beyond screen
    const laserEndY = enemy.y + enemy.height / 2 + Math.sin(angle) * canvasLogicalHeight * 1.5;
    activeLasers.push({
        x1: enemy.x + enemy.width / 2, y1: enemy.y + enemy.height / 2,
        x2: laserEndX, y2: laserEndY,
        angle: angle,
        endTime: Date.now() + ENEMY_LASER_DURATION
    });

    // Check for player hit immediately (line-rect intersection approx)
    // Ignore if player is invincible (dashing with damage)
    if (!(player.isDashing && player.unlockedPowerDash)) {
        const playerRect = { x: player.x, y: player.y, width: player.width, height: player.height };
        // Check intersection points along the laser line segment
        const distToPlayer = Math.sqrt(Math.pow(player.x + player.width / 2 - enemy.x - enemy.width / 2, 2) + Math.pow(player.y + player.height / 2 - enemy.y - enemy.height / 2, 2));
        const step = 5; // Check every 5 pixels along the line
        for (let d = 0; d < distToPlayer + player.width; d += step) { // Check slightly beyond player center distance
            const checkX = enemy.x + enemy.width / 2 + Math.cos(angle) * d;
            const checkY = enemy.y + enemy.height / 2 + Math.sin(angle) * d;
            if (isPointInRect(checkX, checkY, playerRect)) {
                console.log("Player hit by laser!");
                applyDamage(player, enemy.damage || ENEMY_LASER_DAMAGE_BASE /* Use stored scaled damage */, player.x + player.width / 2, player.y);
                break; // Hit detected, no need to check further along the line
            }
        }
    }
}


function updateActiveLasers() {
    const now = Date.now();
    activeLasers = activeLasers.filter(laser => now < laser.endTime);
}


function updateEnemyBullets() {
    const canvasLogicalWidth = canvas.width / (window.devicePixelRatio || 1);
    const canvasLogicalHeight = canvas.height / (window.devicePixelRatio || 1);
    for (let i = enemyBullets.length - 1; i >= 0; i--) {
        const bullet = enemyBullets[i];
        if (!bullet) continue;

        bullet.x += bullet.dx;
        bullet.y += bullet.dy;

        // Remove if far off-screen
        if (bullet.x < -ENEMY_BULLET_SIZE * 2 || bullet.x > canvasLogicalWidth + ENEMY_BULLET_SIZE * 2 ||
            bullet.y < -ENEMY_BULLET_SIZE * 2 || bullet.y > canvasLogicalHeight + ENEMY_BULLET_SIZE * 2) {
            enemyBullets.splice(i, 1);
        }
    }
}

// ---> MODIFIED FUNCTION <---
function checkCollisions() {
    const now = Date.now(); // Get current time for cooldown checks

    // --- Player Bullet vs Enemy Collisions ---
    for (let i = bullets.length - 1; i >= 0; i--) {
        if (!bullets[i]) continue; // Skip if bullet already removed this frame
        const bullet = bullets[i];
        let bulletRemoved = false; // Flag to track if this bullet is gone

        for (let j = enemies.length - 1; j >= 0; j--) {
            if (!enemies[j]) continue; // Skip if enemy removed
            const enemy = enemies[j];

            if (isRectColliding(bullet, enemy)) {

                // ---> START MODIFICATION <---
                // Check if this bullet has already hit this enemy
                if (bullet.hitEnemies.includes(j)) { // Assuming 'j' (index) is a stable identifier for the enemy during this frame check
                    continue; // Skip this enemy, already hit by this bullet
                }
                // ---> END MODIFICATION <---


                let damageDealt = bullet.damage;
                let blockedByShield = false;

                // --- Shield Check ---
                if (enemy.type === 'shielded') {
                    const angleBulletHit = Math.atan2(
                        bullet.y + bullet.height / 2 - (enemy.y + enemy.height / 2),
                        bullet.x + bullet.width / 2 - (enemy.x + enemy.width / 2)
                    );
                    const angleDifference = Math.abs(normalizeAngle(angleBulletHit - enemy.facingAngle));

                    // Check if hit angle is within the shield's protected arc
                    if (angleDifference < SHIELD_ANGLE_WIDTH / 2) {
                        blockedByShield = true;
                        try { if (soundsInitialized && shieldBlockSynth) shieldBlockSynth.triggerAttackRelease(undefined, "8n", Tone.now()); }
                        catch (error) { console.error("Error playing shield block sound:", error); }
                        // ** Bullet is destroyed by shield, remove it **
                        bullets.splice(i, 1);
                        bulletRemoved = true;
                        break; // Stop checking this bullet against other enemies
                    }
                }

                // --- Apply Damage (if not blocked) ---
                if (!blockedByShield) {

                    // ---> START MODIFICATION <---
                    // Record the hit *before* pierce logic
                    bullet.hitEnemies.push(j);
                    // ---> END MODIFICATION <---

                    applyDamage(enemy, damageDealt, enemy.x + enemy.width / 2, enemy.y);
                    try { if (soundsInitialized && hitSynth) hitSynth.triggerAttackRelease("C3", "16n", Tone.now()); }
                    catch (error) { console.error("Error playing hit sound:", error); }

                    // --- Pierce Logic ---
                    if (bullet.pierceLeft > 0) {
                        bullet.pierceLeft--; // Decrement pierce count AFTER hitting
                    } else {
                        // ** No pierce left, remove bullet **
                        bullets.splice(i, 1);
                        bulletRemoved = true;
                    }
                }

                // --- Enemy Death Check ---
                if (enemy.health <= 0) {
                    handleEnemyDeath(j);
                }

                if (bulletRemoved) break; // Stop checking this (now removed) bullet
            } // End if isRectColliding
        } // End enemy loop
    } // End bullet loop


    // --- Enemy Bullet vs Player Collisions ---
    for (let i = enemyBullets.length - 1; i >= 0; i--) {
        if (!enemyBullets[i]) continue;
        const enemyBullet = enemyBullets[i];
        if (isRectColliding(player, enemyBullet)) {
            // Check for player invincibility (dash damage active or post-dash invincibility)
            if (!(player.isDashing && player.unlockedPowerDash) && now > player.postDashInvincibilityEnd) {
                console.log("Player hit by enemy bullet");
                applyDamage(player, enemyBullet.damage, player.x + player.width / 2, player.y);
            }
            enemyBullets.splice(i, 1); // Remove bullet on hit
            break; // Player can only be hit by one enemy bullet per frame check
        }
    }

    // --- Enemy vs Player Collision ---
    enemies.forEach((enemy) => {
        if (!enemy) return;
        if (isRectColliding(player, enemy)) {
            // Ignore collision if player is invincible (dashing or post-dash)
            if (!(player.isDashing && player.unlockedPowerDash) && now > player.postDashInvincibilityEnd) {
                // --- Collision Damage Invincibility Frames ---
                if (now - player.lastCollisionTime > PLAYER_COLLISION_IFRAME_DURATION) {
                    let collisionDamage = enemy.collisionDamage; // Use stored scaled collision damage

                    // Chargers deal more damage while actively charging
                    if ((enemy.type === 'charger' || enemy.type === 'homing_charger') && enemy.state === 'charging') {
                        // Ensure charging damage also scales, use max of base scaled or specific charging scaled
                        const baseChargingScaled = Math.round(ENEMY_CHARGER_DAMAGE_BASE * calculateWaveScalingFactor());
                        collisionDamage = Math.max(collisionDamage, baseChargingScaled);
                    }

                    applyDamage(player, collisionDamage, player.x + player.width / 2, player.y);
                    player.lastCollisionTime = now; // Update last collision time

                    // Stop charger's charge on collision
                    if ((enemy.type === 'charger' || enemy.type === 'homing_charger') && enemy.state === 'charging') {
                        const cooldown = enemy.type === 'charger' ? ENEMY_CHARGER_COOLDOWN : ENEMY_HOMING_CHARGER_COOLDOWN;
                        enemy.state = 'cooldown';
                        enemy.chargeCooldownEnd = Date.now() + cooldown;
                    }
                }
                // --- End Invincibility Check ---
            }
        }
    });


    // --- Player Aura Damage ---
    if (player.hasDamageAura && now - lastAuraDamageTime > PLAYER_AURA_TICK_RATE) {
        lastAuraDamageTime = now; // Reset timer for next tick
        enemies.forEach((enemy, index) => {
            if (!enemies[index]) return; // Skip if enemy removed

            const dx = player.x + player.width / 2 - (enemy.x + enemy.width / 2);
            const dy = player.y + player.height / 2 - (enemy.y + enemy.height / 2);
            const distSq = dx * dx + dy * dy;

            // Check if enemy center is within aura radius
            if (distSq < player.auraRadius * player.auraRadius) {
                // Apply damage based on player's current auraDamage
                applyDamage(enemy, player.auraDamage, enemy.x + enemy.width / 2, enemy.y - 10); // Damage number appears slightly above enemy

                // Check enemy death immediately after applying aura damage
                if (enemy.health <= 0) {
                    handleEnemyDeath(index);
                }
            }
        });
    }
}
// ---> END MODIFIED FUNCTION <---


// --- Powerup Selection (Reroll, Debug Mode) ---
function initiatePowerupSelection() {
    selectingPowerup = true;
    gamePaused = true;
    // Clear volatile game objects
    bullets = []; enemyBullets = []; activeLasers = []; damageNumbers = []; bombs = []; explosions = [];

    powerupOptionsDiv.innerHTML = ''; // Clear previous options

    // Clear previous reroll/continue buttons if they exist
    const oldRerollButton = document.getElementById('reroll-button');
    if (oldRerollButton) oldRerollButton.remove();
    const oldDebugContinueButton = document.getElementById('debug-continue-button');
    if (oldDebugContinueButton) oldDebugContinueButton.remove();


    if (DEBUG_MODE) {
        powerupSelectionDiv.querySelector('.powerup-title').textContent = "Debug: Choose Boons";
        // Show all powerups
        powerups.forEach(p => {
            // Skip commented out powerups by checking if apply function exists (simple check)
            if (typeof p.apply !== 'function') return;

            const button = document.createElement('button');
            const currentLevel = player.powerupLevels[p.id] || 0;
            let nameDisplay = p.name;
            let canAdd = true;

            // Display level and check limits/prerequisites
            if (p.type === 'stackable') {
                nameDisplay += ` (Lvl ${currentLevel})`;
                if (currentLevel >= p.maxLevel) {
                    nameDisplay += ` (MAX)`;
                    canAdd = false;
                } else {
                    nameDisplay += ` -> Lvl ${currentLevel + 1}`;
                }
            } else if (p.type === 'unique') {
                if (player.activePowerups.includes(p.id)) {
                    nameDisplay += ` (Acquired)`;
                    canAdd = false;
                }
            }
            if (p.prerequisite && !player.activePowerups.includes(p.prerequisite)) {
                nameDisplay += ` (Req: ${powerups.find(req => req.id === p.prerequisite)?.name || p.prerequisite})`;
                canAdd = false;
            }

            button.innerHTML = `
                        <span class="powerup-icon">${p.icon}</span>
                        <div>
                            ${nameDisplay} <br>
                            <span class="powerup-description">${p.description}</span>
                        </div>`;
            button.onclick = () => applyDebugPowerup(p.id); // Use specific debug apply function
            if (!canAdd) {
                button.disabled = true;
                button.style.opacity = '0.6';
                button.style.cursor = 'not-allowed';
            }
            powerupOptionsDiv.appendChild(button);
        });

        // Add "Continue" button for debug mode
        const continueButton = document.createElement('button');
        continueButton.id = 'debug-continue-button';
        continueButton.textContent = 'Start Next Wave';
        continueButton.onclick = () => selectPowerup(null); // Call selectPowerup with null to proceed
        powerupSelectionDiv.appendChild(continueButton); // Append after options div

    } else { // Normal Mode
        powerupSelectionDiv.querySelector('.powerup-title').textContent = "Choose Your Boon!";

        // Filter available powerups
        const isPlayerMaxHealth = player.health >= player.maxHealth;
        let availablePowerups = powerups.filter(p => {
            // Basic check for commented out (if apply doesn't exist)
            if (typeof p.apply !== 'function') return false;

            if (p.prerequisite && !player.activePowerups.includes(p.prerequisite)) return false;
            if (p.type === 'unique' && player.activePowerups.includes(p.id)) return false;
            if (p.type === 'stackable') {
                const currentLevel = player.powerupLevels[p.id] || 0;
                if (currentLevel >= p.maxLevel) return false;
            }
            if (p.isHealing && isPlayerMaxHealth) return false; // Don't offer healing at max HP
            return true;
        });

        // Weight healing powerups if player health is low
        let weightedPool = [...availablePowerups];
        if (player.health / player.maxHealth < LOW_HEALTH_THRESHOLD) {
            const healPowerups = availablePowerups.filter(p => p.isHealing);
            if (healPowerups.length > 0) {
                console.log(`Low health (${(player.health / player.maxHealth * 100).toFixed(0)}%)! Increased chance for healing.`);
                for (let i = 0; i < LOW_HEALTH_HEAL_BOOST_FACTOR; i++) {
                    weightedPool.push(...healPowerups);
                }
            }
        }

        // Pick distinct powerups randomly from the weighted pool
        const chosenPowerups = [];
        weightedPool.sort(() => 0.5 - Math.random()); // Shuffle the weighted pool
        const pickedIds = new Set();
        for (const p of weightedPool) {
            if (chosenPowerups.length >= POWERUP_CHOICES) break;
            if (!pickedIds.has(p.id)) { // Ensure unique powerup IDs are chosen
                chosenPowerups.push(p);
                pickedIds.add(p.id);
            }
        }

        // Create buttons for the chosen powerups
        if (chosenPowerups.length === 0) {
            powerupOptionsDiv.innerHTML = "<p>No upgrades available this time!</p><button onclick='selectPowerup(null)'>Continue</button>";
        } else {
            chosenPowerups.forEach(p => {
                const button = document.createElement('button');
                const currentLevel = player.powerupLevels[p.id] || 0;
                const nameDisplay = p.type === 'stackable' ? `${p.name} (Lvl ${currentLevel + 1})` : p.name;
                button.innerHTML = `
                             <span class="powerup-icon">${p.icon}</span>
                             <div>
                                 ${nameDisplay} <br>
                                 <span class="powerup-description">${p.description}</span>
                             </div>`;
                button.onclick = () => selectPowerup(p.id);
                powerupOptionsDiv.appendChild(button);
            });
        }

        // Add Reroll Button (if not debug)
        const rerollButton = document.createElement('button');
        rerollButton.id = 'reroll-button';
        rerollButton.textContent = `Re-roll (${player.rerollsLeft} left)`;
        // Apply specific styles for reroll button
        rerollButton.style.fontSize = '0.8rem';
        rerollButton.style.padding = '8px 16px';
        rerollButton.style.width = 'auto';
        rerollButton.style.alignSelf = 'center';
        if (player.rerollsLeft <= 0) {
            rerollButton.disabled = true;
        }
        rerollButton.onclick = () => {
            if (player.rerollsLeft > 0) {
                player.rerollsLeft--;
                console.log(`Rerolled. ${player.rerollsLeft} left.`);
                try { if (soundsInitialized && hitSynth) hitSynth.triggerAttackRelease("A4", "16n", Tone.now()); } // Reroll sound
                catch (error) { console.error("Error playing reroll sound:", error); }
                initiatePowerupSelection(); // Re-run selection logic
            }
        };
        powerupSelectionDiv.appendChild(rerollButton); // Append after options div
    }

    // Display the powerup selection overlay
    powerupSelectionDiv.style.display = 'flex';
    powerupSelectionDiv.style.flexDirection = 'column';
    powerupSelectionDiv.style.alignItems = 'center';
    powerupSelectionDiv.scrollTop = 0; // Scroll to top for debug mode list
}

// NEW: Debug function to apply powerup without ending selection
function applyDebugPowerup(powerupId) {
    const selected = powerups.find(p => p.id === powerupId);
    if (selected && typeof selected.apply === 'function') {
        // Check conditions again just in case UI wasn't perfectly synced
        if (selected.prerequisite && !player.activePowerups.includes(selected.prerequisite)) return;
        if (selected.type === 'unique' && player.activePowerups.includes(selected.id)) return;
        if (selected.type === 'stackable') {
            const currentLevel = player.powerupLevels[selected.id] || 0;
            if (currentLevel >= selected.maxLevel) return;
        }

        // Apply the powerup
        selected.apply(player);
        if (selected.type === 'stackable') {
            player.powerupLevels[powerupId] = (player.powerupLevels[powerupId] || 0) + 1;
        }
        // Add to active list if it's a persistent effect (not just healing)
        if (!selected.isHealing && !player.activePowerups.includes(powerupId)) {
            player.activePowerups.push(powerupId);
        }
        console.log("DEBUG Added powerup:", selected.name, "Level:", player.powerupLevels[powerupId]);

        updatePowerupIconsUI();
        updatePlayerHealthUI(); // Update health in case HP up applied
        try { if (soundsInitialized && powerupSynth) powerupSynth.triggerAttackRelease("E5", "8n"); } // Slightly different sound for debug add
        catch (error) { console.error("Error playing debug powerup sound:", error); }

        // Re-render the debug selection screen immediately to update levels/availability
        initiatePowerupSelection();
    } else {
        console.warn("Attempted to apply invalid or non-functional debug powerup:", powerupId);
    }
}

function selectPowerup(powerupId) {
    // Normal Mode: Apply the selected powerup
    if (!DEBUG_MODE && powerupId) {
        const selected = powerups.find(p => p.id === powerupId);
        if (selected && typeof selected.apply === 'function') {
            selected.apply(player);
            if (selected.type === 'stackable') {
                player.powerupLevels[powerupId] = (player.powerupLevels[powerupId] || 0) + 1;
            }
            if (!selected.isHealing && !player.activePowerups.includes(powerupId)) {
                player.activePowerups.push(powerupId);
            }
            console.log("Selected powerup:", selected.name, "Level:", player.powerupLevels[powerupId]);
            updatePowerupIconsUI();
            try { if (soundsInitialized && powerupSynth) powerupSynth.triggerAttackRelease("C5", "4n"); }
            catch (error) { console.error("Error playing powerup sound:", error); }
        } else {
            console.warn("Selected invalid powerup ID:", powerupId);
        }
    } else if (DEBUG_MODE && powerupId) {
        // Should not happen if debug buttons call applyDebugPowerup directly
        console.warn("selectPowerup called with ID in debug mode - this shouldn't happen.");
        return; // Do nothing extra in debug mode when a powerup is clicked (handled by applyDebugPowerup)
    }

    // --- Resume Game (applies after normal selection OR debug 'Continue') ---
    powerupSelectionDiv.style.display = 'none';
    selectingPowerup = false;
    gamePaused = false;
    startNextWave(); // Prepare for the next wave
    gameLoop(); // Resume game loop immediately
}


function startNextWave() {
    wave++;
    // Increase enemies to spawn, more aggressive increase later
    const currentWaveIncrease = (wave < 5) ? 3 : 8;
    enemiesToSpawn += currentWaveIncrease;
    enemiesSpawnedThisWave = 0;

    // Adjusted Spawn Rate Curve: Slower decrease early, faster later
    const earlyWaveCutoff = 7;
    const earlyMultiplier = 0.92; // Slower decrease up to wave 7
    const lateMultiplier = ENEMY_SPAWN_RATE_DECREASE_FACTOR; // Original 0.85 after wave 7

    if (wave <= earlyWaveCutoff) {
        currentEnemySpawnRate = ENEMY_SPAWN_RATE_BASE * Math.pow(earlyMultiplier, wave - 1);
    } else {
        // Calculate rate at the cutoff point based on early multiplier
        const rateAtCutoff = ENEMY_SPAWN_RATE_BASE * Math.pow(earlyMultiplier, earlyWaveCutoff - 1);
        // Apply late multiplier for waves beyond the cutoff
        currentEnemySpawnRate = rateAtCutoff * Math.pow(lateMultiplier, wave - earlyWaveCutoff);
    }
    // Ensure spawn rate doesn't go below minimum
    currentEnemySpawnRate = Math.max(MIN_ENEMY_SPAWN_RATE, currentEnemySpawnRate);

    lastEnemySpawnTime = Date.now(); // Allow immediate spawn if rate is fast
    updateWaveUI();

    // Cycle background themes
    const themeIndex = (wave - 1) % backgroundThemes.length;
    currentBackgroundColor = backgroundThemes[themeIndex].color;

    console.log(`Starting Wave ${wave} | Enemies: ${enemiesToSpawn} | Spawn Rate: ${currentEnemySpawnRate.toFixed(0)}ms | BG Theme: ${backgroundThemes[themeIndex].name} | Scaling: x${calculateWaveScalingFactor().toFixed(2)}`);
}


// --- Drawing Functions ---
function drawTextWithOutline(text, x, y, fillStyle, outlineStyle = 'black', outlineWidth = 2) {
    ctx.save();
    ctx.strokeStyle = outlineStyle;
    ctx.lineWidth = outlineWidth;
    ctx.lineJoin = "round"; // Improves corner appearance
    ctx.miterLimit = 2; // Prevents sharp spikes
    ctx.strokeText(text, x, y); // Draw outline first
    ctx.fillStyle = fillStyle;
    ctx.fillText(text, x, y); // Draw fill text over outline
    ctx.restore();
}

function drawBackground() {
    const canvasLogicalWidth = canvas.width / (window.devicePixelRatio || 1);
    const canvasLogicalHeight = canvas.height / (window.devicePixelRatio || 1);
    // Fill background color
    ctx.fillStyle = currentBackgroundColor;
    ctx.fillRect(0, 0, canvasLogicalWidth, canvasLogicalHeight);
}

function drawObstacles() {
    ctx.fillStyle = '#555';
    obstacles.forEach(obs => {
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
    });
}

function drawDashTrail() {
    const now = Date.now();
    ctx.save();
    player.trail.forEach((point, index) => {
        const age = now - point.time;
        const maxAge = DASH_TRAIL_INTERVAL * DASH_TRAIL_LENGTH;
        const alpha = Math.max(0, 0.4 * (1 - age / maxAge)); // Fade out alpha

        ctx.globalAlpha = alpha;
        ctx.font = `${point.size * 1.2}px sans-serif`; // Use emoji size
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        // Draw emoji with subtle outline
        drawTextWithOutline('💨', point.x + point.size / 2, point.y + point.size / 2, 'rgba(200, 200, 200, 0.5)', 'rgba(50,50,50,0.7)', 2);
    });
    ctx.restore(); // Restore globalAlpha and other states
}


function drawHealthBar(target, barX, barY, barWidth, barHeight) {
    const now = Date.now();
    const healthPercent = Math.max(0, target.displayHealth / target.maxHealth);

    // Background
    ctx.fillStyle = '#333';
    ctx.fillRect(barX, barY, barWidth, barHeight);

    // Ghost health (recent damage)
    if (target.ghostHealth > 0 && target.ghostHealthTimer > 0) {
        const ghostAge = now - target.ghostHealthTimer;
        if (ghostAge < GHOST_HEALTH_FADE_DURATION) {
            const ghostWidth = (target.ghostHealth / target.maxHealth) * barWidth;
            const ghostX = barX + healthPercent * barWidth; // Starts where current health ends
            const ghostAlpha = 1.0 - (ghostAge / GHOST_HEALTH_FADE_DURATION); // Fade out
            ctx.fillStyle = `rgba(255, 255, 255, ${ghostAlpha * 0.7})`;
            ctx.fillRect(ghostX, barY, ghostWidth, barHeight);
        } else {
            target.ghostHealth = 0; // Reset ghost health after fade
        }
    }

    // Current health fill
    let healthColor = '#2ecc71'; // Green
    const displayRatio = target.displayHealth / target.maxHealth;
    if (displayRatio < 0.3) healthColor = '#e74c3c'; // Red
    else if (displayRatio < 0.6) healthColor = '#f39c12'; // Orange
    ctx.fillStyle = healthColor;
    ctx.fillRect(barX, barY, barWidth * healthPercent, barHeight);

    // Border
    ctx.strokeStyle = '#111';
    ctx.lineWidth = 1;
    ctx.strokeRect(barX, barY, barWidth, barHeight);
}

function drawPlayer() {
    ctx.save();
    ctx.font = `${PLAYER_SIZE * 1.5}px sans-serif`; // Emoji size
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const playerCenterX = player.x + player.width / 2;
    const playerCenterY = player.y + player.height / 2;

    // Draw player emoji (with shield if dashing+damage or post-dash invincible)
    const now = Date.now();
    if ((player.isDashing && player.unlockedPowerDash) || now < player.postDashInvincibilityEnd) {
        // Draw shield emoji slightly larger when invincible
        drawTextWithOutline('🛡️', playerCenterX, playerCenterY, '#D0D0FF', 'black', 2);
        // Add a pulsing shield visual effect
        ctx.globalAlpha = 1.0;
        const shieldPulse = 0.6 + Math.sin(Date.now() * 0.015) * 0.4; // Pulsing opacity/size
        ctx.strokeStyle = `rgba(210, 230, 255, ${shieldPulse * 0.8})`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(playerCenterX, playerCenterY, player.width * 0.8, 0, Math.PI * 2); // Slightly larger arc
        ctx.stroke();
    } else {
        // Normal player emoji, slightly transparent if dashing without damage
        if (player.isDashing) { ctx.globalAlpha = 0.5; }
        drawTextWithOutline('🤺', playerCenterX, playerCenterY, '#3498db', 'black', 2);
        ctx.globalAlpha = 1.0; // Reset alpha
    }


    // Draw aiming indicator line
    const angleToCursor = Math.atan2(cursorY - playerCenterY, cursorX - playerCenterX);
    const indicatorLength = player.width * 0.6; // Line length relative to player size
    const indicatorX = playerCenterX + Math.cos(angleToCursor) * indicatorLength;
    const indicatorY = playerCenterY + Math.sin(angleToCursor) * indicatorLength;
    ctx.strokeStyle = '#f1c40f'; // Yellow
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(playerCenterX, playerCenterY);
    ctx.lineTo(indicatorX, indicatorY);
    ctx.stroke();
    // Add a thinner white line inside for contrast
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Draw damage aura visual
    if (player.hasDamageAura) {
        ctx.strokeStyle = `rgba(255, 255, 100, ${0.3 + Math.random() * 0.3})`; // Flickering yellow
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(playerCenterX, playerCenterY, player.auraRadius, 0, Math.PI * 2);
        ctx.stroke();
        // Add thin white border for definition
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    ctx.restore(); // Restore context state
}


function drawBullets() {
    bullets.forEach(bullet => {
        ctx.fillStyle = '#f1c40f'; // Bright yellow
        ctx.shadowColor = '#f1c40f'; // Matching glow
        ctx.shadowBlur = 5;

        ctx.beginPath();
        ctx.arc(bullet.x + bullet.width / 2, bullet.y + bullet.height / 2, bullet.width / 1.5, 0, Math.PI * 2); // Slightly larger appearance
        ctx.fill();

        // Reset shadow and add border
        ctx.shadowBlur = 0;
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
        ctx.stroke();
    });
}

function drawEnemies() {
    const canvasLogicalWidth = canvas.width / (window.devicePixelRatio || 1);
    enemies.forEach(enemy => {
        if (!enemy) return;
        ctx.save();
        const centerX = enemy.x + enemy.width / 2;
        const centerY = enemy.y + enemy.height / 2;

        let enemyChar = '💀'; // Default
        let enemyColor = '#e74c3c'; // Default red

        // Assign emoji and color based on type and state
        switch (enemy.type) {
            case 'charger':
                enemyChar = (enemy.state === 'charging') ? '😡' : '😈';
                enemyColor = (enemy.state === 'windup') ? '#f39c12' : (enemy.state === 'charging' ? '#e67e22' : '#d35400');
                break;
            case 'homing_charger':
                // ** Changed Emoji **
                enemyChar = (enemy.state === 'charging') ? '👹' : '👿'; // Ogre when charging
                enemyColor = (enemy.state === 'windup') ? '#ffdd57' : (enemy.state === 'charging' ? '#ffae42' : '#ff8c00');
                break;
            case 'shooter':
                enemyChar = '👾'; enemyColor = '#9b59b6'; // Purple
                break;
            case 'shooter_burst':
                enemyChar = '🔫'; enemyColor = '#8e44ad'; // Darker purple
                break;
            case 'shooter_spread':
                enemyChar = '📡'; enemyColor = '#a569bd'; // Lighter purple
                break;
            case 'shooter_sniper':
                enemyChar = '🔭'; enemyColor = '#5e3370'; // Dark magenta
                break;
            case 'shielded':
                enemyChar = '🤖'; enemyColor = '#7f8c8d'; // Grey
                break;
            // Basic uses default
        }

        // --- Special rendering for specific states ---
        if (enemy.type === 'shooter_sniper') {
            if (enemy.state === 'targeting') {
                // Draw targeting laser line
                const pulse = 0.6 + Math.sin(Date.now() * 0.01) * 0.4; // Pulsing effect
                ctx.strokeStyle = `rgba(255, 0, 0, ${0.3 + pulse * 0.5})`; // Semi-transparent pulsing red
                ctx.lineWidth = 2 + pulse * 2; // Pulsing width
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                const indicatorDrawLength = canvasLogicalWidth * 2; // Ensure line goes off-screen
                ctx.lineTo(centerX + Math.cos(enemy.laserTargetAngle) * indicatorDrawLength, centerY + Math.sin(enemy.laserTargetAngle) * indicatorDrawLength);
                ctx.stroke();
            } else if (enemy.state === 'firing') {
                // Draw a bright flash effect while firing laser
                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.beginPath();
                ctx.arc(centerX, centerY, enemy.width * 0.8, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Draw the enemy emoji
        ctx.font = `${enemy.width * 1.5}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        drawTextWithOutline(enemyChar, centerX, centerY, enemyColor, 'black', 2);

        // Draw shield visual for shielded enemies
        if (enemy.type === 'shielded') {
            ctx.strokeStyle = '#66aaff'; // Light blue shield color
            ctx.lineWidth = 5;
            ctx.beginPath();
            const radius = enemy.width * 0.8; // Shield radius relative to enemy size
            // Draw arc based on facing angle and shield width
            ctx.arc(centerX, centerY, radius, enemy.facingAngle - SHIELD_ANGLE_WIDTH / 2, enemy.facingAngle + SHIELD_ANGLE_WIDTH / 2);
            ctx.stroke();
            // Add a thinner white line inside for highlight
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        // Draw health bar above enemy
        const barWidth = enemy.width;
        const barHeight = 5;
        const barX = enemy.x;
        const barY = enemy.y - barHeight - 4; // Position above the enemy
        drawHealthBar(enemy, barX, barY, barWidth, barHeight);

        ctx.restore(); // Restore context state
    });
}


function drawEnemyBullets() {
    enemyBullets.forEach(bullet => {
        ctx.fillStyle = '#ff6b6b'; // Pinkish-red color
        ctx.shadowColor = '#ff6b6b';
        ctx.shadowBlur = 4;

        ctx.beginPath();
        // Sniper bullets could be visually distinct if needed (using bullet.isSniper flag if added)
        // if (bullet.isSniper) { ... } else { ... }
        ctx.arc(bullet.x + bullet.width / 2, bullet.y + bullet.height / 2, bullet.width / 1.8, 0, Math.PI * 2); // Standard size
        ctx.fill();

        // Reset shadow and add border
        ctx.shadowBlur = 0;
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
        ctx.stroke();
    });
}


function drawLasers() {
    const now = Date.now();
    const canvasLogicalWidth = canvas.width / (window.devicePixelRatio || 1);
    const canvasLogicalHeight = canvas.height / (window.devicePixelRatio || 1);
    const laserDrawLength = Math.max(canvasLogicalWidth, canvasLogicalHeight) * 2; // Ensure laser extends off-screen

    ctx.save();
    activeLasers.forEach(laser => {
        const elapsed = now - (laser.endTime - ENEMY_LASER_DURATION);
        const alpha = 1 - (elapsed / ENEMY_LASER_DURATION); // Fade out alpha

        if (alpha <= 0) return; // Skip drawing if fully faded

        const endX = laser.x1 + Math.cos(laser.angle) * laserDrawLength;
        const endY = laser.y1 + Math.sin(laser.angle) * laserDrawLength;

        // Draw main laser beam (thick, semi-transparent red)
        ctx.strokeStyle = `rgba(255, 0, 0, ${Math.max(0, alpha * 0.8)})`;
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(laser.x1, laser.y1);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        // Draw thin white core for intensity
        ctx.strokeStyle = `rgba(255, 200, 200, ${Math.max(0, alpha)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
    });
    ctx.restore();
}


function drawDamageNumbers() {
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = "bold 12px 'Press Start 2P'"; // Use game font, slightly bold
    damageNumbers.forEach(dn => {
        ctx.globalAlpha = dn.alpha; // Apply fade effect
        drawTextWithOutline(dn.text, dn.x, dn.y, dn.color, 'black', 2); // Draw with outline
    });
    ctx.restore(); // Restore alpha and font settings
}

function drawBombs() {
    ctx.save();
    ctx.font = `${BOMB_SIZE * 1.2}px sans-serif`; // Bomb emoji size
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    bombs.forEach(bomb => {
        // Add slight rotation or wobble?
        // const wobble = Math.sin(Date.now() * 0.02 + bomb.startTime) * 5; // Angle in degrees
        // ctx.translate(bomb.x, bomb.y);
        // ctx.rotate(wobble * Math.PI / 180);
        // drawTextWithOutline('💣', 0, 0, 'white');
        // ctx.rotate(-wobble * Math.PI / 180);
        // ctx.translate(-bomb.x, -bomb.y);
        drawTextWithOutline('💣', bomb.x, bomb.y, 'white'); // Simpler draw
    });
    ctx.restore();
}

function drawExplosions() {
    const now = Date.now();
    ctx.save();
    explosions.forEach(exp => {
        const elapsed = now - exp.startTime;
        const progress = elapsed / BOMB_EXPLOSION_DURATION; // 0 to 1

        if (progress > 1) return; // Don't draw finished explosions

        const currentRadius = lerp(0, exp.maxRadius, progress);
        const alpha = 1 - progress; // Fade out

        // ** Enhanced Visual: Multiple layers **
        // Outer glow (larger, more transparent)
        ctx.fillStyle = `rgba(255, 165, 0, ${alpha * 0.4})`; // Orange glow
        ctx.beginPath();
        ctx.arc(exp.x, exp.y, currentRadius * 1.2, 0, Math.PI * 2); // Slightly larger radius
        ctx.fill();

        // Main explosion fill (smaller, less transparent)
        ctx.fillStyle = `rgba(255, 100, 0, ${alpha * 0.7})`; // Reddish-orange fill
        ctx.beginPath();
        ctx.arc(exp.x, exp.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();

        // Shockwave border (sharp, fades)
        ctx.strokeStyle = `rgba(255, 200, 150, ${alpha * 0.9})`; // Bright orange/white border
        ctx.lineWidth = 3 + (1 - alpha) * 3; // Border thickens slightly as it fades
        ctx.beginPath();
        ctx.arc(exp.x, exp.y, currentRadius, 0, Math.PI * 2);
        ctx.stroke();

        // Optional: Add particles (simple example)
        /*
        if (progress < 0.5) { // Only for first half of explosion
            for (let k = 0; k < 5; k++) {
                const particleAngle = Math.random() * Math.PI * 2;
                const particleDist = Math.random() * currentRadius;
                const particleX = exp.x + Math.cos(particleAngle) * particleDist;
                const particleY = exp.y + Math.sin(particleAngle) * particleDist;
                ctx.fillStyle = `rgba(255, 255, 200, ${alpha * 0.8})`;
                ctx.fillRect(particleX - 2, particleY - 2, 4, 4); // Small squares
            }
        }
        */
    });
    ctx.restore();
}


function drawFPSCounter() { /* NEW */
    if (fpsCounter) fpsCounter.textContent = `FPS: ${fps}`;
}


// --- UI Updates ---
function updateScoreUI() {
    scoreUI.textContent = `Score: ${score}`;
}
function updateWaveUI() {
    waveUI.textContent = `Wave: ${wave}`;
}

function updateDashCooldownUI() {
    const now = Date.now();
    dashCooldownUI.innerHTML = ''; // Clear previous content

    if (player.maxDashCharges === undefined) { // Should be set during init, but safeguard
        dashCooldownUI.textContent = 'Dash: N/A';
        return;
    }

    if (player.dashCharges > 0) { // Ready charges
        let icons = '';
        for (let i = 0; i < player.dashCharges; i++) {
            icons += '💨'; // Ready dash icon
        }
        icons += `<span>[${player.dashCharges}/${player.maxDashCharges}]</span>`; // Text indicator
        dashCooldownUI.innerHTML = icons;
        dashCooldownUI.classList.remove('cooldown-active');
        dashCooldownUI.classList.add('cooldown-ready');
    } else { // On cooldown
        const timeRemaining = player.dashCooldownEnd - now;
        if (timeRemaining > 0) {
            const secondsRemaining = (timeRemaining / 1000).toFixed(1);
            dashCooldownUI.textContent = `⚡ ${secondsRemaining}s`; // Cooldown icon + time
        } else {
            // Should technically have a charge if timeRemaining <= 0, but handle edge case
            dashCooldownUI.innerHTML = `<span>[0/${player.maxDashCharges}]</span>`;
        }
        dashCooldownUI.classList.remove('cooldown-ready');
        dashCooldownUI.classList.add('cooldown-active');
    }
}

// NEW Bomb Cooldown UI Update
function updateBombCooldownUI() {
    const now = Date.now();
    bombCooldownUI.innerHTML = ''; // Clear previous

    if (!player.hasBomb) { // Don't show if bomb not acquired
        bombCooldownUI.style.display = 'none'; // Hide the element completely
        return;
    }

    bombCooldownUI.style.display = 'flex'; // Show the element when bomb is unlocked

    const timeRemaining = player.bombCooldownEnd - now;
    if (timeRemaining <= 0) { // Bomb Ready
        bombCooldownUI.textContent = '💣 READY';
        bombCooldownUI.classList.remove('cooldown-active');
        bombCooldownUI.classList.add('cooldown-ready');
    } else { // Bomb on Cooldown
        const secondsRemaining = (timeRemaining / 1000).toFixed(1);
        bombCooldownUI.textContent = `💣 ${secondsRemaining}s`;
        bombCooldownUI.classList.remove('cooldown-ready');
        bombCooldownUI.classList.add('cooldown-active');
    }
}


function updatePowerupIconsUI() {
    activePowerupsUI.innerHTML = ''; // Clear previous icons
    if (player.activePowerups && player.activePowerups.length > 0) {
        player.activePowerups
            // Filter out instant effects like healing (redundant check, but safe)
            .filter(powerupId => {
                const pData = powerups.find(p => p.id === powerupId);
                return pData && !pData.isHealing;
            })
            .forEach(powerupId => {
                const icon = powerupIcons[powerupId];
                if (icon) {
                    const iconSpan = document.createElement('span');
                    iconSpan.className = 'powerup-icon';
                    iconSpan.textContent = icon;

                    // --- Tooltip Logic ---
                    const tooltipSpan = document.createElement('span');
                    tooltipSpan.className = 'tooltip-text';
                    const powerupData = powerups.find(p => p.id === powerupId);
                    const currentLevel = player.powerupLevels[powerupId] || 0; // Get level for stackable info
                    let tooltipDetail = "";
                    let description = "";

                    if (powerupData) {
                        description = powerupData.description || "";
                        tooltipDetail = powerupData.name || powerupId; // Fallback to ID if name missing

                        // Add level and specific stats for stackable powerups
                        if (powerupData.type === 'stackable' && currentLevel > 0) {
                            tooltipDetail = `Lvl ${currentLevel}: ${powerupData.name}`;
                            // Add specific value based on powerup ID
                            switch (powerupId) {
                                case 'hp_up': tooltipDetail += ` (+${currentLevel * powerupData.baseValue} Max HP)`; break;
                                case 'static_field_size': tooltipDetail += ` (+${currentLevel * powerupData.baseValue} Radius)`; break;
                                case 'static_field_damage': tooltipDetail += ` (x${(powerupData.multiplier ** currentLevel).toFixed(2)} Damage)`; break;
                                case 'dash_cd_down': tooltipDetail += ` (x${(powerupData.multiplier ** currentLevel).toFixed(2)} Cooldown)`; break;
                                case 'fire_rate_up': const speedMultiplier = (1 / (powerupData.multiplier ** currentLevel)); tooltipDetail += ` (x${speedMultiplier.toFixed(2)} Speed)`; break;
                                case 'bullet_speed_up': tooltipDetail += ` (+${currentLevel * powerupData.baseValue} Speed)`; break;
                                case 'damage_up': tooltipDetail += ` (+${currentLevel * powerupData.baseValue} Damage)`; break;
                                case 'pierce_shot': tooltipDetail += ` (+${currentLevel * powerupData.baseValue} Pierce)`; break;
                                case 'bullet_homing_stack': tooltipDetail += ` (Str: ${(currentLevel * (MAX_HOMING_STRENGTH / 5)).toFixed(3)})`; break;
                                /* case 'crit_chance': tooltipDetail += ` (+${(currentLevel * powerupData.baseValue * 100).toFixed(0)}% Chance)`; break; */ /* Crit commented */
                                /* case 'crit_damage': tooltipDetail += ` (+${(currentLevel * powerupData.baseValue * 100).toFixed(0)}% Damage)`; break; */ /* Crit commented */
                            }
                        } else if (powerupData.type === 'unique') {
                            tooltipDetail = `${powerupData.name}`; // Just name for unique
                        }
                        // Add the base description below the title/level
                        tooltipDetail += `<span class="desc">${description}</span>`;
                    } else {
                        tooltipDetail = powerupId; // Fallback if powerup data not found
                    }
                    tooltipSpan.innerHTML = tooltipDetail;
                    iconSpan.appendChild(tooltipSpan);
                    // --- End Tooltip Logic ---

                    activePowerupsUI.appendChild(iconSpan);
                }
            });
    } else {
        // Display placeholder if no active powerups
        activePowerupsUI.innerHTML = '<span style="font-size: 0.7rem; color: #888;">No Powerups</span>';
    }
}


function updatePlayerHealthUI() {
    if (!player || !player.maxHealth || !playerHealthBarFill || !playerHealthBarGhost || !playerHealthText) return; // Ensure elements exist

    const now = Date.now();
    const healthPercent = Math.max(0, player.displayHealth / player.maxHealth);

    // Update fill bar width and color
    playerHealthBarFill.style.width = `${healthPercent * 100}%`;
    let healthColor = '#2ecc71'; // Green default
    if (healthPercent < 0.3) healthColor = '#e74c3c'; // Red low health
    else if (healthPercent < 0.6) healthColor = '#f39c12'; // Orange medium health
    playerHealthBarFill.style.backgroundColor = healthColor;

    // Update ghost bar (recent damage indicator)
    if (player.ghostHealth > 0 && player.ghostHealthTimer > 0) {
        const ghostAge = now - player.ghostHealthTimer;
        if (ghostAge < GHOST_HEALTH_FADE_DURATION) {
            const ghostPercent = player.ghostHealth / player.maxHealth;
            playerHealthBarGhost.style.left = `${healthPercent * 100}%`; // Position after current health
            playerHealthBarGhost.style.width = `${ghostPercent * 100}%`; // Width based on damage taken
            playerHealthBarGhost.style.opacity = 1.0 - (ghostAge / GHOST_HEALTH_FADE_DURATION); // Fade out
            playerHealthBarGhost.style.display = 'block'; // Make visible
        } else {
            player.ghostHealth = 0; // Reset ghost health after fade
            playerHealthBarGhost.style.display = 'none'; // Hide
            playerHealthBarGhost.style.opacity = 1; // Reset opacity for next time
        }
    } else {
        playerHealthBarGhost.style.display = 'none'; // Hide if no ghost health
    }

    // Update health text (e.g., "85 / 100")
    playerHealthText.textContent = `${Math.max(0, Math.round(player.health))} / ${player.maxHealth}`;
}

function showMessage(text) {
    hideHelp(); // Ensure help is hidden when message appears
    messageText.textContent = text;
    messageBox.style.display = 'flex';
    // Ensure styles for centering content are applied if needed
    messageBox.style.flexDirection = 'column';
    messageBox.style.alignItems = 'center';
}
function hideMessage() {
    messageBox.style.display = 'none';
}

function togglePause() {
    // Can't pause if game over, selecting powerup, or help is showing
    if (gameOver || selectingPowerup || (helpOverlay && helpOverlay.style.display === 'flex')) return;

    gamePaused = !gamePaused;
    if (gamePaused) {
        showMessage("Paused (Press 'P' to Resume)");
        restartButton.style.display = 'none'; // Hide restart button during pause
        try { if (soundsInitialized) Tone.Transport.pause(); } catch (e) { console.error("Error pausing Tone:", e) }
    } else {
        hideMessage();
        try { if (soundsInitialized) Tone.Transport.start(); } catch (e) { console.error("Error starting Tone:", e) }
        gameLoop(); // Resume game loop
    }
}

function toggleMusicMute() {
    isMusicMuted = !isMusicMuted;
    if (soundsInitialized && backgroundMusicLoop) {
        backgroundMusicLoop.mute = isMusicMuted;
    }
    muteButton.textContent = isMusicMuted ? "Unmute Music" : "Mute Music";
    console.log("Music Muted:", isMusicMuted);
}
muteButton.addEventListener('click', toggleMusicMute);


function toggleDebugMode() {
    DEBUG_MODE = !DEBUG_MODE;
    document.documentElement.classList.toggle('debug-mode', DEBUG_MODE);
    fpsCounter.style.display = DEBUG_MODE ? 'block' : 'none';
    console.log("Debug Mode:", DEBUG_MODE ? "ON" : "OFF");
}


// --- Game Over and Restart ---
function endGame() {
    hideHelp(); // Ensure help overlay is hidden
    gameOver = true;
    gamePaused = true; // Stop updates
    showMessage(`Game Over! Score: ${score}\nWave: ${wave}`);
    restartButton.style.display = 'block'; // Show restart button
    try {
        if (soundsInitialized) {
            Tone.Transport.stop(); // Stop all scheduled Tone events
            backgroundMusicLoop?.stop(); // Stop the music loop explicitly
        }
    } catch (e) { console.error("Error stopping Tone:", e) }
}

function resetGameVariables() {
    const canvasLogicalWidth = canvas.width / (window.devicePixelRatio || 1);
    const canvasLogicalHeight = canvas.height / (window.devicePixelRatio || 1);

    // Reset player stats and powerups
    PLAYER_SPEED = 2.5;
    BULLET_SPEED = BULLET_SPEED_BASE;
    BULLET_COOLDOWN = BULLET_COOLDOWN_BASE;
    BULLET_DAMAGE = BULLET_DAMAGE_BASE;
    PLAYER_DASH_COOLDOWN = 1000; // Reset dash cooldown if modified by powerups
    BULLET_PIERCE_COUNT = 0;
    SHOTGUN_SPREAD_COUNT = 1;
    BULLET_BOUNCE_COUNT = 0;
    BULLET_HOMING_STRENGTH = 0;
    // PLAYER_AURA_DAMAGE_BASE = 10; // Base damage already set in config
    // PLAYER_AURA_RADIUS_BASE = 75; // Base radius already set

    player = {
        x: canvasLogicalWidth / 2 - PLAYER_SIZE / 2,
        y: 50, // Start near top-center
        width: PLAYER_SIZE, height: PLAYER_SIZE,
        maxHealth: PLAYER_HEALTH_MAX_BASE,
        health: PLAYER_HEALTH_MAX_BASE,
        displayHealth: PLAYER_HEALTH_MAX_BASE, // For smooth bar animation
        ghostHealth: 0, ghostHealthTimer: 0, // For damage feedback
        dx: 0, dy: 0, // Movement vectors
        lastShotTime: 0,
        activePowerups: [], // List of acquired powerup IDs
        powerupLevels: {}, // Tracks levels of stackable powerups
        isDashing: false, dashDurationEnd: 0, dashCooldownEnd: 0, dashAngle: 0,
        maxDashCharges: 1, dashCharges: 1, unlockedPowerDash: false,
        postDashInvincibilityEnd: 0, // Track post-dash invincibility
        hasDamageAura: false, auraRadius: PLAYER_AURA_RADIUS_BASE, auraDamage: PLAYER_AURA_DAMAGE_BASE,
        critChance: CRIT_CHANCE_BASE, critMultiplier: CRIT_DAMAGE_MULTIPLIER_BASE,
        trail: [], // For dash visual
        lastHitSoundTime: 0, // Cooldown for player hit sound
        lastCollisionTime: 0, /* NEW: Reset collision timer */
        rerollsLeft: PLAYER_INITIAL_REROLLS, /* NEW: Reset rerolls */
        hasBomb: false, bombCooldownEnd: 0 // Bomb state
    };

    // Clear game objects
    enemies = []; bullets = []; enemyBullets = []; activeLasers = [];
    damageNumbers = []; bombs = []; explosions = [];
    keys = {}; // Reset input keys

    // Reset game state variables
    score = 0;
    wave = 1;
    enemiesToSpawn = 5;
    enemiesSpawnedThisWave = 0;
    lastEnemySpawnTime = 0;
    currentEnemySpawnRate = ENEMY_SPAWN_RATE_BASE;
    gameOver = false;
    gamePaused = false;
    selectingPowerup = false;
    cursorX = canvasLogicalWidth / 2; // Reset cursor position assumption
    cursorY = canvasLogicalHeight / 2;
    mouseInCanvas = false;
    lastAuraDamageTime = 0; // Reset aura timer

    // Update UI elements
    updatePowerupIconsUI();
    const initialThemeIndex = (wave - 1) % backgroundThemes.length;
    currentBackgroundColor = backgroundThemes[initialThemeIndex].color;
    updatePlayerHealthUI();
    updateDashCooldownUI();
    updateBombCooldownUI(); /* Update bomb UI on reset */
}


function restartGame() {
    hideHelp(); // Ensure help is hidden
    hideMessage(); // Hide game over/pause message
    powerupSelectionDiv.style.display = 'none'; // Hide powerup selection if open

    resizeCanvas(); // Ensure canvas is correct size
    resetGameVariables(); // Reset all game state

    // Update initial UI display
    updateScoreUI();
    updateWaveUI();
    updateDashCooldownUI();
    updateBombCooldownUI(); /* Update bomb UI on restart */

    // Restart audio context and music if initialized
    try {
        if (soundsInitialized) {
            patternIndex = 0; // Reset music pattern
            backgroundMusicLoop?.stop(0).start(0); // Restart loop from beginning
            if (backgroundMusicLoop) backgroundMusicLoop.mute = isMusicMuted; // Re-apply mute state
            Tone.Transport.start(); // Ensure transport is running
        }
    } catch (e) { console.error("Error starting Tone on restart:", e); }

    gameLoop(); // Start the game loop
}
restartButton.addEventListener('click', restartGame);

// --- Game Loop --- Added bomb/explosion updates/draws, FPS calc
function gameLoop(currentTime) {
    // Stop loop if game over, paused, or selecting powerup
    if (gameOver || gamePaused || selectingPowerup) {
        return;
    }

    // --- FPS Calculation (moved to top) ---
    if (lastFrameTime > 0) {
        const deltaTime = currentTime - lastFrameTime;
        if (deltaTime > 0) { // Avoid division by zero
            fps = Math.round(1000 / deltaTime);
        }
    }
    lastFrameTime = currentTime;

    try {
        // --- Clear Canvas ---
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform before clearing
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.restore(); // Restore previous transform (scaled by DPI)

        // --- Draw Background and Static Elements ---
        drawBackground();
        if (obstacles.length > 0) drawObstacles();

        // --- Update Game State ---
        updatePlayer();
        updateEnemies();
        updateBullets();
        updateEnemyBullets();
        updateActiveLasers();
        updateDamageNumbers();
        updateBombs();      // Added Bomb Update
        updateExplosions(); // Added Explosion Update
        spawnEnemy();       // Check if new enemies should spawn
        checkCollisions();  // Handle interactions between objects
        attemptAutoShoot(); // Player shooting

        // --- Update UI Elements (on screen text/bars) ---
        updateDashCooldownUI();
        updateBombCooldownUI(); // Update bomb cooldown UI each frame
        updatePlayerHealthUI();
        if (DEBUG_MODE) drawFPSCounter(); // Draw FPS if debug mode is on

        // --- Draw Dynamic Game Elements ---
        drawDashTrail();
        drawEnemies();
        drawEnemyBullets();
        drawLasers();
        drawPlayer();
        drawBombs();        // Added Bomb Draw
        drawExplosions();   // Added Explosion Draw
        drawBullets();
        drawDamageNumbers();

        // Request next frame
        requestAnimationFrame(gameLoop);

    } catch (error) {
        console.error("Error in game loop:", error);
        gameOver = true;
        showMessage("An error occurred! Please restart.");
    }
}

// --- Initial Setup ---
console.log("Game Initializing...");
resizeCanvas();         // Set initial canvas size
resetGameVariables();   // Set initial game state
updateScoreUI();        // Set initial UI text
updateWaveUI();
updateDashCooldownUI();
updatePowerupIconsUI();
updatePlayerHealthUI();
updateBombCooldownUI(); // Initial Bomb UI update
hideMessage();          // Ensure message box is hidden
powerupSelectionDiv.style.display = 'none'; // Ensure powerup box is hidden
muteButton.textContent = isMusicMuted ? "Unmute Music" : "Mute Music"; // Set mute button text
fpsCounter.style.display = 'none'; // Hide FPS counter initially
showHelp(); // Show help initially, sound init starts on interaction

function handleEnemyDeath(enemyIndex) {
    if (!enemies[enemyIndex]) return;
    
    enemies.splice(enemyIndex, 1);
    score += 10;
    updateScoreUI();

    // No need to update bullet hit lists, as the bullets will despawn eventually.

    // Check for wave end immediately after kill
    if (enemies.length === 0 && enemiesSpawnedThisWave >= enemiesToSpawn) {
        initiatePowerupSelection();
    }
}
