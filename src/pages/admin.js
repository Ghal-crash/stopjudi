import React, { useState, useEffect, useRef } from 'react';
import { Settings, TrendingUp, Users, DollarSign, AlertTriangle, Save, Play, Pause, RotateCcw, Coins, Trophy, Gift, Home, User, LogOut, Volume2, VolumeX } from 'lucide-react';

const CompleteSlotGameApp = () => {
  const [currentView, setCurrentView] = useState('login');
  const [userRole, setUserRole] = useState(null);
  const [user, setUser] = useState(null);
  
  // Game State
  const [gameState, setGameState] = useState({
    balance: 1000,
    bet: 1.00,
    spinning: false,
    reels: [
      ['🍒', '🍋', '⭐', '💎', '👑'],
      ['🍋', '⭐', '🍒', '💎', '👑'],
      ['⭐', '💎', '🍒', '🍋', '👑'],
      ['💎', '👑', '🍋', '⭐', '🍒'],
      ['👑', '🍒', '💎', '⭐', '🍋']
    ],
    lastWin: 0,
    totalWins: 0,
    spinCount: 0,
    bonusRounds: 0,
    autoSpin: false,
    soundEnabled: true
  });

  // Admin Settings
  const [adminSettings, setAdminSettings] = useState({
    rtp: 96.5,
    volatility: 'high',
    maxMultiplier: 5000,
    bonusFrequency: 125,
    newPlayerBoost: 15,
    vipPlayerRTP: 97.2,
    lossStreakCompensation: true,
    maxLossStreak: 50
  });

  // Game Statistics
  const [gameStats, setGameStats] = useState({
    totalSpins: 45623,
    totalWagered: 912460,
    totalPaidOut: 880123.70,
    currentRTP: 96.45,
    jackpotsPaid: 3,
    bonusTriggered: 364,
    activeUsers: 1247
  });

  const symbols = ['🍒', '🍋', '⭐', '💎', '👑', '🎰', '💰'];
  const payTable = {
    '🍒': { 3: 5, 4: 15, 5: 50 },
    '🍋': { 3: 8, 4: 25, 5: 75 },
    '⭐': { 3: 10, 4: 40, 5: 150 },
    '💎': { 3: 25, 4: 100, 5: 500 },
    '👑': { 3: 50, 4: 200, 5: 1000 },
    '🎰': { 3: 100, 4: 500, 5: 2500 },
    '💰': { 3: 200, 4: 1000, 5: 5000 }
  };

  // Login Component
  const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginType, setLoginType] = useState('player');

    const handleLogin = () => {
      if (username && password) {
        if (loginType === 'admin' && username === 'admin' && password === 'admin123') {
          setUserRole('admin');
          setUser({ name: 'Administrator', id: 'admin001' });
          setCurrentView('admin');
        } else if (loginType === 'player') {
          setUserRole('player');
          setUser({ name: username, id: Date.now(), balance: 1000, level: 'Bronze', vip: false });
          setCurrentView('game');
        } else {
          alert('Invalid credentials');
        }
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="bg-gray-800 bg-opacity-80 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md shadow-2xl border border-gray-700">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">🎰 Gates of Olympus</h1>
            <p className="text-gray-300">Enter the realm of fortune</p>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Login As</label>
              <select
                value={loginType}
                onChange={(e) => setLoginType(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="player">Player</option>
                <option value="admin">Administrator</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={loginType === 'admin' ? 'admin' : 'Enter username'}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={loginType === 'admin' ? 'admin123' : 'Enter password'}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              Login
            </button>
          </div>
          
          {loginType === 'admin' && (
            <div className="mt-6 p-4 bg-yellow-900 bg-opacity-30 rounded-lg border border-yellow-600">
              <p className="text-xs text-yellow-300">
                Demo Admin: username="admin", password="admin123"
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Game Component
  const GamePage = () => {
    const [spinAnimation, setSpinAnimation] = useState(false);
    const [showWin, setShowWin] = useState(false);
    
    const spin = () => {
      if (gameState.spinning || gameState.balance < gameState.bet) return;
      
      setGameState(prev => ({
        ...prev,
        spinning: true,
        balance: prev.balance - prev.bet,
        spinCount: prev.spinCount + 1
      }));
      
      setSpinAnimation(true);
      
      // Simulate spin duration
      setTimeout(() => {
        const newReels = gameState.reels.map(() => 
          Array(5).fill().map(() => symbols[Math.floor(Math.random() * symbols.length)])
        );
        
        const winAmount = calculateWin(newReels);
        const isBonus = Math.random() < (1 / adminSettings.bonusFrequency);
        
        setGameState(prev => ({
          ...prev,
          reels: newReels,
          spinning: false,
          lastWin: winAmount,
          balance: prev.balance + winAmount,
          totalWins: prev.totalWins + winAmount,
          bonusRounds: prev.bonusRounds + (isBonus ? 1 : 0)
        }));
        
        setSpinAnimation(false);
        
        if (winAmount > 0) {
          setShowWin(true);
          setTimeout(() => setShowWin(false), 3000);
        }
      }, 2000);
    };

    const calculateWin = (reels) => {
      // Simple win calculation - check for matching symbols
      let totalWin = 0;
      
      // Check each row for winning combinations
      for (let row = 0; row < 5; row++) {
        const rowSymbols = reels.map(reel => reel[row]);
        const counts = {};
        
        rowSymbols.forEach(symbol => {
          counts[symbol] = (counts[symbol] || 0) + 1;
        });
        
        Object.keys(counts).forEach(symbol => {
          const count = counts[symbol];
          if (count >= 3 && payTable[symbol]) {
            totalWin += (payTable[symbol][count] || 0) * gameState.bet;
          }
        });
      }
      
      // Apply RTP adjustment
      const targetRTP = user.vip ? adminSettings.vipPlayerRTP : adminSettings.rtp;
      const rtpMultiplier = targetRTP / 100;
      
      return Math.floor(totalWin * rtpMultiplier);
    };

    const toggleAutoSpin = () => {
      setGameState(prev => ({ ...prev, autoSpin: !prev.autoSpin }));
    };

    // Auto spin logic
    useEffect(() => {
      let interval;
      if (gameState.autoSpin && !gameState.spinning && gameState.balance >= gameState.bet) {
        interval = setInterval(() => {
          spin();
        }, 3000);
      }
      return () => clearInterval(interval);
    }, [gameState.autoSpin, gameState.spinning, gameState.balance]);

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        {/* Header */}
        <div className="bg-gray-900 bg-opacity-50 backdrop-blur-lg border-b border-gray-700 p-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-white">🎰 Gates of Olympus 1000</h1>
              <div className="bg-gray-800 px-4 py-2 rounded-lg">
                <span className="text-yellow-400 font-bold">Balance: ${gameState.balance.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-white text-sm">
                <div>Welcome, {user.name}</div>
                <div className="text-gray-300">Level: {user.level}</div>
              </div>
              <button
                onClick={() => setCurrentView('login')}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Game Area */}
        <div className="max-w-4xl mx-auto p-6">
          {/* Slot Machine */}
          <div className="bg-gray-900 bg-opacity-80 backdrop-blur-lg rounded-2xl p-8 mb-6 border border-gray-700">
            <div className="grid grid-cols-5 gap-4 mb-8">
              {gameState.reels.map((reel, reelIndex) => (
                <div key={reelIndex} className="bg-gray-800 rounded-lg p-4 border-2 border-yellow-600">
                  <div className={`space-y-2 ${spinAnimation ? 'animate-bounce' : ''}`}>
                    {reel.map((symbol, symbolIndex) => (
                      <div
                        key={symbolIndex}
                        className="text-4xl text-center p-2 bg-gray-700 rounded"
                      >
                        {symbol}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Win Display */}
            {showWin && gameState.lastWin > 0 && (
              <div className="text-center mb-6">
                <div className="text-6xl font-bold text-yellow-400 animate-pulse">
                  🎉 WIN ${gameState.lastWin.toFixed(2)} 🎉
                </div>
              </div>
            )}

            {/* Controls */}
            <div className="flex justify-center items-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <label className="text-white">Bet:</label>
                <select
                  value={gameState.bet}
                  onChange={(e) => setGameState(prev => ({ ...prev, bet: parseFloat(e.target.value) }))}
                  className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                  disabled={gameState.spinning}
                >
                  <option value={0.25}>$0.25</option>
                  <option value={0.50}>$0.50</option>
                  <option value={1.00}>$1.00</option>
                  <option value={2.50}>$2.50</option>
                  <option value={5.00}>$5.00</option>
                  <option value={10.00}>$10.00</option>
                </select>
              </div>

              <button
                onClick={spin}
                disabled={gameState.spinning || gameState.balance < gameState.bet}
                className={`px-8 py-4 rounded-lg font-bold text-lg flex items-center gap-2 transition-all duration-200 transform hover:scale-105 ${
                  gameState.spinning || gameState.balance < gameState.bet
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white'
                }`}
              >
                {gameState.spinning ? (
                  <>
                    <RotateCcw className="animate-spin" size={20} />
                    SPINNING...
                  </>
                ) : (
                  <>
                    <Play size={20} />
                    SPIN
                  </>
                )}
              </button>

              <button
                onClick={toggleAutoSpin}
                className={`px-6 py-4 rounded-lg font-bold flex items-center gap-2 transition-all duration-200 ${
                  gameState.autoSpin
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-purple-600 hover:bg-purple-700 text-white'
                }`}
              >
                {gameState.autoSpin ? (
                  <>
                    <Pause size={16} />
                    STOP AUTO
                  </>
                ) : (
                  <>
                    <Play size={16} />
                    AUTO SPIN
                  </>
                )}
              </button>
            </div>

            {/* Game Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-800 p-4 rounded-lg text-center">
                <div className="text-gray-400 text-sm">Total Spins</div>
                <div className="text-white font-bold text-xl">{gameState.spinCount}</div>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg text-center">
                <div className="text-gray-400 text-sm">Total Wins</div>
                <div className="text-green-400 font-bold text-xl">${gameState.totalWins.toFixed(2)}</div>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg text-center">
                <div className="text-gray-400 text-sm">Last Win</div>
                <div className="text-yellow-400 font-bold text-xl">${gameState.lastWin.toFixed(2)}</div>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg text-center">
                <div className="text-gray-400 text-sm">Bonus Rounds</div>
                <div className="text-purple-400 font-bold text-xl">{gameState.bonusRounds}</div>
              </div>
            </div>
          </div>

          {/* Pay Table */}
          <div className="bg-gray-900 bg-opacity-80 backdrop-blur-lg rounded-2xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Trophy className="text-yellow-400" />
              Pay Table
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.keys(payTable).map(symbol => (
                <div key={symbol} className="bg-gray-800 p-4 rounded-lg text-center">
                  <div className="text-3xl mb-2">{symbol}</div>
                  <div className="text-sm text-gray-300">
                    <div>3x: {payTable[symbol][3]}x</div>
                    <div>4x: {payTable[symbol][4]}x</div>
                    <div>5x: {payTable[symbol][5]}x</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Admin Dashboard Component
  const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');

    const handleSettingChange = (setting, value) => {
      setAdminSettings(prev => ({ ...prev, [setting]: value }));
    };

    const saveSettings = () => {
      alert('Settings saved successfully! Changes will take effect immediately.');
    };

    return (
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Header */}
        <div className="bg-gray-800 border-b border-gray-700 p-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold flex items-center gap-3">
              <Settings className="text-blue-400" />
              Admin Dashboard - Gates of Olympus 1000
            </h1>
            <div className="flex items-center gap-4">
              <button
                onClick={saveSettings}
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <Save size={16} />
                Save Settings
              </button>
              <button
                onClick={() => setCurrentView('login')}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-gray-800 border-b border-gray-700">
          <div className="max-w-7xl mx-auto">
            <div className="flex space-x-8">
              {[
                { id: 'overview', name: 'Overview', icon: TrendingUp },
                { id: 'settings', name: 'Game Settings', icon: Settings },
                { id: 'players', name: 'Player Management', icon: Users },
                { id: 'statistics', name: 'Statistics', icon: DollarSign }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-4 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-400 text-blue-400'
                      : 'border-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  <tab.icon size={20} />
                  {tab.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-gray-800 p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400">Current RTP</p>
                      <p className="text-2xl font-bold text-green-400">{gameStats.currentRTP}%</p>
                    </div>
                    <TrendingUp className="text-green-400" size={32} />
                  </div>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400">Active Users</p>
                      <p className="text-2xl font-bold">{gameStats.activeUsers.toLocaleString()}</p>
                    </div>
                    <Users className="text-blue-400" size={32} />
                  </div>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400">Total Wagered</p>
                      <p className="text-2xl font-bold">${gameStats.totalWagered.toLocaleString()}</p>
                    </div>
                    <DollarSign className="text-yellow-400" size={32} />
                  </div>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400">Profit Margin</p>
                      <p className="text-2xl font-bold text-green-400">
                        {((1 - gameStats.currentRTP / 100) * 100).toFixed(2)}%
                      </p>
                    </div>
                    <TrendingUp className="text-green-400" size={32} />
                  </div>
                </div>
              </div>

              {/* Live Activity */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Live Activity</h3>
                <div className="space-y-3">
                  {[
                    { player: 'Player_001', action: 'Big Win', amount: '$2,500', time: '2 minutes ago' },
                    { player: 'Player_042', action: 'Bonus Round', amount: '$850', time: '5 minutes ago' },
                    { player: 'Player_123', action: 'Jackpot', amount: '$15,000', time: '12 minutes ago' },
                  ].map((activity, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-700 rounded">
                      <div>
                        <span className="font-medium">{activity.player}</span> - {activity.action}
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-green-400 font-bold">{activity.amount}</span>
                        <span className="text-gray-400 text-sm">{activity.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-6">Core Game Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Target RTP (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      min="85"
                      max="98"
                      value={adminSettings.rtp}
                      onChange={(e) => handleSettingChange('rtp', parseFloat(e.target.value))}
                      className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Volatility</label>
                    <select
                      value={adminSettings.volatility}
                      onChange={(e) => handleSettingChange('volatility', e.target.value)}
                      className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="extreme">Extreme</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Max Multiplier</label>
                    <input
                      type="number"
                      step="100"
                      min="1000"
                      max="10000"
                      value={adminSettings.maxMultiplier}
                      onChange={(e) => handleSettingChange('maxMultiplier', parseInt(e.target.value))}
                      className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-6">Player Management</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">New Player RTP Boost (%)</label>
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      max="25"
                      value={adminSettings.newPlayerBoost}
                      onChange={(e) => handleSettingChange('newPlayerBoost', parseFloat(e.target.value))}
                      className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">VIP Player RTP (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      min="96"
                      max="99"
                      value={adminSettings.vipPlayerRTP}
                      onChange={(e) => handleSettingChange('vipPlayerRTP', parseFloat(e.target.value))}
                      className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2"
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="lossCompensation"
                      checked={adminSettings.lossStreakCompensation}
                      onChange={(e) => handleSettingChange('lossStreakCompensation', e.target.checked)}
                      className="mr-2"
                    />
                    <label htmlFor="lossCompensation" className="text-sm">Enable Loss Streak Compensation</label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Render current view
  const renderCurrentView = () => {
    switch (currentView) {
      case 'login':
        return <LoginPage />;
      case 'game':
        return <GamePage />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <LoginPage />;
    }
  };

  return <div className="font-sans">{renderCurrentView()}</div>;
};

export default CompleteSlotGameApp;