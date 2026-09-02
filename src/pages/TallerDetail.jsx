import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { WORKSHOPS_DATA } from '../data/mockData';
import { ArrowLeft, Check, AlertCircle, RefreshCw, Award } from 'lucide-react';
import './TallerDetail.css';

export const TallerDetail = () => {
  const { id } = useParams();
  const workshop = WORKSHOPS_DATA.find(w => w.id === id) || WORKSHOPS_DATA[0];

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);

  const questions = [
    {
      id: 1,
      question: "¿Cuál es el componente principal para controlar la lógica en un circuito interactivo de Robótica?",
      options: ["Microcontrolador (ej. Arduino / Raspberry Pi)", "Condensador electrolítico", "Transformador trifásico", "Relé electromagnético"],
      correct: 0
    },
    {
      id: 2,
      question: "¿Qué tipo de señal emite un sensor digital de proximidad?",
      options: ["Señal analógica continua de 0 a 10V", "Estados binarios ALTO (HIGH) o BAJO (LOW)", "Señal de audio codificada", "Variación de frecuencia de 60Hz"],
      correct: 1
    },
    {
      id: 3,
      question: "¿Cuál es la función principal de la resistencia de protección en un LED?",
      options: ["Aumentar el brillo del LED al máximo", "Limitar la corriente para evitar que el LED se queme", "Generar calor en el circuito", "Convertir corriente continua a alterna"],
      correct: 1
    }
  ];

  const handleSelectOption = (qId, optionIdx) => {
    setSelectedAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correct) score += 1;
    });
    return Math.round((score / questions.length) * 100);
  };

  return (
    <div className="page-container">
      <Link to="/talleres" className="back-btn">
        <ArrowLeft size={18} />
        <span>Volver a Talleres</span>
      </Link>

      <div className="taller-activity-card glass-card">
        <div className="activity-header">
          <span className="badge badge-primary">{workshop.category}</span>
          <h2>{workshop.title} - Práctica Guiada</h2>
          <div className="progress-bar-track">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {!isCompleted ? (
          <div className="question-box">
            <div className="question-number">Pregunta {currentStep + 1} de {questions.length}</div>
            <h3 className="question-text">{questions[currentStep].question}</h3>

            <div className="options-list">
              {questions[currentStep].options.map((opt, idx) => {
                const isSelected = selectedAnswers[questions[currentStep].id] === idx;
                return (
                  <button
                    key={idx}
                    className={`option-button ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleSelectOption(questions[currentStep].id, idx)}
                  >
                    <span className="option-radio">{isSelected ? <Check size={14} /> : null}</span>
                    <span className="option-text">{opt}</span>
                  </button>
                );
              })}
            </div>

            <div className="activity-footer">
              <button 
                className="btn-primary" 
                disabled={selectedAnswers[questions[currentStep].id] === undefined}
                onClick={handleNext}
              >
                {currentStep === questions.length - 1 ? 'Finalizar Taller' : 'Siguiente Pregunta'}
              </button>
            </div>
          </div>
        ) : (
          <div className="result-box">
            <Award size={64} className="award-icon" />
            <h3>¡Taller Completado con Éxito!</h3>
            <p className="score-text">Tu calificación final es: <strong>{calculateScore()}%</strong></p>
            <p className="score-desc">Has demostrado un excelente dominio de los conceptos prácticos.</p>

            <div className="result-actions">
              <button className="btn-secondary" onClick={() => { setIsCompleted(false); setCurrentStep(0); setSelectedAnswers({}); }}>
                <RefreshCw size={16} />
                <span>Reintentar Taller</span>
              </button>
              <Link to="/progreso" className="btn-primary">
                <span>Ver Mi Progreso</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
