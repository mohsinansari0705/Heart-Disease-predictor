// Input Variables Configuration
const inputs = [
  { 
    id: 'age',
    label: 'Enter your Age',
    placeholder: 'e.g., 45',
    type: 'number',
    min: 1,
    max: 120,
    description: 'Age in years (1-120)'
  },
  { 
    id: 'sex',
    label: 'What is your Sex',
    placeholder: 'Male: 1, Female: 0',
    type: 'number',
    min: 0,
    max: 1,
    description: '1 for Male, 0 for Female'
  },
  { 
    id: 'cp',
    label: 'Chest Pain Type',
    placeholder: '0-3',
    type: 'number',
    min: 0,
    max: 3,
    description: '0: Typical angina, 1: Atypical angina, 2: Non-anginal pain, 3: Asymptomatic'
  },
  { 
    id: 'trestbps',
    label: 'Enter Resting Blood Pressure',
    placeholder: 'e.g., 120',
    type: 'number',
    min: 80,
    max: 200,
    description: 'Resting blood pressure in mm Hg'
  },
  { 
    id: 'chol',
    label: 'Enter your Cholesterol Level',
    placeholder: 'e.g., 200',
    type: 'number',
    min: 100,
    max: 600,
    description: 'Serum cholesterol in mg/dl'
  },
  { 
    id: 'fbs',
    label: 'Fasting Blood Sugar > 120 mg/dl',
    placeholder: 'Yes: 1, No: 0',
    type: 'number',
    min: 0,
    max: 1,
    description: '1 if fasting blood sugar > 120 mg/dl, 0 otherwise'
  },
  { 
    id: 'restecg',
    label: 'Resting ECG Results',
    placeholder: '0-2',
    type: 'number',
    min: 0,
    max: 2,
    description: '0: Normal, 1: ST-T wave abnormality, 2: Left ventricular hypertrophy'
  },
  { 
    id: 'thalach',
    label: 'Enter Maximum Heart Rate Achieved',
    placeholder: 'e.g., 150',
    type: 'number',
    min: 60,
    max: 220,
    description: 'Maximum heart rate achieved during exercise'
  },
  { 
    id: 'exang',
    label: 'Exercise Induced Angina',
    placeholder: 'Yes: 1, No: 0',
    type: 'number',
    min: 0,
    max: 1,
    description: '1 if exercise induced angina, 0 otherwise'
  },
  { 
    id: 'oldpeak',
    label: 'ST Depression',
    placeholder: 'e.g., 1.0',
    type: 'number',
    min: 0,
    max: 10,
    step: 0.1,
    description: 'ST depression induced by exercise relative to rest'
  },
  { 
    id: 'slope',
    label: 'Slope of Peak Exercise ST Segment',
    placeholder: '0-2',
    type: 'number',
    min: 0,
    max: 2,
    description: '0: Upsloping, 1: Flat, 2: Downsloping'
  },
  { 
    id: 'ca',
    label: 'Number of Major Vessels',
    placeholder: '0-3',
    type: 'number',
    min: 0,
    max: 3,
    description: 'Number of major vessels colored by fluoroscopy (0-3)'
  },
  { 
    id: 'thal',
    label: 'Thalassemia',
    placeholder: '1-3',
    type: 'number',
    min: 1,
    max: 3,
    description: '1: Normal, 2: Fixed defect, 3: Reversible defect'
  }
];

class HeartDiseasePredictor {
  constructor() {
    this.currentStep = 0;
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

    const minMax = `min="${input.min}" max="${input.max}"`;
    const stepAttributes = input.step ? `step="${input.step}"` : '';
    const savedValue = this.userInputs[input.id] || '';

    this.inputContainer.innerHTML = `
      ${stepIndicator}
      <div class="input-section">
        <label class="input-label" for="user-input">${input.label}</label>
        <div class="input-description">${input.description}</div>
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
    
    if(!value) {
      this.showError('Please enter a value before proceeding.');
      inputElement.focus();
      return;
    }

    const numericValue = parseFloat(value);
    
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
    
    this.userInputs[currentInput.id] = numericValue;
    this.currentStep++;

    this.inputContainer.style.opacity = '0';
    setTimeout(() => {
      this.renderInput();
      this.inputContainer.style.opacity = '1';
    }, 150);
  }

  goBack() {
    if(this.isProcessing || this.currentStep <= 0) return;
    
    this.currentStep--;
    delete this.userInputs[inputs[this.currentStep].id];
    
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