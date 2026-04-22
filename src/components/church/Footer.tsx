import logoFdv from "@/assets/logo-fdv.jpeg";
import { config } from "@/config";

const footerLinks = {
  "Se connecter": ["Culte du dimanche", "Honored For Christ", "Événements", "Contact"],
  "À propos": ["Notre histoire", "Le Pasteur", "Nos convictions", "Nous rejoindre"],
};

export const Footer = () => (
  <footer className="bg-primary py-16 px-6">
    <div className="mx-auto max-w-7xl">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src={logoFdv} alt="Logo Fontaine de Vie" className="h-12 w-12 rounded-full object-cover bg-primary-foreground" />
            <h3 className="text-xl font-bold text-primary-foreground">{config.eglise.nom}</h3>
          </div>
          <p className="text-sm text-primary-foreground/60 leading-relaxed mb-3">
            {config.eglise.verset}
          </p>
          <p className="text-xs text-accent">{config.eglise.reference_verset}</p>
          <p className="text-xs text-primary-foreground/40 mt-4">
            {config.pasteur.nom}
          </p>
        </div>

        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h4 className="text-caps text-accent mb-4">{title}</h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="golden-thread mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-primary-foreground/40">
          © {new Date().getFullYear()} Église Fontaine de Vie. Tous droits réservés.
        </p>
        <div className="flex gap-6">
          <a href="#" className="text-xs text-primary-foreground/40 hover:text-primary-foreground/60 transition-colors">Confidentialité</a>
          <a href="#" className="text-xs text-primary-foreground/40 hover:text-primary-foreground/60 transition-colors">Mentions légales</a>
        </div>
      </div>
    </div>
  </footer>
);
