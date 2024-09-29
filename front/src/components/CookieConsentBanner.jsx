import React, { useState, useEffect } from 'react';
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
import { Link } from 'react-router-dom'; // Importa el componente Link de React Router

const CookieConsentBanner = () => {
    const [consent, setConsent] = useState(null);
    const [preferences, setPreferences] = useState({
        necessary: true, // Siempre habilitadas por ser necesarias
        analytics: false,
        marketing: false,
    });
    const [showPreferences, setShowPreferences] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    useEffect(() => {
        // Obtener el consentimiento y preferencias desde localStorage si están guardados
        const savedConsent = localStorage.getItem('cookieConsent');
        const savedPreferences = localStorage.getItem('cookiePreferences');
        if (savedConsent) {
            setConsent(savedConsent);
            setPreferences(JSON.parse(savedPreferences));
        }
        // Cargar GTM si ya se aceptaron las cookies
        if (savedConsent === 'accepted') {
            loadGTM();
        }
    }, []);

    const loadGTM = () => {
        (function (w, d, s, l, i) {
            w[l] = w[l] || [];
            w[l].push({
                'gtm.start': new Date().getTime(),
                event: 'gtm.js',
            });
            const f = d.getElementsByTagName(s)[0],
                j = d.createElement(s),
                dl = l != 'dataLayer' ? '&l=' + l : '';
            j.async = true;
            j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
            f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', 'GTM-NS82WX8K');
    };

    const handleAcceptAll = () => {
        const newPreferences = {
            necessary: true,
            analytics: true,
            marketing: true,
        };
        localStorage.setItem('cookieConsent', 'accepted');
        localStorage.setItem(
            'cookiePreferences',
            JSON.stringify(newPreferences)
        );
        setPreferences(newPreferences);
        setConsent('accepted');
        loadGTM(); // Cargar GTM tras aceptar todas las cookies
        window.location.reload(); // Recargar para activar las cookies.
    };

    const handleSavePreferences = () => {
        localStorage.setItem('cookieConsent', 'accepted');
        localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
        setConsent('accepted');
        setSnackbarOpen(true);
        setShowPreferences(false);
        // Cargar GTM si el usuario ha aceptado cookies analíticas
        if (preferences.analytics || preferences.marketing) {
            loadGTM();
        }
    };

    const handleDeclineAll = () => {
        const declinedPreferences = {
            necessary: true,
            analytics: false,
            marketing: false,
        };
        localStorage.setItem('cookieConsent', 'declined');
        localStorage.setItem(
            'cookiePreferences',
            JSON.stringify(declinedPreferences)
        );
        setConsent('declined');
        window.location.reload(); // Recargar para no activar las cookies
    };

    const togglePreferenceView = () => setShowPreferences(!showPreferences);

    if (consent !== null) return null; // No mostrar si ya se dio consentimiento.

    return (
        <>
            <Dialog open={consent === null} onClose={handleDeclineAll}>
                <DialogTitle>Consentimiento de Cookies</DialogTitle>
                <DialogContent sx={{ paddingBottom: '16px' }}>
                    <DialogContentText
                        sx={{
                            fontSize: '1rem', // Tamaño de texto normal para pantallas grandes
                            '@media (max-width:600px)': {
                                fontSize: '0.875rem', // Texto más pequeño en móviles
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
                                sx={{
                                    fontSize: '1rem',
                                    '@media (max-width:600px)': {
                                        fontSize: '0.875rem', // Texto más pequeño en móviles
                                    },
                                }}
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
                                sx={{
                                    fontSize: '1rem',
                                    '@media (max-width:600px)': {
                                        fontSize: '0.875rem', // Texto más pequeño en móviles
                                    },
                                }}
                            />
                        </>
                    )}
                    <DialogContentText
                        sx={{
                            fontSize: '1rem',
                            '@media (max-width:600px)': {
                                fontSize: '0.875rem', // Texto más pequeño en móviles
                            },
                        }}
                        className="mt-4"
                    >
                        Puedes leer más en nuestra{' '}
                        <Link
                            to="/politica-cookies"
                            style={{ color: '#1976d2', textDecoration: 'none' }}
                        >
                            Política de Cookies
                        </Link>
                        .
                    </DialogContentText>
                </DialogContent>
                <DialogActions
                    sx={{ justifyContent: 'center', paddingBottom: '24px' }}
                >
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
                                onClick={togglePreferenceView}
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
            {/* Cofirmar la elección */}
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
