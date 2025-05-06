# WHOIS Lookup Application

A full-stack application that provides domain and contact information using the WhoisXML API. Built with React frontend and Node.js/Express backend.

## Features

- Domain information lookup (registrar, dates, hostnames)
- Contact information lookup (registrant, technical/admin contacts)
- Responsive UI with error handling
- Clean tabular data presentation
- Automatic hostname truncation
- Loading states and user feedback

## Prerequisites

- Node.js (v14+)
- npm (v6+)
- WHOIS XML API key (free tier available)

## Installation

### Backend Setup
1. Clone the repository:
```bash
git clone https://github.com/Sudharsan-Velumani/WHOIS-Domain-Looup.git
cd whois-lookup-app/backend
```

2. Install dependencies:
```bash
npm install
```

3. Create .env file:
```bash
echo "WHOIS_API_KEY=your_api_key_here" > .env
```

### Frontend Setup
1. Navigate to frontend directory:
```bash
cd ../frontend
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

### Start Backend (from /backend directory):
```bash
npm start
```
Server will run on http://localhost:5000

### Start Frontend (from /frontend directory):
```bash
npm start
```
Application will open in browser at http://localhost:5173

## Configuration

### Obtain API Key:

- Register at WhoisXMLAPI
- Get your API key from account settings
- Add it to the .env file in the backend directory

### Environment Variables:

- Keep the .env file in your local development only
- Never commit sensitive information to version control

## Usage

- Enter a domain name (e.g., "amazon.com")
- Select information type (Domain/Contact)
- Click "Search"
- View results in formatted tables
- Switch between information types at any time

## Testing

Try these sample domains:

- amazon.com
- google.com
- wikipedia.org

## Deployment

### Local Deployment
Both backend and frontend should run simultaneously as per the running instructions.

### Production Deployment

**Backend:**

- Use process manager (PM2)
- Set environment variables in production environment
- Configure reverse proxy (Nginx/Apache)

**Frontend:**

Build production version:
```bash
npm run build
```
Deploy to static hosting (Netlify, Vercel, or S3)

## Project Structure

```
whois-lookup-app/
├── backend/
│   ├── index.js         # Backend server
│   ├── package.json
│   └── .env             # Environment variables
└── frontend/
    ├── public/
    ├── src/
    │   ├── App.js       # Main component
    │   ├── App.css      # Styling
    │   └── index.js     # React entry
    └── package.json
```

## Troubleshooting

- **CORS Errors**: Ensure backend is running and cors middleware is active
- **Empty Responses**: Verify API key is valid and properly set
- **Connection Issues**: Check both servers are running on correct ports

## Contributing

- Fork the repository
- Create feature branch
- Commit changes
- Push to branch
- Create Pull Request

## License

MIT License

---

> Replace `Sudharsan-Velumani` with your actual GitHub username
> Keep your API key secure and never commit it to version control
> Update license information if needed
