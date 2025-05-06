require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/api/whois', async (req, res) => {
    const { domain, type } = req.query;
    const apiKey = process.env.WHOIS_API_KEY;

    if (!domain || !type) {
        return res.status(400).json({ error: 'Domain and type are required' });
    }

    try {
        const response = await axios.get('https://www.whoisxmlapi.com/whoisserver/WhoisService', {
            params: {
                domainName: domain,
                apiKey: apiKey,
                outputFormat: 'JSON'
            }
        });

        const processHostnames = (hostnames = []) => {
            const joined = hostnames.join(', ');
            return joined.length > 25 ? joined.slice(0, 22) + '...' : joined;
        };

        const data = response.data.WhoisRecord;
        let result;

        if (type === 'domain') {
            result = {
                domainName: domain,
                registrar: data.registrarName || 'N/A',
                registrationDate: data.createdDate || 'N/A',
                expirationDate: data.expiresDate || 'N/A',
                estimatedDomainAge: data.estimatedDomainAge || 'N/A',
                hostnames: processHostnames(data.nameServers?.hostNames)
            };
        } else {
            result = {
                registrantName: data.registrant?.name || 'N/A',
                technicalContactName: data.technicalContact?.name || 'N/A',
                administrativeContactName: data.administrativeContact?.name || 'N/A',
                contactEmail: data.registrant?.email || 'N/A'
            };
        }

        res.json(result);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to fetch WHOIS data' });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));