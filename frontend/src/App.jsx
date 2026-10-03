import React, { useEffect, useState } from 'react';
import { getDecks, createDeck } from './services/api';

function App() {
  const [decks, setDecks] = useState([]);
  const [title, setTitle] = useState('');
  const [selectedDeck, setSelectedDeck] = useState(null); // Tracks which deck we are studying

  useEffect(() => {
    loadDecks();
  }, []);

  const loadDecks = async () => {
    try {
      const data = await getDecks();
      setDecks(data);
    } catch (error) {
      console.error('Failed to load decks', error);
    }
  };

  const handleCreateDeck = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      await createDeck({ title });
      setTitle('');
      loadDecks();
    } catch (error) {
      console.error('Failed to create deck', error);
    }
  };

  return (
    <div style={styles.container}>
      {/* Cute Bunny Header */}
      <header style={styles.header}>
        <div style={styles.bunnyAvatar}>🐰</div>
        <h1 style={styles.title}>Bunny's Flashcard Hop</h1>
        <p style={styles.subtitle}>Hop, learn, and grow your brain garden! 🌱🥕</p>
      </header>

      {/* Carrot Coins & Stats */}
      <div style={styles.statsContainer}>
        <div style={styles.carrotCard}>
          <h3>🥕 Carrots Earned</h3>
          <p style={styles.statNumber}>15</p>
        </div>
        <div style={styles.deckCountCard}>
          <h3>📚 Bunny Decks</h3>
          <p style={styles.statNumber}>{decks.length}</p>
        </div>
      </div>

      {/* If a deck is selected, show the Flashcard Study View */}
      {selectedDeck ? (
        <div style={styles.bunnyCard}>
          <button onClick={() => setSelectedDeck(null)} style={styles.backButton}>
            ⬅️ Back to Carrot Patches
          </button>
          <h2 style={{ color: '#be185d' }}>📖 Deck: {selectedDeck.title}</h2>
          <p style={{ color: '#64748b' }}>Here is where your bunny flashcards live! Ready to study?</p>
          
          <div style={styles.flashcardMock}>
            <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#831843' }}>Question: What is 2 + 2?</p>
            <p style={{ color: '#db2777', fontSize: '14px' }}>(Tap to flip card)</p>
          </div>
        </div>
      ) : (
        <>
          {/* Create New Deck Box */}
          <div style={styles.bunnyCard}>
            <h3 style={styles.cardTitle}>✨ Plant a New Deck</h3>
            <form onSubmit={handleCreateDeck} style={styles.form}>
              <input
                type="text"
                placeholder="e.g., Cute Vocabulary, Math Carrots..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={styles.input}
              />
              <button type="submit" style={styles.button}>Hop! 🥕</button>
            </form>
          </div>

          {/* Decks Grid */}
          <h2 style={styles.sectionHeading}>Your Carrot Patches (Decks)</h2>
          {decks.length === 0 ? (
            <p style={styles.emptyText}>No decks planted yet! Type above to grow your first one. 🌸</p>
          ) : (
            <div style={styles.grid}>
              {decks.map((deck, index) => (
                <div 
                  key={deck.id || index} 
                  style={styles.deckCard}
                  onClick={() => setSelectedDeck(deck)}
                >
                  <div style={styles.deckIcon}>📖</div>
                  <h4 style={styles.deckTitle}>{deck.title}</h4>
                  <p style={styles.deckSub}>Click to study! ✨</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

// Super cute pastel bunny styles with visible text input! 🎨
const styles = {
  container: {
    maxWidth: '650px',
    margin: '40px auto',
    padding: '25px',
    fontFamily: "'Comic Sans MS', 'Inter', sans-serif",
    backgroundColor: '#fff1f2',
    borderRadius: '30px',
    boxShadow: '0 12px 30px rgba(244, 63, 94, 0.15)',
    border: '4px solid #fbcfe8',
  },
  header: {
    textAlign: 'center',
    marginBottom: '25px',
  },
  bunnyAvatar: {
    fontSize: '50px',
    marginBottom: '5px',
  },
  title: {
    fontSize: '30px',
    color: '#be185d',
    margin: '0',
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#9f1239',
    fontSize: '14px',
    marginTop: '5px',
  },
  statsContainer: {
    display: 'flex',
    gap: '15px',
    marginBottom: '20px',
  },
  carrotCard: {
    flex: 1,
    backgroundColor: '#ffedd5',
    padding: '15px',
    borderRadius: '20px',
    textAlign: 'center',
    border: '2px solid #fed7aa',
    color: '#c2410c',
  },
  deckCountCard: {
    flex: 1,
    backgroundColor: '#dcfce7',
    padding: '15px',
    borderRadius: '20px',
    textAlign: 'center',
    border: '2px solid #bbf7d0',
    color: '#15803d',
  },
  statNumber: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '5px 0 0 0',
  },
  bunnyCard: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '20px',
    boxShadow: '0 6px 15px rgba(0, 0, 0, 0.05)',
    marginBottom: '25px',
    border: '2px solid #fbcfe8',
  },
  cardTitle: {
    margin: '0 0 12px 0',
    color: '#be185d',
    fontSize: '18px',
  },
  form: {
    display: 'flex',
    gap: '10px',
  },
  input: {
    flex: 1,
    padding: '12px 15px',
    borderRadius: '15px',
    border: '2px solid #f472b6',
    fontSize: '15px',
    outline: 'none',
    backgroundColor: '#fdf2f8',
    color: '#831843', // 👈 FIXED: Dark text color so you can see what you type!
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#ec4899',
    color: '#fff',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '15px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(236, 72, 153,.3)',
  },
  sectionHeading: {
    fontSize: '18px',
    color: '#831843',
    marginBottom: '15px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: '15px',
  },
  deckCard: {
    backgroundColor: '#ffffff',
    padding: '18px',
    borderRadius: '20px',
    border: '2px solid #fbcfe8',
    textAlign: 'center',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(0,0,0,0.03)',
  },
  deckIcon: {
    fontSize: '28px',
    marginBottom: '8px',
  },
  deckTitle: {
    margin: '0 0 5px 0',
    color: '#9d174d',
    fontSize: '15px',
  },
  deckSub: {
    margin: '0',
    color: '#db2777',
    fontSize: '11px',
  },
  emptyText: {
    color: '#9f1239',
    textAlign: 'center',
    padding: '15px',
    fontSize: '14px',
  },
  backButton: {
    backgroundColor: '#f1f5f9',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '10px',
    cursor: 'pointer',
    marginBottom: '10px',
    fontWeight: 'bold',
    color: '#475569',
  },
  flashcardMock: {
    backgroundColor: '#fff1f2',
    padding: '30px',
    borderRadius: '15px',
    textAlign: 'center',
    border: '2px dashed #f472b6',
    marginTop: '15px',
  },
};

export default App;