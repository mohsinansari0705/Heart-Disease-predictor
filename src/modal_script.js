// ----- Modal Functionality -----
function initializeModal() {
  const modalOverlay = document.getElementById('modal-overlay');
  const modalClose = document.getElementById('modal-close');

  modalClose.addEventListener('click', closeModal);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });
}

function openModal(title, content) {
  const modalOverlay = document.getElementById('modal-overlay');
  const modalTitle = document.getElementById('modal-title');
  const modalContent = document.getElementById('modal-content');

  modalTitle.textContent = title;
  modalContent.innerHTML = content;
  modalOverlay.classList.remove('hidden');
  
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modalOverlay = document.getElementById('modal-overlay');
  modalOverlay.classList.add('hidden');

  document.body.style.overflow = 'auto';
}
// ----- /Modal Functionality -----

// ----- Sidebar Button Content -----
function initializeSidebarButtons() {
  const buttons = [
    {
      id: 'view-data',
      title: 'View Source Data',
      content: getSourceDataContent()
    },
    {
      id: 'view-dataset',
      title: 'About Dataset',
      content: getDatasetContent()
    },
    {
      id: 'view-notebook',
      title: 'View Jupyter Notebook',
      content: getNotebookContent()
    },
    {
      id: 'view-metrics',
      title: 'View Evaluation Metrics',
      content: getMetricsContent()
    },
    {
      id: 'view-details',
      title: 'Project Details',
      content: getProjectDetailsContent()
    }
  ];

  buttons.forEach(button => {
    const element = document.getElementById(button.id);
    if (element) {
      element.addEventListener('click', () => {
        openModal(button.title, button.content);
      });
    }
  });
}
// ----- /Sidebar Button Content -----

// ----- View Source Data ------
function getSourceDataContent() {
  return `
    <h3>Heart Disease Classification Dataset</h3>
    <p>This dataset contains various medical attributes used to predict heart disease risk. The data includes only numerical features that are commonly used in cardiovascular health assessment.</p>
    
    <h3>Data Preview</h3>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>age</th>
          <th>sex</th>
          <th>cp</th>
          <th>trestbps</th>
          <th>chol</th>
          <th>fbs</th>
          <th>restecg</th>
          <th>thalach</th>
          <th>exang</th>
          <th>oldpeak</th>
          <th>slope</th>
          <th>ca</th>
          <th>thal</th>
          <th>target</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>0</td>
          <td>63</td>
          <td>1</td>
          <td>3</td>
          <td>145</td>
          <td>233</td>
          <td>1</td>
          <td>0</td>
          <td>150</td>
          <td>0</td>
          <td>2.3</td>
          <td>0</td>
          <td>0</td>
          <td>1</td>
          <td>1</td>
        </tr>
        <tr>
          <td>1</td>
          <td>37</td>
          <td>1</td>
          <td>2</td>
          <td>130</td>
          <td>250</td>
          <td>0</td>
          <td>1</td>
          <td>187</td>
          <td>0</td>
          <td>3.5</td>
          <td>0</td>
          <td>0</td>
          <td>2</td>
          <td>1</td>
        </tr>
        <tr>
          <td>2</td>
          <td>41</td>
          <td>0</td>
          <td>1</td>
          <td>130</td>
          <td>204</td>
          <td>0</td>
          <td>0</td>
          <td>172</td>
          <td>0</td>
          <td>1.4</td>
          <td>2</td>
          <td>0</td>
          <td>2</td>
          <td>1</td>
        </tr>
        <tr>
          <td>3</td>
          <td>56</td>
          <td>1</td>
          <td>1</td>
          <td>120</td>
          <td>236</td>
          <td>0</td>
          <td>1</td>
          <td>178</td>
          <td>0</td>
          <td>0.8</td>
          <td>2</td>
          <td>0</td>
          <td>2</td>
          <td>1</td>
        </tr>
        <tr>
          <td>4</td>
          <td>57</td>
          <td>0</td>
          <td>0</td>
          <td>120</td>
          <td>354</td>
          <td>0</td>
          <td>1</td>
          <td>163</td>
          <td>1</td>
          <td>0.6</td>
          <td>2</td>
          <td>0</td>
          <td>2</td>
          <td>1</td>
        </tr>
      </tbody>
    </table>
    
    <p><strong>Total Records:</strong> 303 patients</p>
    <p><strong>Target Variable:</strong> Heart disease presence (0 = no disease, 1 = disease)</p>
    
    <a href="../heart disease classification/data/heart_disease.csv" class="btn" target="_blank">Download Dataset</a>
  `;
}
// ----- /View Source Data -----

