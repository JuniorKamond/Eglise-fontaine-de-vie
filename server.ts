import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialiser Resend avec la clé API (depuis .env)
const resendApiKey = process.env.VITE_RESEND_API_KEY;
if (!resendApiKey) {
  console.error('❌ ERREUR: La clé Resend (VITE_RESEND_API_KEY) n\'est pas configurée!');
  process.exit(1);
}

const resend = new Resend(resendApiKey);

// Route pour envoyer un email
app.post('/api/send-email', async (req, res) => {
  try {
    const { to, from_name, from_email, message } = req.body;

    console.log('📨 Requête reçue:', { to, from_name, from_email });

    if (!to || !from_name || !from_email || !message) {
      console.log('❌ Données manquantes!');
      return res.status(400).json({ error: 'Données manquantes' });
    }

    console.log('✉️ Envoi via Resend...');
    console.log('📧 De:', 'noreply@resend.dev');
    console.log('📧 À:', to);

    const result = await resend.emails.send({
      from: 'noreply@resend.dev', 
      to: to,
      subject: `Nouvelle demande de visite de ${from_name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Nouvelle demande de visite</h2>
          <p><strong>Nom:</strong> ${from_name}</p>
          <p><strong>Email:</strong> <a href="mailto:${from_email}">${from_email}</a></p>
          <p><strong>Objet:</strong></p>
          <p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
            ${message.replace(/\n/g, '<br>')}
          </p>
          <hr style="border: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #999; font-size: 12px;">Message envoyé depuis le formulaire de visite du site Église Fontaine de Vie.</p>
        </div>
      `,
    });

    console.log('📬 Réponse Resend:', JSON.stringify(result, null, 2));

    if (result.error) {
      console.error('❌ Erreur Resend:', JSON.stringify(result.error, null, 2));
      return res.status(500).json({ error: 'Erreur Resend: ' + JSON.stringify(result.error) });
    }

    console.log('✅ Email envoyé avec succès:', result.data?.id);
    res.json({ success: true, data: result.data });
  } catch (error: any) {
    console.error('❌ Erreur serveur complète:', error);
    console.error('Stack:', error.stack);
    res.status(500).json({ error: error.message || 'Erreur interne du serveur' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', server: 'API Resend' });
});

app.listen(port, () => {
  console.log(`✅ Serveur API sur http://localhost:${port}`);
  console.log(`📧 Service Resend activé`);
});
