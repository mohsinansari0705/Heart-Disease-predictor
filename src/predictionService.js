class PredictionService {
  constructor() {
    this.apiUrl = '/api/predict';
  }

  async makePrediction(userInputs) {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInputs)
      });

      if(!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, response: ${errorText}`);
      }

      const result = await response.json();
      
      if(!result.success) {
        throw new Error(result.error || 'Prediction failed');
      }

      return result;
      
    } catch(error) {
      console.error('Prediction API failed:', error);
      throw error;
    }
  }
}

window.PredictionService = PredictionService;