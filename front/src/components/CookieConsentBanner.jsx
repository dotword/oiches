import { useState, useEffect } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    Checkbox,
    FormControlLabel,
    Snackbar,
    Alert,
} from '@mui/material';
import { Link } from 'react-router-dom';

const COOKIE_CONSENT_KEY = 'cookieConsent';
const COOKIE_PREFERENCES_KEY = 'cookiePreferences';

const CookieConsentBanner = () => {
    const [consent, setConsent] = useState(null);
    const [preferences, setPreferences] = useState({
        necessary: true, // Siempre habilitadas por ser necesarias
        analytics: false, // Analíticas (GTM y GA)
        marketing: false, // Marketing (ej. herramientas de marketing)
    });
    const [showPreferences, setShowPreferences] = useState(false); // Mostrar preferencias avanzadas
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    // useEffect para cargar preferencias y consentimiento desde localStorage al montar el componente
    useEffect(() => {
        try {
            const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
            const savedPreferences = JSON.parse(
                localStorage.getItem(COOKIE_PREFERENCES_KEY)
            ) || {
                necessary: true,
                analytics: false,
                marketing: false,
            };

            if (savedConsent) {
                setConsent(savedConsent);
                setPreferences(savedPreferences);
            }

            if (
                savedConsent === 'accepted' &&
                (savedPreferences.analytics || savedPreferences.marketing)
            ) {
                loadGTM();
            }
        } catch (error) {
            console.error('Error al acceder a localStorage:', error);
        }
    }, []); // Solo se ejecuta una vez al montar el componente

    const loadGTM = () => {
        if (document.getElementById('gtm-script')) return; // Evita cargar múltiples veces

        (function (w, d, s, l, i) {
            w[l] = w[l] || [];
            w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
            var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s),
                dl = l != 'dataLayer' ? '&l=' + l : '';
            j.async = true;
            j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
            j.id = 'gtm-script';
            f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', 'GTM-NS82WX8K');
    };

    const handleAcceptAll = () => {
        const allPreferences = {
            necessary: true,
            analytics: true,
            marketing: true,
        };
        saveConsent('accepted', allPreferences);
        loadGTM();
        setSnackbarOpen(true);
    };

    // Guardar preferencias seleccionadas por el usuario
    const handleSavePreferences = () => {
        saveConsent('accepted', preferences);
        if (preferences.analytics || preferences.marketing) loadGTM();
        setSnackbarOpen(true);
        setShowPreferences(false);
    };

    const handleDeclineAll = () => {
        const declinedPreferences = {
            necessary: true,
            analytics: false,
            marketing: false,
        };
        saveConsent('declined', declinedPreferences);
        setSnackbarOpen(true);
    };

    const saveConsent = (status, prefs) => {
        try {
            localStorage.setItem(COOKIE_CONSENT_KEY, status);
            localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(prefs));
        } catch (error) {
            console.error('Error al guardar en localStorage:', error);
        }
        setPreferences(prefs);
        setConsent(status);
    };

    // Si el consentimiento ya ha sido gestionado, no mostrar el banner
    if (consent !== null) return null;

    return (
        <>
            <Dialog open={consent === null} onClose={handleDeclineAll}>
                <DialogTitle>Consentimiento de Cookies</DialogTitle>
                <DialogContent sx={{ paddingBottom: '16px' }}>
                    <DialogContentText
                        sx={{
                            fontSize: '1rem',
                            '@media (max-width:600px)': {
                                fontSize: '0.875rem',
                            },
                        }}
                    >
                        Utilizamos cookies para mejorar tu experiencia en
                        nuestro sitio web. Puedes aceptar todas las cookies o
                        personalizar tus preferencias.
                    </DialogContentText>
                    {showPreferences && (
                        <>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={preferences.analytics}
                                        onChange={(e) =>
                                            setPreferences({
                                                ...preferences,
                                                analytics: e.target.checked,
                                            })
                                        }
                                    />
                                }
                                label="Cookies Analíticas"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={preferences.marketing}
                                        onChange={(e) =>
                                            setPreferences({
                                                ...preferences,
                                                marketing: e.target.checked,
                                            })
                                        }
                                    />
                                }
                                label="Cookies de Marketing"
                            />
                        </>
                    )}
                    <DialogContentText
                        sx={{
                            fontSize: '1rem',
                            '@media (max-width:600px)': {
                                fontSize: '0.875rem',
                            },
                        }}
                        className="mt-4"
                    >
                        Puedes leer más en nuestra{' '}
                        <Link
                            to="/politica-cookies"
                            target="_blank"
                            style={{
                                color: '#1976d2',
                                textDecoration: 'none',
                            }}
                        >
                            Política de Cookies
                        </Link>
                        .
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {showPreferences ? (
                        <>
                            <Button
                                onClick={handleSavePreferences}
                                variant="contained"
                                color="primary"
                            >
                                Guardar preferencias
                            </Button>
                            <Button
                                onClick={() => setShowPreferences(false)}
                                variant="outlined"
                            >
                                Cancelar
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                onClick={handleAcceptAll}
                                variant="contained"
                                color="primary"
                            >
                                Aceptar todas
                            </Button>
                            <Button
                                onClick={() => setShowPreferences(true)}
                                variant="outlined"
                            >
                                Preferencias
                            </Button>
                            <Button
                                onClick={handleDeclineAll}
                                variant="text"
                                color="secondary"
                            >
                                Rechazar
                            </Button>
                        </>
                    )}
                </DialogActions>
            </Dialog>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
            >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity="success"
                    sx={{ width: '100%' }}
                >
                    Preferencias de cookies guardadas.
                </Alert>
            </Snackbar>
        </>
    );
};

export default CookieConsentBanner;
