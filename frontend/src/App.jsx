import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [domain, setDomain] = useState('');
  const [infoType, setInfoType] = useState('domain');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!domain) return setError('Please enter a domain name');
    
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/whois`, {
        params: { domain, type: infoType }
      });
      
      setResult(response.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">WHOIS Lookup</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter domain (e.g., amazon.com)"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          />
          <select
            className="form-select"
            style={{ maxWidth: '200px' }}
            value={infoType}
            onChange={(e) => setInfoType(e.target.value)}
          >
            <option value="domain">Domain Info</option>
            <option value="contact">Contact Info</option>
          </select>
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {error && <div className="alert alert-danger">{error}</div>}

      {result && (
        <div className="card mt-3">
          <div className="card-body">
            {infoType === 'domain' ? (
              <table className="table">
                <tbody>
                  <tr><th>Domain Name</th><td>{result.domainName}</td></tr>
                  <tr><th>Registrar</th><td>{result.registrar}</td></tr>
                  <tr><th>Registration Date</th><td>{result.registrationDate}</td></tr>
                  <tr><th>Expiration Date</th><td>{result.expirationDate}</td></tr>
                  <tr><th>Estimated Age</th><td>{result.estimatedDomainAge} days</td></tr>
                  <tr><th>Hostnames</th><td>{result.hostnames}</td></tr>
                </tbody>
              </table>
            ) : (
              <table className="table">
                <tbody>
                  <tr><th>Registrant Name</th><td>{result.registrantName}</td></tr>
                  <tr><th>Technical Contact</th><td>{result.technicalContactName}</td></tr>
                  <tr><th>Admin Contact</th><td>{result.administrativeContactName}</td></tr>
                  <tr><th>Contact Email</th><td>{result.contactEmail}</td></tr>
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;