// ----- About Dataset -----
function getDatasetContent() {
  return `
    <h3>Heart Disease Dataset Information</h3>
    <p>This dataset is one of the most popular datasets used for heart disease prediction and classification tasks. The original data came from the <a href="https://archive.ics.uci.edu/dataset/45/heart+disease" target="_blank">Cleveland Clinic Foundation</a> from UCI Machine Learning Repository and contains 76 attributes, but all published experiments refer to using a subset of 14 of them.<br>Howevever, we've downloaded it in a formatted way from <a href="https://www.kaggle.com/datasets/sumaiyatasmeem/heart-disease-classification-dataset" target="_blank">Kaggle</a>.</p>
    
    <h3>Feature Descriptions</h3>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Feature</th>
          <th>Description</th>
          <th>Example Values</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td><strong>age</strong></td>
          <td>Age of the patient in years</td>
          <td>29, 45, 60</td>
        </tr>
        <tr>
          <td>2</td>
          <td><strong>sex</strong></td>
          <td>Gender of the patient</td>
          <td>1 = male; 0 = female</td>
        </tr>
        <tr>
          <td>3</td>
          <td><strong>cp</strong></td>
          <td>Chest pain type</td>
          <td>
            <ul>
              <li>0: Typical angina (chest pain)</li>
              <li>1: Atypical angina (chest pain not related to heart)</li>
              <li>2: Non-anginal pain (typically esophageal spasms (non heart related))</li>
              <li>3: Asymptomatic (chest pain not showing signs of disease)</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>4</td>
          <td><strong>trestbps</strong></td>
          <td>Resting blood pressure (in mm Hg on admission to the hospital)</td>
          <td>120, 140, 150</td>
        </tr>
        <tr>
          <td>5</td>
          <td><strong>chol</strong></td>
          <td>Serum cholesterol in mg/dl</td>
          <td>180, 220, 250</td>
        </tr>
        <tr>
          <td>6</td>
          <td><strong>fbs</strong></td>
          <td>Fasting blood sugar > 120 mg/dl</td>
          <td>1 = true; 0 = false</td>
        </tr>
        <tr>
          <td>7</td>
          <td><strong>restecg</strong></td>
          <td>Resting electrocardiographic results</td>
          <td>
            <ul>
              <li>0: Normal (Nothing to note)</li>
              <li>1: Having ST-T wave abnormality</li>
              <li>2: left ventricular hypertrophy</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>8</td>
          <td><strong>thalach</strong></td>
          <td>Maximum heart rate achieved</td>
          <td>160, 180, 190</td>
        </tr>
        <tr>
          <td>9</td>
          <td><strong>exang</strong></td>
          <td>Exercise induced angina</td>
          <td>1 = yes; 0 = no</td>
        </tr>
        <tr>
          <td>10</td>
          <td><strong>oldpeak</strong></td>
          <td>ST depression (heart potentially not getting enough oxygen) induced by exercise relative to rest</td>
          <td>0.5, 1.0, 2.0</td>
        </tr>
        <tr>
          <td>11</td>
          <td><strong>slope</strong></td>
          <td>Slope of the peak exercise ST segment</td>
          <td>
            <ul>
              <li>0: Upsloping</li>
              <li>1: Flatsloping</li>
              <li>2: Downsloping</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>12</td>
          <td><strong>ca</strong></td>
          <td>Number of major vessels (0-3) colored by fluoroscopy</td>
          <td>0, 1, 2, 3, 4</td>
        </tr>
        <tr>
          <td>13</td>
          <td><strong>thal</strong></td>
          <td>Thalium stress result</td>
          <td>
            <ul>
              <li>1: Normal</li>
              <li>3: Normal</li>
              <li>6: Fixed defect</li>
              <li>7: Reversible defect</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>14</td>
          <td><strong>target</strong></td>
          <td>Heart disease diagnosis</td>
          <td>0 = no disease,<br> 1 = disease present</td>
        </tr>
      </tbody>
    </table>
    
    <h3>Target Variable</h3>
    <p><strong>target:</strong> Heart disease diagnosis (0 = no disease, 1 = disease present)</p>
    
    <h3>Dataset Statistics</h3>
    <ul>
      <li>Total samples: 303</li>
      <li>Features: 13</li>
      <li>Missing values: None</li>
      <li>Class distribution: Balanced (approximately 54.4-45.5)</li>
    </ul>
  `;
}
// ----- /About Dataset -----

// ----- View Jupyter Notebook -----
function getNotebookContent() {
  return `
    <div class="notebook-container">
      <div class="notebook-header">
        <h3>Heart Disease Classification - Complete Analysis</h3>
        <p>end_to_end_heart_disease_classification.ipynb</p>
        <div class="notebook-actions">
          <a href="https://github.com/mohsinansari0705/Heart-Disease-predictor/blob/main/heart%20disease%20classification/end_to_end_heart_disease_classification_tuet.ipynb" class="btn" target="_blank">View on GitHub</a>
        </div>
      </div>
      <div id="notebook-content" class="notebook-content">
        <iframe 
          src="https://nbviewer.jupyter.org/github/mohsinansari0705/Heart-Disease-predictor/blob/main/heart%20disease%20classification/end_to_end_heart_disease_classification_tuet.ipynb?flush_cache=true" 
          width="100%" 
          height="700px" 
          frameborder="0"
          style="border-radius: 6px; background: white;">
        </iframe>
      </div>
    </div>
  `;
}
// ----- /View Jupyter Notebook -----

