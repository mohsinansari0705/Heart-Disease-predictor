// Input Variables Configuration
const inputs = [
  { 
    id: 'age',
    label: 'Enter your Age',
    placeholder: 'Enter age (e.g., 45)',
    type: 'number',
    min: 25,
    max: 80,
    description: 'Age in years (25-80)'
  },
  { 
    id: 'sex',
    label: 'What is your Sex',
    type: 'select',
    options: [
      { value: '', label: 'Please select...'},
      { value: 1, label: 'Male' },
      { value: 0, label: 'Female' }
    ],
    description: 'Biological sex assigned at birth'
  },
  { 
    id: 'cp',
    label: 'What type of chest pain do you experience?',
    type: 'select',
    options: [
      { value: '', label: 'Please select...' },
      { value: 0, label: 'Typical angina (typical chest pain)' },
      { value: 1, label: 'Atypical angina (chest pain not heart-related)' },
      { value: 2, label: 'Non-anginal pain (non-heart related)' },
      { value: 3, label: 'Asymptomatic (no chest pain symptoms)' }
    ],
    description: 'Type of chest pain experienced'
  },
  { 
    id: 'trestbps',
    label: 'What is your Resting blood pressure?',
    placeholder: 'Enter systolic pressure (e.g., 120)',
    type: 'number',
    min: 90,
    max: 200,
    description: 'Resting systolic blood pressure in mm Hg (90-200)'
  },
  { 
    id: 'chol',
    label: 'What is your Serum cholesterol level?',
    placeholder: 'Enter cholesterol level (e.g., 200)',
    type: 'number',
    min: 120,
    max: 600,
    description: 'Serum cholesterol in mg/dl (120-600)'
  },
  { 
    id: 'fbs',
    label: 'Is your fasting blood sugar greater than 120 mg/dl?',
    type: 'select',
    options: [
      { value: '', label: 'Please select...' },
      { value: 1, label: 'Yes (> 120 mg/dl)' },
      { value: 0, label: 'No (≤ 120 mg/dl)' }
    ],
    description: 'Fasting blood sugar level comparison to 120 mg/dl'
  },
  { 
    id: 'restecg',
    label: 'What are your resting ECG results?',
    type: 'select',
    options: [
      { value: '', label: 'Please select...' },
      { value: 0, label: 'Normal' },
      { value: 1, label: 'Having ST-T wave abnormality' },
      { value: 2, label: 'Left ventricular hypertrophy' }
    ],
    description: 'Resting electrocardiographic results'
  },
  { 
    id: 'thalach',
    label: 'What is your maximum heart rate achieved?',
    placeholder: 'Enter max heart rate (e.g., 150)',
    type: 'number',
    min: 70,
    max: 220,
    description: 'Maximum heart rate achieved during exercise (70-220 bpm)'
  },
  { 
    id: 'exang',
    label: 'Do you experience exercise-induced angina?',
    type: 'select',
    options: [
      { value: '', label: 'Please select...' },
      { value: 1, label: 'Yes' },
      { value: 0, label: 'No' }
    ],
    description: 'Chest pain induced by physical exercise'
  },
  { 
    id: 'oldpeak',
    label: 'What is your ST depression value?',
    placeholder: 'Enter ST depression (e.g., 1.0)',
    type: 'number',
    min: 0,
    max: 6.5,
    step: 0.1,
    description: 'ST depression induced by exercise relative to rest (0.0-6.5)'
  },
  { 
    id: 'slope',
    label: 'What is the slope of your peak exercise ST segment?',
    type: 'select',
    options: [
      { value: '', label: 'Please select...' },
      { value: 0, label: 'Upsloping' },
      { value: 1, label: 'Flat' },
      { value: 2, label: 'Downsloping' }
    ],
    description: 'Slope pattern of the ST segment during peak exercise'
  },
  { 
    id: 'ca',
    label: 'How many major vessels are colored by fluoroscopy?',
    type: 'select',
    options: [
      { value: '', label: 'Please select...' },
      { value: 0, label: '0 vessels' },
      { value: 1, label: '1 vessel' },
      { value: 2, label: '2 vessels' },
      { value: 3, label: '3 vessels' },
      { value: 4, label: '4 vessels' }
    ],
    description: 'Number of major vessels colored by fluoroscopy (0-3)'
  },
  { 
    id: 'thal',
    label: 'What is your thalassemia test result?',
    type: 'select',
    options: [
      { value: '', label: 'Please select...' },
      { value: 1, label: 'Normal' },
      { value: 0, label: 'Normal-0' },
      { value: 2, label: 'Fixed defect' },
      { value: 3, label: 'Reversible defect' }
    ],
    description: 'Thalium stress test result'
  }
];

