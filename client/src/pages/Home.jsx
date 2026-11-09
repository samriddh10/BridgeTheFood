// client/src/pages/Home.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user, logout } = useAuth();

  return (
    <div style={styles.container}>
      {/* Navigation Bar */}
      <nav style={styles.navbar}>
        <div style={styles.navContent}>
          <h2 style={styles.logo}>🍽️ Food Rescue</h2>
          <div style={styles.navLinks}>
            {user ? (
              <>
                <span style={styles.userName}>Welcome, {user.name}</span>
                {user.role === 'donor' && (
                  <Link to="/donor" style={styles.navLink}>
                    Dashboard
                  </Link>
                )}
                {user.role === 'receiver' && (
                  <Link to="/receiver" style={styles.navLink}>
                    Browse Food
                  </Link>
                )}
                <button onClick={logout} style={styles.logoutBtn}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" style={styles.navLink}>
                  Login
                </Link>
                <Link to="/register" style={styles.registerBtn}>
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>
            Connecting Hotels with Those in Need
          </h1>
          <p style={styles.heroSubtitle}>
            Help reduce food waste by donating surplus food to orphanages and charitable organizations in your area.
          </p>
          {!user && (
            <div style={styles.heroButtons}>
              <Link to="/register" style={styles.primaryBtn}>
                Join as Donor
              </Link>
              <Link to="/register" style={styles.secondaryBtn}>
                Join as Receiver
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.features}>
        <h2 style={styles.sectionTitle}>How It Works</h2>
        <div style={styles.featureGrid}>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>🏨</div>
            <h3 style={styles.featureTitle}>For Donors</h3>
            <p style={styles.featureText}>
              Hotels and restaurants can list surplus food with pickup details and expiry times.
            </p>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>📍</div>
            <h3 style={styles.featureTitle}>Geolocation</h3>
            <p style={styles.featureText}>
              Find available food within 5km radius using smart geospatial matching.
            </p>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>🏠</div>
            <h3 style={styles.featureTitle}>For Receivers</h3>
            <p style={styles.featureText}>
              Orphanages can browse and claim nearby food donations in real-time.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section style={styles.impact}>
        <div style={styles.impactContent}>
          <h2 style={styles.impactTitle}>Make a Difference Today</h2>
          <p style={styles.impactText}>
            Every meal counts. Join our community of donors and receivers working together to eliminate food waste and feed those in need.
          </p>
          <div style={styles.stats}>
            <div style={styles.stat}>
              <h3 style={styles.statNumber}>5km</h3>
              <p style={styles.statLabel}>Search Radius</p>
            </div>
            <div style={styles.stat}>
              <h3 style={styles.statNumber}>Real-time</h3>
              <p style={styles.statLabel}>Updates</p>
            </div>
            <div style={styles.stat}>
              <h3 style={styles.statNumber}>24/7</h3>
              <p style={styles.statLabel}>Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p style={styles.footerText}>
          © 2026 Food Rescue. Built with MERN Stack & Geospatial Technology.
        </p>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  navbar: {
    backgroundColor: '#2d3748',
    padding: '1rem 0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  navContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    color: '#fff',
    margin: 0,
    fontSize: '1.5rem',
  },
  navLinks: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center',
  },
  userName: {
    color: '#a0aec0',
    fontSize: '0.9rem',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    transition: 'background-color 0.3s',
  },
  registerBtn: {
    backgroundColor: '#48bb78',
    color: '#fff',
    textDecoration: 'none',
    padding: '0.5rem 1.5rem',
    borderRadius: '6px',
    fontWeight: '600',
    transition: 'background-color 0.3s',
  },
  logoutBtn: {
    backgroundColor: '#f56565',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1.5rem',
    borderRadius: '6px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  hero: {
    backgroundColor: '#4299e1',
    color: '#fff',
    padding: '5rem 2rem',
    textAlign: 'center',
  },
  heroContent: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  heroTitle: {
    fontSize: '3rem',
    marginBottom: '1rem',
    fontWeight: '700',
  },
  heroSubtitle: {
    fontSize: '1.25rem',
    marginBottom: '2rem',
    opacity: 0.9,
  },
  heroButtons: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  primaryBtn: {
    backgroundColor: '#fff',
    color: '#4299e1',
    textDecoration: 'none',
    padding: '1rem 2rem',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '1.1rem',
    transition: 'transform 0.3s',
  },
  secondaryBtn: {
    backgroundColor: 'transparent',
    color: '#fff',
    textDecoration: 'none',
    padding: '1rem 2rem',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '1.1rem',
    border: '2px solid #fff',
    transition: 'transform 0.3s',
  },
  features: {
    padding: '4rem 2rem',
    backgroundColor: '#f7fafc',
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: '2.5rem',
    marginBottom: '3rem',
    color: '#2d3748',
  },
  featureGrid: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem',
  },
  featureCard: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  featureIcon: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },
  featureTitle: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
    color: '#2d3748',
  },
  featureText: {
    color: '#4a5568',
    lineHeight: '1.6',
  },
  impact: {
    backgroundColor: '#2d3748',
    color: '#fff',
    padding: '4rem 2rem',
  },
  impactContent: {
    maxWidth: '900px',
    margin: '0 auto',
    textAlign: 'center',
  },
  impactTitle: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
  },
  impactText: {
    fontSize: '1.2rem',
    marginBottom: '3rem',
    opacity: 0.9,
  },
  stats: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: '2rem',
  },
  stat: {
    flex: '1',
    minWidth: '150px',
  },
  statNumber: {
    fontSize: '2.5rem',
    marginBottom: '0.5rem',
    color: '#48bb78',
  },
  statLabel: {
    fontSize: '1rem',
    opacity: 0.8,
  },
  footer: {
    backgroundColor: '#1a202c',
    color: '#a0aec0',
    padding: '2rem',
    textAlign: 'center',
    marginTop: 'auto',
  },
  footerText: {
    margin: 0,
  },
};

export default Home;