// ----- View Evaluation Metrics -----
function getMetricsContent() {
  return `
    <h3>Model Performance Metrics</h3>
    <p>Our logistic regression model has been trained and evaluated using various performance metrics to ensure reliable heart disease prediction.</p>
    
    <h3>Primary Metrics</h3>
    <table>
      <thead>
        <tr>
          <th>Metric</th>
          <th>Score</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Accuracy</td>
          <td>88.52%</td>
          <td>Overall correct predictions</td>
        </tr>
        <tr>
          <td>Precision</td>
          <td>82.15%</td>
          <td>True positive rate among positive predictions</td>
        </tr>
        <tr>
          <td>Recall</td>
          <td>92.72%</td>
          <td>True positive rate among actual positives</td>
        </tr>
        <tr>
          <td>F1-Score</td>
          <td>87.05%</td>
          <td>Harmonic mean of precision and recall</td>
        </tr>
      </tbody>
    </table>
    
    <h3>Cross-Validation Results</h3>
    <ul>
      <li><strong>5-Fold CV Accuracy:</strong> 84.79% ± 3.7%</li>
      <li><strong>Consistency Score:</strong> High (low variance across folds)</li>
      <li><strong>Overfitting Check:</strong> Minimal (train vs. validation gap < 2%)</li>
    </ul>
    
    <h3>Feature Importance</h3>
    <ol>
      <li>Sex (sex) - 18.0%</li>
      <li>Chest Pain Type (cp) - 13.4%</li>
      <li>Thalium stress result (thal) - 13.9%</li>
      <li>Exercise Induced Angina (exang) - 12.5%</li>
      <li>ST Depression (oldpeak) - 11.4%</li>
    </ol>
    
    <h3>Confusion Matrix</h3>
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Predicted: No Disease</th>
          <th>Predicted: Disease</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Actual: No Disease</strong></td>
          <td>25</td>
          <td>4</td>
        </tr>
        <tr>
          <td><strong>Actual: Disease</strong></td>
          <td>3</td>
          <td>29</td>
        </tr>
      </tbody>
    </table>
    
    <p><strong>Model Type:</strong> Logistic Regression with L2 regularization</p>
    <p><strong>Training Time:</strong> 0.023 seconds</p>
    <p><strong>Prediction Time:</strong> < 0.001 seconds per sample</p>
  `;
}
// ----- /View Evaluation Metrics -----

// ----- Project Details -----
function getProjectDetailsContent() {
  return `
    <h3>Heart Disease Predictor Project</h3>
    <p>A comprehensive machine learning project that predicts heart disease risk based on medical attributes using advanced data science techniques and a user-friendly web interface.</p>
    
    <h3>Project Overview</h3>
    <ul>
      <li><strong>Objective:</strong> Develop an accurate and accessible heart disease prediction system</li>
      <li><strong>Dataset:</strong> Cleveland Heart Disease Dataset (303 samples, 13 features)</li>
      <li><strong>Algorithm:</strong> Logistic Regression with hyperparameter optimization</li>
      <li><strong>Interface:</strong> Responsive web application with interactive UI</li>
    </ul>
    
    <h3>Technical Stack</h3>
    <ul>
      <li><strong>Data Science:</strong> Python, Pandas, NumPy, Scikit-learn</li>
      <li><strong>Visualization:</strong> Matplotlib, Seaborn</li>
      <li><strong>Frontend:</strong> HTML, CSS, JavaScript</li>
      <li><strong>Development:</strong> Jupyter Notebooks, Git</li>
    </ul>
    
    <h3>Key Features</h3>
    <ul>
      <li>Interactive step-by-step input collection</li>
      <li>Real-time prediction with trained ML model</li>
      <li>Comprehensive data exploration and visualization</li>
      <li>Responsive design for all devices</li>
      <li>Professional documentation and code organization</li>
    </ul>
    
    <h3>Project Structure</h3>
    <pre><code>Heart-Disease-predictor/
├── src/                   # Frontend application
│   ├── index.html         # Main web interface
│   ├── style.css          # Styling and responsive design
│   ├── sidebar_style.css  # Sidebar design
│   ├── script.js          # Interactive functionality
│   ├── modal_script.js    # Modal functionality
│   └── images/            # Project assets
├── heart disease classification/
│   ├── *.ipynb            # Jupyter notebooks
│   ├── data/              # Dataset files
│   ├── model/             # Trained model files
│   └── requirements.yaml  # Dependencies
└── README.md              # Project documentation</code></pre>
    
    <h3>Developer</h3>
    <p><strong>Mohsin Ansari</strong> - Machine Learning & Agentic AI</p>
    <div style="margin-top: 1.5rem;">
      <a href="https://github.com/mohsinansari0705/Heart-Disease-predictor" class="btn" target="_blank">View on GitHub</a>
      <a href="https://github.com/mohsinansari0705/" class="btn" target="_blank">Developer Profile</a>
    </div>
  `;
}
// ----- /Project Details -----