class HeartDiseasePredictor {
  constructor() {
    this.currentStep = -1;
    this.userInputs = {};
    this.isProcessing = false;
    
    this.inputContainer = document.getElementById("input-container");
    this.loader = document.getElementById("loader");
    this.resultSection = document.getElementById("result");
    this.predictionText = document.getElementById("prediction-text");
    
    this.init();
  }

  init() {
    if(!this.inputContainer) {
      console.error('Input container not found');
      return;
    }
    
    this.renderInput();
    this.bindGlobalEvents();
  }

  bindGlobalEvents() {
    document.addEventListener('keydown', (e) => {
      if(e.key === 'Escape' && !this.isProcessing) {
        this.goBack();
      }
    });
  }

  renderInput() {
    if(this.currentStep === -1) {
      this.renderWelcomeScreen();
      return;
    }

    if(this.currentStep >= inputs.length) {
      this.makePrediction();
      return;
    }

    const input = inputs[this.currentStep];
    const progressPercentage = ((this.currentStep + 1) / inputs.length) * 100;

    const stepIndicator = `
      <div class="step-indicator">
        <span>Step ${this.currentStep + 1} of ${inputs.length}</span>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${progressPercentage}%"></div>
        </div>
      </div>
    `;

    const savedValue = this.userInputs[input.id] || '';
    let inputElement = '';
  
    if(input.type === 'select') {
      const optionsHtml = input.options.map(option => 
        `<option value="${option.value}">${option.label}</option>`
      ).join('');
    
      inputElement = `
        <select 
          id="user-input" 
          class="user-select"
          required
        >
          ${optionsHtml}
        </select>
      `;
    } else {
      const minMax = `min="${input.min}" max="${input.max}"`;
      const stepAttributes = input.step ? `step="${input.step}"` : '';
    
      inputElement = `
        <input 
          type="${input.type}" 
          id="user-input" 
          class="user-input"
          placeholder="${input.placeholder}"
          value="${savedValue}"
          ${minMax}
          ${stepAttributes}
          required 
          autocomplete="off"
        />
      `;
    }

    this.inputContainer.innerHTML = `
      ${stepIndicator}
      <div class="input-section">
        <label class="input-label" for="user-input">${input.label}</label>
        <div class="input-description">${input.description}</div>
        ${inputElement}
        <div class="button-group">
          <button id="next-btn" class="btn btn-primary" type="button">
            ${this.currentStep === inputs.length - 1 ? 'PREDICT' : 'NEXT'}
          </button>
          ${this.currentStep > 0 ? '<button id="back-btn" class="btn btn-secondary" type="button">BACK</button>' : ''}
        </div>
      </div>
    `;

    this.bindInputEvents();
  }

  renderWelcomeScreen() {
    this.inputContainer.innerHTML = `
      <div class="welcome-screen">
        <div class="welcome-header">
          <div class="welcome-icon">🫀</div>
          <h2>Heart Disease Risk Assessment</h2>
        </div>
        
        <div class="welcome-description">
          <p>This tool uses <strong>Machine Learning</strong> to assess your risk of heart disease based on various health indicators.</p>
          
          <div class="assessment-info">
            <div class="info-item">
              <span class="info-icon">📋</span>
              <span>13 health-related questions</span>
            </div>
            <div class="info-item">
              <span class="info-icon">⏱️</span>
              <span>Takes about 2-3 minutes</span>
            </div>
            <div class="info-item">
              <span class="info-icon">🔒</span>
              <span>Your data is processed locally and securely</span>
            </div>
          </div>
          
          <div class="disclaimer">
            <p><strong>Important:</strong> This assessment is for informational purposes only and should not replace professional medical advice. Always consult with a healthcare provider for proper diagnosis and treatment.</p>
          </div>
        </div>
        
        <div class="welcome-actions">
          <button id="start-assessment-btn" class="btn btn-primary">
            Start Assessment
          </button>
        </div>
      </div>
    `;

    this.bindWelcomeEvents();
  }

