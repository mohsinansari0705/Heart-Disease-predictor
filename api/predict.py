from http.server import BaseHTTPRequestHandler
import numpy as np
import pickle
import json
import os

class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_POST(self):
        try:
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.end_headers()

            current_dir = os.path.dirname(os.path.abspath(__file__))
            project_root = os.path.dirname(current_dir)
            
            model_path = os.path.join(project_root, 'heart_disease_classification', 'model', 'log_reg_model.pkl')
            
            if not os.path.exists(model_path):
                error_response = {
                    'error': f'Model file not found at: {model_path}',
                    'success': False
                }
                self.wfile.write(json.dumps(error_response).encode())
                return

            with open(model_path, 'rb') as f:
                model = pickle.load(f)

            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))

            features = [
                float(data['age']),
                float(data['sex']), 
                float(data['cp']),
                float(data['trestbps']),
                float(data['chol']),
                float(data['fbs']),
                float(data['restecg']),
                float(data['thalach']),
                float(data['exang']),
                float(data['oldpeak']),
                float(data['slope']),
                float(data['ca']),
                float(data['thal'])
            ]

            features_array = np.array([features])
            prediction = model.predict(features_array)[0]
            probabilities = model.predict_proba(features_array)[0]

            response = {
                'prediction': 'High Risk' if prediction == 1 else 'Low Risk',
                'confidence': round(max(probabilities) * 100, 2),
                'disease_probability': round(probabilities[1] * 100, 2),
                'healthy_probability': round(probabilities[0] * 100, 2),
                'success': True
            }

            self.wfile.write(json.dumps(response).encode())

        except Exception as e:
            error_response = {
                'error': str(e),
                'success': False
            }
            self.wfile.write(json.dumps(error_response).encode())