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

const CookieConsentBanner = () => {
    const [consent, setConsent] = useState(null);
    const [preferences, setPreferences] = useState({
        necessary: true, // Siempre habilitadas por ser necesarias
        analytics: false, // Analiticas GMT
        marketing: false, // las de marketing, cuando implementemos sendmail (lsitas de correo) ads etc...
    });
    const [showPreferences, setShowPreferences] = useState(false); // mostrar preferencias avanzadas
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    // useEffect para cargar preferencias y consentimiento desde localStorage al montar el componente evitamso el bucle
    useEffect(() => {
        const savedConsent = localStorage.getItem('cookieConsent');
        const savedPreferences = JSON.parse(
            localStorage.getItem('cookiePreferences')
        ) || {
            necessary: true,
            analytics: false,
            marketing: false,
        };
        // Cargar Google Tag Manager si el consentimiento fue dado para cookies analíticas o de marketing

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
    }, []); // Solo se ejecuta una vez al montar el componente

    const loadGTM = () => {
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtm.js?id=GTM-NS82WX8K';
        document.head.appendChild(script);
    };

    const handleAcceptAll = () => {
        const allPreferences = {
            necessary: true,
            analytics: true,
            marketing: true,
        };
        saveConsent('accepted', allPreferences);
        loadGTM();
        window.location.reload();
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
        window.location.reload();
    };

    const saveConsent = (status, prefs) => {
        localStorage.setItem('cookieConsent', status);
        localStorage.setItem('cookiePreferences', JSON.stringify(prefs));
        setPreferences(prefs);
        setConsent(status);
    };

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
                        Usamos cookies para mejorar tu experiencia. ¿Aceptas el
                        uso de todas las cookies o deseas ajustar tus
                        preferencias?
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
                            style={{ color: '#1976d2', textDecoration: 'none' }}
                        >
                            Política de Cookies
                        </Link>
                        .
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {showPreferences ? (
                        <Button
                            onClick={handleSavePreferences}
                            variant="contained"
                            color="primary"
                        >
                            Guardar preferencias
                        </Button>
                    ) : (
                        <>
                            <Button
                                onClick={handleAcceptAll}
                                variant="contained"
                                color="primary"
                            >
                                Aceptar
                            </Button>
                            <Button
                                onClick={() => setShowPreferences(true)}
                                variant="outlined"
                            >
                                Preferencias
                            </Button>
                            <Button
                                onClick={handleDeclineAll}
                                variant="contained"
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
                >
                    Preferencias de cookies guardadas.
                </Alert>
            </Snackbar>
        </>
    );
};

export default CookieConsentBanner;