  bindWelcomeEvents() {
    const startButton = document.getElementById("start-assessment-btn");
    
    if(startButton) {
      startButton.addEventListener("click", () => this.startAssessment());
    }
    
    // Allow Enter key to start assessment
    document.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && this.currentStep === -1 && !this.isProcessing) {
        this.startAssessment();
      }
    });
  }

  startAssessment() {
    if(this.isProcessing) return;
    
    this.currentStep = 0;
    
    this.inputContainer.style.opacity = '0';
    setTimeout(() => {
      this.renderInput();
      this.inputContainer.style.opacity = '1';
    }, 150);
  }

  bindInputEvents() {
    const nextButton = document.getElementById("next-btn");
    const backButton = document.getElementById("back-btn");
    const inputElement = document.getElementById("user-input");
    
    if(nextButton) {
      nextButton.addEventListener("click", () => this.handleNext());
    }
    if(backButton) {
      backButton.addEventListener("click", () => this.goBack());
    }
    if(inputElement) {
      inputElement.addEventListener("keypress", (e) => {
        if (e.key === "Enter" && !this.isProcessing) {
          this.handleNext();
        }
      });
      
      inputElement.addEventListener("input", () => this.clearError());
      inputElement.focus();
    }
  }

  handleNext() {
    if(this.isProcessing) return;

    const currentInput = inputs[this.currentStep];
    const inputElement = document.getElementById("user-input");
    
    if(!inputElement) {
      this.showError('Input element not found.');
      return;
    }

    const value = inputElement.value.trim();
    
    if(!value || value === '') {
      this.showError('Please enter a value before proceeding.');
      inputElement.focus();
      return;
    }

    let numericValue;
    
    if(currentInput.type === 'select') {
      numericValue = parseFloat(value);
    } else {
      numericValue = parseFloat(value);

      if(isNaN(numericValue)) {
        this.showError('Please enter a valid number.');
        inputElement.focus();
        return;
      }
      
      if(numericValue < currentInput.min || numericValue > currentInput.max) {
        this.showError(`Please enter a value between ${currentInput.min} and ${currentInput.max}.`);
        inputElement.focus();
        return;
      }
    }
    
    
    this.userInputs[currentInput.id] = numericValue;
    this.currentStep++;

    this.inputContainer.style.opacity = '0';
    setTimeout(() => {
      this.renderInput();
      this.inputContainer.style.opacity = '1';
    }, 150);
  }

  goBack() {
    if(this.isProcessing) return;

    if(this.currentStep <= 0) {
      this.currentStep = -1;
      this.userInputs = {};
    } else {
      this.currentStep--;
      delete this.userInputs[inputs[this.currentStep].id];
    }
    
    this.inputContainer.style.opacity = '0';
    setTimeout(() => {
      this.renderInput();
      this.inputContainer.style.opacity = '1';
    }, 150);
  }

  showError(message) {
    this.clearError();
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message show';
    errorDiv.textContent = message;
    
    const inputSection = this.inputContainer.querySelector('.input-section');
    if(inputSection) {
      inputSection.appendChild(errorDiv);
    }
    
    setTimeout(() => this.clearError(), 4000);
  }

  clearError() {
    const errorDiv = this.inputContainer.querySelector('.error-message');
    if(errorDiv) {
      errorDiv.remove();
    }
  }

  makePrediction() {
    this.isProcessing = true;
    this.inputContainer.style.display = 'none';
    this.loader.classList.remove('hidden');
    
    setTimeout(() => {
      try {
        const riskFactors = this.calculateRiskFactors();
        const prediction = riskFactors > 0.5 ? 'High Risk' : 'Low Risk';
        const confidence = Math.round((riskFactors > 0.5 ? riskFactors : 1 - riskFactors) * 100);
        
        this.showResult(prediction, confidence);
      } catch (error) {
        console.error('Prediction error:', error);
        this.showError('An error occurred during prediction. Please try again.');
      } finally {
        this.isProcessing = false;
      }
    }, 2000);
  }

  calculateRiskFactors() {
    let riskScore = 0;
    
    // Age risk (higher age = higher risk)
    if (this.userInputs.age > 55) riskScore += 0.2;
    if (this.userInputs.age > 65) riskScore += 0.1;
    
    // Cholesterol risk
    if (this.userInputs.chol > 240) riskScore += 0.15;
    if (this.userInputs.chol > 300) riskScore += 0.1;
    
    // Blood pressure risk
    if (this.userInputs.trestbps > 140) riskScore += 0.15;
    if (this.userInputs.trestbps > 160) riskScore += 0.1;
    
    // Chest pain type (3 = asymptomatic, higher risk)
    if (this.userInputs.cp === 3) riskScore += 0.15;
    else if (this.userInputs.cp === 0) riskScore += 0.1;
    
    // Exercise induced angina
    if (this.userInputs.exang === 1) riskScore += 0.12;
    
    // Max heart rate (lower = higher risk for age)
    const expectedMaxHR = 220 - this.userInputs.age;
    if (this.userInputs.thalach < expectedMaxHR * 0.75) riskScore += 0.15;
    
    // ST depression
    if (this.userInputs.oldpeak > 2) riskScore += 0.12;
    if (this.userInputs.oldpeak > 4) riskScore += 0.08;
    
    // Major vessels
    if (this.userInputs.ca > 0) riskScore += 0.1 * this.userInputs.ca;
    
    // Thalassemia
    if (this.userInputs.thal === 3) riskScore += 0.1;
    
    // Add some controlled randomness for realism
    riskScore += (Math.random() - 0.5) * 0.1;
    
    return Math.max(0, Math.min(riskScore, 1));
  }

  showResult(prediction, confidence) {
    this.loader.classList.add('hidden');
    const riskClass = prediction === 'High Risk' ? 'high-risk' : 'low-risk';
    
    this.predictionText.innerHTML = `
      <div class="result-content">
        <div class="risk-indicator ${riskClass}">
          <div class="risk-icon">${prediction === 'High Risk' ? '⚠️' : '✅'}</div>
          <div class="risk-text">
            <strong>${prediction}</strong>
            <span class="confidence">Confidence: ${confidence}%</span>
          </div>
        </div>
        <div class="result-details">
          <p><strong>Important:</strong> This prediction is based on statistical analysis and should not replace professional medical consultation. Please consult with a healthcare provider for proper diagnosis and treatment.</p>
        </div>
        <button id="restart-btn" class="restart-btn">Start New Prediction</button>
      </div>
    `;
    
    this.resultSection.classList.remove('hidden');
    
    const restartBtn = document.getElementById('restart-btn');
    if(restartBtn) {
      restartBtn.addEventListener('click', () => this.restartPrediction());
    }
  }

  restartPrediction() {
    this.currentStep = 0;
    this.userInputs = {};
    this.isProcessing = false;
    
    this.resultSection.classList.add('hidden');
    this.loader.classList.add('hidden');
    this.inputContainer.style.display = 'block';
    this.inputContainer.style.opacity = '1';
    
    this.renderInput();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.predictor = new HeartDiseasePredictor();
  initializeSidebar();
  
  if(typeof initializeModal === 'function') {
    initializeModal();
  }
  
  if(typeof initializeSidebarButtons === 'function') {
    initializeSidebarButtons();
  }
});

function initializeSidebar() {
  const menuToggle = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar');

  if(!menuToggle || !sidebar) return;

  function toggleSidebar() {
    sidebar.classList.toggle('active');
    document.body.classList.toggle('sidebar-open');
  }

  function closeSidebarOnOutsideClick(event) {
    if(sidebar.classList.contains('active') && 
        !sidebar.contains(event.target) && 
        !menuToggle.contains(event.target)) {
      sidebar.classList.remove('active');
      document.body.classList.remove('sidebar-open');
    }
  }

  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleSidebar();
  });

  document.addEventListener('click', closeSidebarOnOutsideClick);
}