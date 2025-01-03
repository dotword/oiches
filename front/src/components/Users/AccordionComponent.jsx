//Componente FAQs que ademas de reutilizable  en otras partes  de la aplicacion, segun el rol mostrara unas preguntas u otras

import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary, {
    accordionSummaryClasses,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `0px solid ${theme.palette.divider}`,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: '0.2px',
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&::before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={
            <ArrowForwardIosSharpIcon
                sx={{ fontSize: '0.9rem', color: '#9333FF' }}
            />
        }
        {...props}
    />
))(({ theme }) => ({
    backgroundColor: '#FFFFFF',
    flexDirection: 'row-reverse',
    padding: theme.spacing(0.5),
    [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
        {
            transform: 'rotate(90deg)',
        },
    [`& .${accordionSummaryClasses.content}`]: {
        marginLeft: theme.spacing(1),
    },
    color: '#333',
    fontWeight: 'normal',
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(0.5),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
    backgroundColor: 'white',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    color: '#666',
}));

export default function AccordionComponent({ faqs }) {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    // Función para convertir saltos de línea en <br />
    const formatAnswer = (answer) => {
        return answer.split('\n').map((item, index) => (
            <React.Fragment key={index}>
                {item}
                <br />
            </React.Fragment>
        ));
    };

    return (
        <div>
            {faqs.map((faq, index) => (
                <Accordion
                    expanded={expanded === `panel${index + 1}`}
                    onChange={handleChange(`panel${index + 1}`)}
                    key={index}
                >
                    <AccordionSummary
                        aria-controls={`panel${index + 1}d-content`}
                        id={`panel${index + 1}d-header`}
                    >
                        <Typography variant="h2" sx={{ fontSize: '1.1rem' }}>
                            {faq.question}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>{formatAnswer(faq.answer)}</Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
}
